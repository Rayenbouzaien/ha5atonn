# Test Suite Runner - Documentation

## Overview

This project includes unified test runners for all three test frameworks used in YOPY Platform:
- **JavaScript** (Jest)
- **PHP** (PHPUnit)
- **Python** (pytest)

Both scripts automatically run tests and generate coverage reports in a centralized location.

---

## Scripts Available

### For Windows Users
**File:** `run_all_tests.bat`

### For Linux/macOS/WSL Users
**File:** `run_all_tests.sh`

---

## Quick Start

### Windows (Command Prompt)
```bash
# Run all tests
run_all_tests.bat

# Run only JavaScript tests
run_all_tests.bat js

# Run only PHP tests
run_all_tests.bat php

# Run only Python tests
run_all_tests.bat py
```

### Linux/macOS/WSL (Bash)
```bash
# Make script executable (first time only)
chmod +x run_all_tests.sh

# Run all tests
bash run_all_tests.sh

# Run only JavaScript tests
bash run_all_tests.sh js

# Run only PHP tests
bash run_all_tests.sh php

# Run only Python tests
bash run_all_tests.sh py
```

---

## Output Structure

After running the script, you'll find all reports in the `coverage-all/` directory:

```
coverage-all/
├── index.html                          # 🎯 Main dashboard (open this!)
├── js-coverage/                        # JavaScript/Jest coverage
│   ├── index.html
│   └── ... (coverage files)
├── php-coverage/                       # PHP/PHPUnit coverage
│   ├── index.html
│   └── ... (coverage files)
├── py-coverage/                        # Python/pytest coverage
│   ├── index.html
│   └── ... (coverage files)
├── COVERAGE_REPORT_*.md                # Markdown summary
└── test_run_*.log                      # Detailed test logs
```

---

## Viewing Coverage Reports

### Method 1: Use the Dashboard (Recommended)
1. Open `coverage-all/index.html` in your browser
2. Click on any framework to view its detailed coverage report

### Method 2: Direct Links
- **JavaScript Coverage:** `coverage-all/js-coverage/index.html`
- **PHP Coverage:** `coverage-all/php-coverage/index.html`
- **Python Coverage:** `coverage-all/py-coverage/index.html`

### Method 3: Command Line
```bash
# Windows
start coverage-all\index.html

# macOS
open coverage-all/index.html

# Linux
xdg-open coverage-all/index.html
```

---

## What Each Framework Tests

### JavaScript (Jest)
- **Location:** Tests in project root matching Jest patterns
- **Configuration:** `jest.config.js`
- **Output:** HTML coverage report with line-by-line coverage

### PHP (PHPUnit)
- **Location:** `tests/nawres/tests/`
- **Configuration:** `tests/nawres/tests/phpunit.xml`
- **Coverage Files:** HTML report + `clover.xml` format

### Python (pytest)
- **Location:** `tests/rahma/`
- **Configuration:** `pytest.ini`
- **Coverage Files:** HTML report + `coverage.json` format

---

## Prerequisites

### All Frameworks
- **Node.js & npm** (for JavaScript/Jest)
- **PHP** (for PHPUnit)
- **Python 3** (for pytest)

### Installation Commands

**Node.js dependencies:**
```bash
npm install
```

**PHP dependencies:**
```bash
composer install
```

**Python dependencies:**
```bash
pip install pytest pytest-cov
```

---

## Features

✅ **Runs all three test frameworks in one command**  
✅ **Auto-generates HTML coverage reports for each framework**  
✅ **Creates unified dashboard linking all reports**  
✅ **Generates detailed test logs with timestamps**  
✅ **Supports running individual test frameworks**  
✅ **Gracefully handles missing frameworks (skips them)**  
✅ **Color-coded output for easy reading**  
✅ **Windows and Unix/Linux/WSL compatible**  

---

## Understanding Coverage Metrics

Each report shows:

- **Line Coverage:** % of code lines executed
- **Branch Coverage:** % of conditional branches tested
- **Function Coverage:** % of functions called

### What's a "Good" Coverage?
- **80-90%+** - Excellent
- **70-80%** - Good
- **50-70%** - Fair (needs improvement)
- **<50%** - Poor (significant gaps)

---

## Troubleshooting

### Issue: "Framework not found" warning
**Solution:** Install the required dependencies
```bash
npm install          # For JavaScript
composer install     # For PHP
pip install pytest   # For Python
```

### Issue: Tests fail but I don't know why
**Solution:** Check the log file
```bash
# Windows
type coverage-all\test_run_*.log

# Linux/macOS
cat coverage-all/test_run_*.log
```

### Issue: Coverage report shows 0% coverage
**Solution:** Ensure tests are actually running and importing the code they test

### Issue: Cannot open HTML reports
**Solution:** Make sure your browser can access local file URLs, or start a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server coverage-all
```

Then visit: `http://localhost:8000/coverage-all/index.html`

---

## Continuous Integration (CI)

### GitHub Actions Example
```yaml
name: Run All Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Set up PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      - name: Run all tests
        run: bash run_all_tests.sh
      - name: Upload coverage
        uses: actions/upload-artifact@v2
        with:
          name: coverage-reports
          path: coverage-all/
```

---

## Advanced Usage

### Running tests with custom parameters

**JavaScript only (Jest):**
```bash
npm test -- --coverage --testPathPattern=tests/
```

**PHP only (PHPUnit):**
```bash
vendor/bin/phpunit tests/nawres/tests/phpunit.xml
```

**Python only (pytest):**
```bash
python -m pytest tests/rahma -v --cov=src
```

---

## File Locations Reference

| Item | Location |
|------|----------|
| Jest Config | `jest.config.js` |
| PHPUnit Config | `tests/nawres/tests/phpunit.xml` |
| pytest Config | `pytest.ini` |
| This documentation | `TEST_RUNNER.md` |
| Windows script | `run_all_tests.bat` |
| Unix script | `run_all_tests.sh` |

---

## Contributing

When adding new tests:

1. **JavaScript:** Follow Jest patterns in existing test files
2. **PHP:** Add tests to `tests/nawres/tests/` and update phpunit.xml
3. **Python:** Add tests to `tests/rahma/` with correct naming pattern

Then run the full test suite to verify everything works!

---

## Support

For issues or questions about the test infrastructure:
1. Check the log files in `coverage-all/`
2. Review the configuration files (jest.config.js, phpunit.xml, pytest.ini)
3. Ensure all dependencies are installed

---

**Last Updated:** April 2026  
**YOPY Platform Test Infrastructure**
