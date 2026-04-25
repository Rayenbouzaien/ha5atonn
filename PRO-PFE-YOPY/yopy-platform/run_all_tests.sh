#!/bin/bash

################################################################################
# run_all_tests.sh
# 
# Comprehensive test runner for YOPY Platform supporting:
#   - JavaScript/Node.js tests (Jest)
#   - PHP tests (PHPUnit)
#   - Python tests (pytest)
#
# Generates coverage reports for all test frameworks
# Creates a unified coverage summary
#
# Usage:
#   bash run_all_tests.sh                 # Run all tests with coverage
#   bash run_all_tests.sh [test-type]    # Run specific test type (js|php|py)
#
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
COVERAGE_DIR="$PROJECT_ROOT/coverage-all"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$COVERAGE_DIR/test_run_$TIMESTAMP.log"

# Create coverage directory
mkdir -p "$COVERAGE_DIR"
mkdir -p "$COVERAGE_DIR/js-coverage"
mkdir -p "$COVERAGE_DIR/php-coverage"
mkdir -p "$COVERAGE_DIR/py-coverage"

# Initialize tracking
TESTS_PASSED=()
TESTS_FAILED=()
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

################################################################################
# Helper Functions
################################################################################

log() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1" | tee -a "$LOG_FILE"
}

section_header() {
    echo "" | tee -a "$LOG_FILE"
    echo "╔════════════════════════════════════════════════════════════╗" | tee -a "$LOG_FILE"
    echo "║  $1" | tee -a "$LOG_FILE"
    echo "╚════════════════════════════════════════════════════════════╝" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log_error "$1 is not installed. Skipping..."
        return 1
    fi
    return 0
}

################################################################################
# JavaScript/Jest Tests
################################################################################

run_jest_tests() {
    section_header "Running JavaScript Tests (Jest)"
    
    if ! check_command "npm"; then
        log_warning "npm not found, skipping Jest tests"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    
    if [ ! -f "package.json" ]; then
        log_error "package.json not found"
        TESTS_FAILED+=("JavaScript (Jest)")
        return 1
    fi
    
    log "Installing dependencies..."
    npm install --quiet 2>> "$LOG_FILE" || log_warning "npm install had warnings"
    
    log "Running Jest tests with coverage..."
    if npm test -- --coverage --coverageDirectory="$COVERAGE_DIR/js-coverage" --json --outputFile="$COVERAGE_DIR/jest-results.json" 2>> "$LOG_FILE"; then
        log_success "JavaScript tests passed"
        TESTS_PASSED+=("JavaScript (Jest)")
        return 0
    else
        log_error "JavaScript tests failed"
        TESTS_FAILED+=("JavaScript (Jest)")
        return 1
    fi
}

################################################################################
# PHP/PHPUnit Tests
################################################################################

run_phpunit_tests() {
    section_header "Running PHP Tests (PHPUnit)"
    
    if ! check_command "php"; then
        log_warning "PHP not found, skipping PHPUnit tests"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    
    if [ ! -f "composer.json" ]; then
        log_error "composer.json not found"
        TESTS_FAILED+=("PHP (PHPUnit)")
        return 1
    fi
    
    log "Checking PHPUnit installation..."
    if [ ! -f "vendor/bin/phpunit" ]; then
        log "Installing Composer dependencies..."
        composer install --quiet 2>> "$LOG_FILE" || log_warning "composer install had warnings"
    fi
    
    PHPUNIT="vendor/bin/phpunit"
    
    if [ ! -f "$PHPUNIT" ]; then
        log_error "PHPUnit executable not found"
        TESTS_FAILED+=("PHP (PHPUnit)")
        return 1
    fi
    
    log "Running PHPUnit tests with coverage..."
    
    # Run PHPUnit with coverage
    if php "$PHPUNIT" \
        --configuration="tests/nawres/tests/phpunit.xml" \
        --coverage-html="$COVERAGE_DIR/php-coverage" \
        --coverage-clover="$COVERAGE_DIR/php-coverage/clover.xml" \
        2>> "$LOG_FILE"; then
        log_success "PHP tests passed"
        TESTS_PASSED+=("PHP (PHPUnit)")
        return 0
    else
        log_error "PHP tests failed"
        TESTS_FAILED+=("PHP (PHPUnit)")
        return 1
    fi
}

################################################################################
# Python/Pytest Tests
################################################################################

