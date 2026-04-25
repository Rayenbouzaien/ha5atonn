# 🚀 Quick Start - Test Suite

## What Was Created

I've created a unified test runner for all three test frameworks in your project:

✅ **run_all_tests.bat** - Windows batch script  
✅ **run_all_tests.sh** - Linux/macOS/WSL bash script  
✅ **TEST_RUNNER.md** - Comprehensive documentation  
✅ **pytest.ini** - Python test configuration  
✅ **.vscode/settings.json** - VS Code integration (updated)  

---

## Quick Commands

### On Windows (Command Prompt or PowerShell)
```bash
# Run all tests
.\run_all_tests.bat

# Run specific framework
.\run_all_tests.bat py    # Python only
.\run_all_tests.bat js    # JavaScript only
.\run_all_tests.bat php   # PHP only
```

### On Linux/macOS/WSL (Bash)
```bash
bash run_all_tests.sh     # All tests
bash run_all_tests.sh py  # Python only
bash run_all_tests.sh js  # JavaScript only
bash run_all_tests.sh php # PHP only
```

---

## One-Time Setup

### Required Installations

```bash
# JavaScript dependencies
npm install

# PHP dependencies
composer install

# Python dependencies
pip install pytest pytest-cov
```

---

## View Coverage Reports

After running tests, open the dashboard:

**Dashboard:** `coverage-all/index.html`

This will show you links to:
- 📘 JavaScript Coverage
- 🐘 PHP Coverage
- 🐍 Python Coverage

---

## What Gets Generated

```
coverage-all/
├── index.html                 ← Open this! (Dashboard)
├── js-coverage/               (Jest)
├── php-coverage/              (PHPUnit)
├── py-coverage/               (pytest)
└── test_run_*.log             (Detailed logs)
```

---

## Test Locations

| Framework | Location | Config |
|-----------|----------|--------|
| Jest (JavaScript) | Root & node_modules | `jest.config.js` |
| PHPUnit (PHP) | `tests/nawres/tests/` | `tests/nawres/tests/phpunit.xml` |
| pytest (Python) | `tests/rahma/` | `pytest.ini` |

---

## Features

✅ Runs all 3 frameworks in one command  
✅ Auto-generates coverage reports  
✅ Creates unified HTML dashboard  
✅ Detailed test logs with timestamps  
✅ Run individual frameworks separately  
✅ Works on Windows, Linux, macOS, and WSL  
✅ Gracefully skips missing frameworks  

---

## Current Test Status

### Python Tests ✅
- **82 tests** in `tests/rahma/`
- All passing
- Auto-discovered via pytest.ini

### JavaScript Tests
- Located in project root
- Configured via jest.config.js
- Use `npm test` to run

### PHP Tests
- Located in `tests/nawres/tests/`
- Configured via phpunit.xml
- Use `vendor/bin/phpunit` to run

---

## Troubleshooting

**"Framework not found"** → Install dependencies (see setup section above)

**"Tests fail"** → Check the log file in `coverage-all/test_run_*.log`

**"No coverage data"** → Coverage is collected from actual source code, not test files

**Can't open HTML reports** → Make sure they're being generated (check logs)

---

## Next Steps

1. **Run all tests:**
   ```bash
   .\run_all_tests.bat
   ```

2. **Open the dashboard:**
   Open `coverage-all/index.html` in your browser

3. **View detailed reports:**
   Click on each framework card to see detailed coverage

4. **Add to CI/CD:**
   Use the scripts in your GitHub Actions or GitLab CI

---

## For More Information

📖 See **TEST_RUNNER.md** for comprehensive documentation

---

**Created:** April 2026  
**YOPY Platform Testing Infrastructure**
