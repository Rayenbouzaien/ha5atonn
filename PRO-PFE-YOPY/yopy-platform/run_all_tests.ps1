param(
    [ValidateSet('all', 'js', 'php', 'py')]
    [string]$TestType = 'all'
)

$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

$CoverageDir = Join-Path $ProjectRoot 'coverage-all'
$JsCoverageDir = Join-Path $CoverageDir 'js-coverage'
$PhpCoverageDir = Join-Path $CoverageDir 'php-coverage'
$PyCoverageDir = Join-Path $CoverageDir 'py-coverage'
$Timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$LogFile = Join-Path $CoverageDir "test_run_$Timestamp.log"

New-Item -ItemType Directory -Force -Path $CoverageDir, $JsCoverageDir, $PhpCoverageDir, $PyCoverageDir | Out-Null

function Write-Log {
    param([string]$Message)
    $Message | Tee-Object -FilePath $LogFile -Append
}

function Write-Section {
    param([string]$Title)
    Write-Log ''
    Write-Log ('=' * 42)
    Write-Log $Title
    Write-Log ('=' * 42)
}

function Invoke-TestCommand {
    param(
        [string]$DisplayName,
        [scriptblock]$CommandBlock
    )

    Write-Section $DisplayName
    try {
        $output = & $CommandBlock 2>&1
        if ($null -ne $output) {
            $output | Tee-Object -FilePath $LogFile -Append | Out-Null
        }

        $exitCode = $LASTEXITCODE
        if ($exitCode -ne 0) {
            throw "$DisplayName failed with exit code $exitCode"
        }
        Write-Log "[SUCCESS] $DisplayName passed"
        return $true
    }
    catch {
        Write-Log "[ERROR] $DisplayName failed"
        Write-Log $_.Exception.Message
        return $false
    }
}

function Ensure-PythonCoverageTools {
    try {
        & python -m pytest --version | Out-Null
        & python -m pip show pytest-cov | Out-Null
        if ($LASTEXITCODE -ne 0) {
            & python -m pip install pytest pytest-cov | Out-Null
        }
    }
    catch {
        & python -m pip install pytest pytest-cov | Out-Null
    }
}

function Generate-ReportIndex {
    $IndexFile = Join-Path $CoverageDir 'index.html'
    $IndexHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YOPY Platform - Test Coverage Reports</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f5f7fb; color: #1f2937; }
    .wrap { max-width: 1000px; margin: 0 auto; }
    h1 { margin-bottom: 8px; }
    .sub { color: #6b7280; margin-bottom: 28px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 24px rgba(0,0,0,.06); }
    .title { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
    .desc { color: #6b7280; margin-bottom: 16px; }
    a { display: inline-block; text-decoration: none; background: #2563eb; color: #fff; padding: 10px 14px; border-radius: 8px; }
    footer { margin-top: 24px; color: #6b7280; font-size: .95rem; }
    code { background: #eef2ff; padding: 2px 6px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>YOPY Platform Test Coverage</h1>
    <div class="sub">Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')</div>
    <div class="grid">
      <div class="card">
        <div class="title">JavaScript / Jest</div>
        <div class="desc">Coverage report for JS tests.</div>
        <a href="js-coverage/index.html">Open report</a>
      </div>
      <div class="card">
        <div class="title">PHP / PHPUnit</div>
        <div class="desc">Coverage report for PHP tests.</div>
        <a href="php-coverage/index.html">Open report</a>
      </div>
      <div class="card">
        <div class="title">Python / pytest</div>
        <div class="desc">Coverage report for Python tests.</div>
        <a href="py-coverage/index.html">Open report</a>
      </div>
    </div>
    <footer>Open <code>coverage-all/index.html</code> after the run completes.</footer>
  </div>
</body>
</html>
"@

    Set-Content -Path $IndexFile -Value $IndexHtml -Encoding UTF8
    Write-Log "[SUCCESS] HTML index generated: $IndexFile"
}

Write-Log '=========================================='
Write-Log 'YOPY Platform - Unified Test Suite Runner'
Write-Log '=========================================='
Write-Log "Test Type: $TestType"
Write-Log "Coverage Directory: $CoverageDir"

$Passed = 0
$Failed = 0

if ($TestType -in @('all', 'js')) {
    if (Test-Path (Join-Path $ProjectRoot 'package.json')) {
        $JestCmd = Join-Path $ProjectRoot 'node_modules\.bin\jest.cmd'
        if (Test-Path $JsCoverageDir) {
            Remove-Item -Path (Join-Path $JsCoverageDir '*') -Recurse -Force -ErrorAction SilentlyContinue
        }
        if (Invoke-TestCommand -DisplayName 'JavaScript Tests' -CommandBlock {
            if (Test-Path $JestCmd) {
                & $JestCmd --coverage --coverageDirectory=$JsCoverageDir --coverageReporters=html --coverageReporters=lcov --coverageReporters=json --coverageReporters=clover --coverageReporters=text
            }
            else {
                & npx jest --coverage --coverageDirectory=$JsCoverageDir --coverageReporters=html --coverageReporters=lcov --coverageReporters=json --coverageReporters=clover --coverageReporters=text
            }
        }) {
            $Passed++
        }
        else {
            $Failed++
        }
    }
    else {
        Write-Log '[WARNING] package.json not found; skipping JavaScript tests'
    }
}

if ($TestType -in @('all', 'php')) {
    if (Get-Command php -ErrorAction SilentlyContinue) {
        if (Test-Path (Join-Path $ProjectRoot 'composer.json')) {
            $PhpUnit = Join-Path $ProjectRoot 'vendor\bin\phpunit.bat'
            if (-not (Test-Path $PhpUnit)) {
                & composer install | Out-Null
            }

            if (Test-Path $PhpUnit) {
                if (Invoke-TestCommand -DisplayName 'PHP Tests' -CommandBlock {
                    $env:XDEBUG_MODE = 'coverage'
                    & $PhpUnit --configuration=tests\nawres\tests\phpunit.xml --coverage-html=$PhpCoverageDir --coverage-clover=(Join-Path $PhpCoverageDir 'clover.xml')
                    Remove-Item Env:XDEBUG_MODE -ErrorAction SilentlyContinue
                }) {
                    $Passed++
                }
                else {
                    $Failed++
                }
            }
            else {
                Write-Log '[WARNING] PHPUnit not found; skipping PHP tests'
            }
        }
        else {
            Write-Log '[WARNING] composer.json not found; skipping PHP tests'
        }
    }
    else {
        Write-Log '[WARNING] PHP not found; skipping PHP tests'
    }
}

if ($TestType -in @('all', 'py')) {
    if (Get-Command python -ErrorAction SilentlyContinue) {
        Ensure-PythonCoverageTools
        $PythonSource = Join-Path $ProjectRoot 'tests'
        if (Invoke-TestCommand -DisplayName 'Python Tests' -CommandBlock {
            & python -m pytest tests\rahma --cov=$PythonSource --cov-report=html:$PyCoverageDir --cov-report=term-missing -v
        }) {
            $Passed++
        }
        else {
            $Failed++
        }
    }
    else {
        Write-Log '[WARNING] Python not found; skipping Python tests'
    }
}

Generate-ReportIndex

Write-Log ''
Write-Log '=========================================='
Write-Log 'Final Report'
Write-Log '=========================================='
Write-Log "Tests Passed: $Passed"
Write-Log "Tests Failed: $Failed"
Write-Log "Log File: $LogFile"
Write-Log "Coverage Directory: $CoverageDir"

if ($Failed -gt 0) {
    exit 1
}

exit 0