run_pytest_tests() {
    section_header "Running Python Tests (pytest)"
    
    if ! check_command "python"; then
        log_warning "Python not found, skipping pytest tests"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    
    log "Checking pytest installation..."
    if ! python -m pytest --version &>/dev/null; then
        log "Installing pytest..."
        pip install pytest pytest-cov 2>> "$LOG_FILE" || log_warning "pip install had warnings"
    fi
    
    log "Running pytest tests with coverage..."
    
    if python -m pytest tests/rahma \
        --cov=src \
        --cov-report=html:"$COVERAGE_DIR/py-coverage" \
        --cov-report=json:"$COVERAGE_DIR/py-coverage/coverage.json" \
        --cov-report=term-missing \
        -v \
        2>> "$LOG_FILE"; then
        log_success "Python tests passed"
        TESTS_PASSED+=("Python (pytest)")
        return 0
    else
        log_error "Python tests failed"
        TESTS_FAILED+=("Python (pytest)")
        return 1
    fi
}

################################################################################
# Coverage Report Generation
################################################################################

generate_coverage_summary() {
    section_header "Coverage Summary Report"
    
    SUMMARY_FILE="$COVERAGE_DIR/COVERAGE_REPORT_$TIMESTAMP.md"
    
    cat > "$SUMMARY_FILE" << 'EOF'
# Test Coverage Report

Generated: $(date)

## Summary

| Test Framework | Status | Report Location |
|---|---|---|
EOF

    # JavaScript Coverage
    if [ -d "$COVERAGE_DIR/js-coverage" ] && [ -f "$COVERAGE_DIR/jest-results.json" ]; then
        echo "| Jest (JavaScript) | ✓ | [View Report](./js-coverage/index.html) |" >> "$SUMMARY_FILE"
    else
        echo "| Jest (JavaScript) | ✗ | Not generated |" >> "$SUMMARY_FILE"
    fi
    
    # PHP Coverage
    if [ -d "$COVERAGE_DIR/php-coverage" ] && [ -f "$COVERAGE_DIR/php-coverage/index.html" ]; then
        echo "| PHPUnit (PHP) | ✓ | [View Report](./php-coverage/index.html) |" >> "$SUMMARY_FILE"
    else
        echo "| PHPUnit (PHP) | ✗ | Not generated |" >> "$SUMMARY_FILE"
    fi
    
    # Python Coverage
    if [ -d "$COVERAGE_DIR/py-coverage" ] && [ -f "$COVERAGE_DIR/py-coverage/index.html" ]; then
        echo "| pytest (Python) | ✓ | [View Report](./py-coverage/index.html) |" >> "$SUMMARY_FILE"
    else
        echo "| pytest (Python) | ✗ | Not generated |" >> "$SUMMARY_FILE"
    fi
    
    cat >> "$SUMMARY_FILE" << 'EOF'

## Test Results

### Passed Tests
EOF
    
    if [ ${#TESTS_PASSED[@]} -gt 0 ]; then
        for test in "${TESTS_PASSED[@]}"; do
            echo "- ✓ $test" >> "$SUMMARY_FILE"
        done
    else
        echo "- No tests passed" >> "$SUMMARY_FILE"
    fi
    
    cat >> "$SUMMARY_FILE" << 'EOF'

### Failed Tests
EOF
    
    if [ ${#TESTS_FAILED[@]} -gt 0 ]; then
        for test in "${TESTS_FAILED[@]}"; do
            echo "- ✗ $test" >> "$SUMMARY_FILE"
        done
    else
        echo "- No failures" >> "$SUMMARY_FILE"
    fi
    
    cat >> "$SUMMARY_FILE" << 'EOF'

## Coverage Locations

- **JavaScript Coverage**: `coverage-all/js-coverage/index.html`
- **PHP Coverage**: `coverage-all/php-coverage/index.html`
- **Python Coverage**: `coverage-all/py-coverage/index.html`

## Test Logs

Log file: `coverage-all/test_run_$(date +%Y%m%d_%H%M%S).log`

EOF

    log_success "Coverage summary generated: $SUMMARY_FILE"
}

################################################################################
# HTML Index Generator
################################################################################

generate_html_index() {
    INDEX_FILE="$COVERAGE_DIR/index.html"
    
    cat > "$INDEX_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YOPY Platform - Test Coverage Reports</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            color: white;
            margin-bottom: 50px;
        }
        
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .reports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .report-card {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-decoration: none;
            color: inherit;
        }
        
        .report-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .report-icon {
            font-size: 3em;
            margin-bottom: 15px;
        }
        
        .report-title {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .report-desc {
            color: #666;
            margin-bottom: 20px;
            font-size: 0.95em;
        }
        
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        
        .btn:hover {
            background: #764ba2;
        }
        
        .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 0.85em;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .status.available {
            background: #d4edda;
            color: #155724;
        }
        
        .status.unavailable {
            background: #f8d7da;
            color: #721c24;
        }
        
        footer {
            text-align: center;
            color: white;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🧪 YOPY Platform</h1>
            <p class="subtitle">Test Coverage Reports Dashboard</p>
        </header>
        
        <div class="reports-grid">
            <!-- JavaScript Coverage -->
            <div class="report-card">
                <div class="report-icon">📘</div>
                <div class="report-title">JavaScript/Jest</div>
                <div class="report-desc">Coverage for JavaScript tests using Jest framework</div>
                <div id="js-status" class="status unavailable">Not Available</div>
                <a href="js-coverage/index.html" class="btn" id="js-btn" style="display: none;">View Report</a>
            </div>
            
            <!-- PHP Coverage -->
            <div class="report-card">
                <div class="report-icon">🐘</div>
                <div class="report-title">PHP/PHPUnit</div>
                <div class="report-desc">Coverage for PHP tests using PHPUnit framework</div>
                <div id="php-status" class="status unavailable">Not Available</div>
                <a href="php-coverage/index.html" class="btn" id="php-btn" style="display: none;">View Report</a>
            </div>
            
            <!-- Python Coverage -->
            <div class="report-card">
                <div class="report-icon">🐍</div>
                <div class="report-title">Python/pytest</div>
                <div class="report-desc">Coverage for Python tests using pytest framework</div>
                <div id="py-status" class="status unavailable">Not Available</div>
                <a href="py-coverage/index.html" class="btn" id="py-btn" style="display: none;">View Report</a>
            </div>
        </div>
        
        <footer>
            <p>Generated: <span id="timestamp"></span></p>
            <p>YOPY Platform Testing Dashboard</p>
        </footer>
    </div>
    
    <script>
        // Check which reports are available
        const reports = [
            { id: 'js', folder: 'js-coverage' },
            { id: 'php', folder: 'php-coverage' },
            { id: 'py', folder: 'py-coverage' }
        ];
        
        reports.forEach(report => {
            // Try to fetch the report to check if it exists
            fetch(`${report.folder}/index.html`, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        document.getElementById(`${report.id}-status`).className = 'status available';
                        document.getElementById(`${report.id}-status`).textContent = '✓ Available';
                        document.getElementById(`${report.id}-btn`).style.display = 'inline-block';
                    }
                })
                .catch(() => {
                    // Report not available
                });
        });
        
        // Set timestamp
        document.getElementById('timestamp').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

    log_success "HTML index generated: $INDEX_FILE"
}

################################################################################
# Main Test Runner Logic
################################################################################

run_tests() {
    local test_type="$1"
    
    log "Starting test suite execution..."
    log "Output directory: $COVERAGE_DIR"
    
    # Run tests based on argument
    case "$test_type" in
        js)
            run_jest_tests
            ;;
        php)
            run_phpunit_tests
            ;;
        py)
            run_pytest_tests
            ;;
        *)
            # Run all tests
            run_jest_tests || true
            run_phpunit_tests || true
            run_pytest_tests || true
            ;;
    esac
}

################################################################################
# Report Generation
################################################################################

generate_final_report() {
    section_header "Final Report"
    
    TESTS_PASSED_COUNT=${#TESTS_PASSED[@]}
    TESTS_FAILED_COUNT=${#TESTS_FAILED[@]}
    TOTAL=$((TESTS_PASSED_COUNT + TESTS_FAILED_COUNT))
    
    echo "" | tee -a "$LOG_FILE"
    echo "Test Results Summary:" | tee -a "$LOG_FILE"
    echo "  Total Test Suites: $TOTAL" | tee -a "$LOG_FILE"
    echo "  Passed: $TESTS_PASSED_COUNT" | tee -a "$LOG_FILE"
    echo "  Failed: $TESTS_FAILED_COUNT" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    
    if [ $TESTS_FAILED_COUNT -gt 0 ]; then
        log_error "Some tests failed!"
        echo "" | tee -a "$LOG_FILE"
        return 1
    else
        log_success "All tests passed!"
        echo "" | tee -a "$LOG_FILE"
        return 0
    fi
}

################################################################################
# Entry Point
################################################################################

main() {
    log "╔════════════════════════════════════════════════════════════╗"
    log "║  YOPY Platform - Unified Test Suite Runner                ║"
    log "║  Supports: JavaScript (Jest), PHP (PHPUnit), Python       ║"
    log "╚════════════════════════════════════════════════════════════╝"
    echo "" | tee -a "$LOG_FILE"
    
    # Parse command line arguments
    local test_type="${1:-all}"
    
    # Run tests
    run_tests "$test_type"
    
    # Generate reports
    log "Generating coverage reports..."
    generate_coverage_summary
    generate_html_index
    
    # Final report
    generate_final_report
    local exit_code=$?
    
    log "Log file: $LOG_FILE"
    log "Coverage reports: $COVERAGE_DIR"
    
    return $exit_code
}

# Run main function
main "$@"
exit $?
