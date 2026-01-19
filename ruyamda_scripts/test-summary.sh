#!/usr/bin/env bash

# Test Summary Script
# Runs all tests and provides a clean summary with:
# 1. List of all failing tests (if any) grouped by package
# 2. Test counts per package
# 3. Overall test statistics
#
# Supports both Jest (mobile) and Vitest (web, shared packages) output formats

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Temporary file to store test output
TEMP_OUTPUT=$(mktemp)
trap "rm -f $TEMP_OUTPUT" EXIT

# Run tests silently and capture output
echo "Running tests..." >&2
pnpm test > "$TEMP_OUTPUT" 2>&1

# Parallel arrays for package data (compatible with older bash)
pkg_names=()
pkg_total=()
pkg_passed=()
pkg_failed=()
pkg_skipped=()
pkg_errors=()
pkg_failures=()
pkg_aborted=()  # Track packages killed by turbo early abort
pkg_suites_total=()
pkg_suites_passed=()
pkg_suites_failed=()
current_pkg=""
current_pkg_idx=-1

# Arrays to capture failing test details
failing_tests=()  # Format: "package|file|test_name"

# Helper function to find package index
find_pkg_idx() {
    local pkg="$1"
    for i in "${!pkg_names[@]}"; do
        if [[ "${pkg_names[$i]}" == "$pkg" ]]; then
            echo "$i"
            return 0
        fi
    done
    echo "-1"
}

# Track file-level counts for Vitest (fallback when turbo kills tests early)
# Using parallel arrays instead of associative arrays for bash 3 compatibility
pkg_file_tests=()
pkg_file_skipped=()

# Variables to capture test failure context
current_test_file=""
current_test_name=""
next_line_is_test_name=false

# Parse the output
while IFS= read -r line; do
    # Detect package context
    if [[ $line =~ ^(@ruyamda/[^:]+):test: ]]; then
        current_pkg="${BASH_REMATCH[1]}"
        current_pkg_idx=$(find_pkg_idx "$current_pkg")

        # Initialize package if new
        if [[ $current_pkg_idx -eq -1 ]]; then
            pkg_names+=("$current_pkg")
            pkg_total+=(0)
            pkg_passed+=(0)
            pkg_failed+=(0)
            pkg_skipped+=(0)
            pkg_errors+=(0)
            pkg_aborted+=(0)
            pkg_file_tests+=(0)
            pkg_file_skipped+=(0)
            pkg_suites_total+=(0)
            pkg_suites_passed+=(0)
            pkg_suites_failed+=(0)
            current_pkg_idx=$((${#pkg_names[@]} - 1))
        fi
    fi

    # Parse test counts (must have current package context)
    if [[ -n "$current_pkg" ]]; then
        # ============================================================================
        # PARSE SUITE/FILE COUNTS (Jest uses "Test Suites", Vitest uses "Test Files")
        # ============================================================================

        # JEST: "Test Suites: X failed, Y passed, Z total"
        if [[ $line =~ Test[[:space:]]+Suites:[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_suites_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # JEST: "Test Suites: X passed, Y total" (no failures)
        elif [[ $line =~ Test[[:space:]]+Suites:[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_suites_passed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[2]}"
        # JEST: "Test Suites: X failed (Y)" (all failed or only failed)
        elif [[ $line =~ Test[[:space:]]+Suites:[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_suites_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[2]}"

        # VITEST: "Test Files  X failed | Y passed (Z)"
        elif [[ $line =~ Test[[:space:]]+Files[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*\|[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_suites_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # VITEST: "Test Files  X passed (Y)" (no failures)
        elif [[ $line =~ Test[[:space:]]+Files[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_suites_passed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[2]}"
        # VITEST: "Test Files  X failed (Y)" (all failed or only failed)
        elif [[ $line =~ Test[[:space:]]+Files[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_suites_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_suites_total[$current_pkg_idx]="${BASH_REMATCH[2]}"
        fi

        # ============================================================================
        # PARSE INDIVIDUAL TEST COUNTS
        # ============================================================================

        # JEST OUTPUT PATTERNS (used by @ruyamda/mobile)
        # CRITICAL: Jest output order is: failed, skipped, passed, total (skipped comes BEFORE passed)
        # Use [^0-9]* to skip non-digits but not capture unrelated numbers

        # Pattern: "Tests: ... X failed ... Y skipped ... Z passed ... W total"
        if [[ $line =~ Tests:[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+skipped[^0-9]*,[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_skipped[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[3]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[4]}"
        # Pattern: "Tests: ... X failed ... Y passed ... Z total" (no skipped)
        elif [[ $line =~ Tests:[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # Pattern: "Tests: ... X skipped ... Y passed ... Z total" (no failures)
        elif [[ $line =~ Tests:[^0-9]*([0-9]+)[^0-9]+skipped[^0-9]*,[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_skipped[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # Pattern: "Tests: ... X passed ... Y total" (all passed)
        elif [[ $line =~ Tests:[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*,[^0-9]*([0-9]+)[^0-9]+total ]]; then
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[2]}"

        # VITEST OUTPUT PATTERNS (used by @ruyamda/web, @ruyamda/shared-*)
        # Pattern: "Tests  X failed | Y passed | Z skipped (Total)"
        elif [[ $line =~ Tests[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*\|[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\|[^0-9]*([0-9]+)[^0-9]+skipped[^0-9]*\(([0-9]+)\) ]]; then
            pkg_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_skipped[$current_pkg_idx]="${BASH_REMATCH[3]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[4]}"
        # Pattern: "Tests  X failed | Y passed (Total)"
        elif [[ $line =~ Tests[^0-9]*([0-9]+)[^0-9]+failed[^0-9]*\|[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_failed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # Pattern: "Tests  X passed | Y skipped (Total)"
        elif [[ $line =~ Tests[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\|[^0-9]*([0-9]+)[^0-9]+skipped[^0-9]*\(([0-9]+)\) ]]; then
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_skipped[$current_pkg_idx]="${BASH_REMATCH[2]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[3]}"
        # Pattern: "Tests  X passed (Total)"
        elif [[ $line =~ Tests[^0-9]*([0-9]+)[^0-9]+passed[^0-9]*\(([0-9]+)\) ]]; then
            pkg_passed[$current_pkg_idx]="${BASH_REMATCH[1]}"
            pkg_total[$current_pkg_idx]="${BASH_REMATCH[2]}"
        fi
    fi

    # ============================================================================
    # CAPTURE TEST FAILURES - Multiple patterns for robustness
    # ============================================================================

    # Pattern 1: JEST format - "FAIL path/to/file.test.tsx"
    # More lenient: Allow any characters before FAIL (colors, prefixes, etc.)
    if [[ -n "$current_pkg" ]] && [[ $line =~ FAIL[[:space:]]+([^[:space:]]+\.test\.(ts|tsx|js|jsx)) ]]; then
        current_test_file="${BASH_REMATCH[1]}"
        next_line_is_test_name=true
    fi

    # Pattern 2: Jest test name - "  ● Test Suite › Test Name"
    # Check on any line when we're expecting a test name
    if [[ -n "$current_pkg" ]] && [[ $next_line_is_test_name == true ]]; then
        # Strip package prefix if present (e.g., "@ruyamda/mobile:test: ")
        stripped_line="${line#*:test: }"
        # More lenient: Allow variable whitespace and unicode bullet point
        if [[ $stripped_line =~ [[:space:]]*(●|•)[[:space:]]+(.+)$ ]]; then
            current_test_name="${BASH_REMATCH[2]}"
            failing_tests+=("$current_pkg|$current_test_file|$current_test_name")
            next_line_is_test_name=false
        fi
    fi

    # Pattern 3 & 4: VITEST formats (combined for simplicity)
    # Match any line with (❯ or FAIL) + test file path + " > " + test hierarchy
    # Very lenient: Match test file path, then ">", then capture rest as test name
    # This handles: colored output, variable whitespace, different formats
    if [[ -n "$current_pkg" ]]; then
        # Look for test file extensions first
        if [[ $line =~ ([a-zA-Z0-9/_.-]+\.test\.(ts|tsx|js|jsx)).*\>\ +(.+)$ ]]; then
            # Now check if this line also contains ❯ or FAIL (failure indicators)
            if [[ $line =~ (❯|FAIL) ]]; then
                current_test_file="${BASH_REMATCH[1]}"
                current_test_name="${BASH_REMATCH[3]}"
                failure_key="$current_pkg|$current_test_file|$current_test_name"
                # Avoid duplicates
                if [[ ! " ${failing_tests[@]} " =~ " ${failure_key} " ]]; then
                    failing_tests+=("$failure_key")
                fi
            fi
        fi
    fi

    # Legacy capture (kept for backward compatibility)
    if [[ -n "$current_pkg" ]] && [[ $line =~ FAIL[[:space:]]+(.+\.test\.(ts|tsx))[[:space:]]*\>[[:space:]]*(.+)$ ]]; then
        test_file="${BASH_REMATCH[1]}"
        test_name="${BASH_REMATCH[3]}"
        pkg_failures+=("$current_pkg|$test_file: $test_name")
    fi

    # FALLBACK: Parse Vitest individual test file results (for when turbo aborts early)
    # Pattern: " ✓ src/path/to/file.test.ts  (23 tests) 5ms"
    # Pattern: " ✓ src/path/to/file.test.ts  (23 tests | 2 skipped) 5ms"
    if [[ -n "$current_pkg" ]] && [[ $current_pkg_idx -ne -1 ]]; then
        if [[ $line =~ ✓[[:space:]]+[^[:space:]]+\.test\.(ts|tsx)[[:space:]]+\(([0-9]+)[[:space:]]+tests\) ]]; then
            test_count="${BASH_REMATCH[2]}"
            pkg_file_tests[$current_pkg_idx]=$((${pkg_file_tests[$current_pkg_idx]} + test_count))
        elif [[ $line =~ ✓[[:space:]]+[^[:space:]]+\.test\.(ts|tsx)[[:space:]]+\(([0-9]+)[[:space:]]+tests[[:space:]]*\|[[:space:]]*([0-9]+)[[:space:]]+skipped\) ]]; then
            test_count="${BASH_REMATCH[2]}"
            skipped_count="${BASH_REMATCH[3]}"
            pkg_file_tests[$current_pkg_idx]=$((${pkg_file_tests[$current_pkg_idx]} + test_count))
            pkg_file_skipped[$current_pkg_idx]=$((${pkg_file_skipped[$current_pkg_idx]} + skipped_count))
        fi
    fi

    # Detect test suite abortion (turbo killed the process early - not normal test failures)
    # Note: With --continue flag, "command exited (1)" is normal for test failures
    # Only mark as aborted if we see actual early termination signals
    if [[ -n "$current_pkg" ]] && [[ $current_pkg_idx -ne -1 ]]; then
        # Only detect true aborts (SIGTERM, SIGKILL, etc.) - not normal exit codes
        if [[ $line =~ (SIGTERM|SIGKILL|killed.*premature) ]]; then
            pkg_aborted[$current_pkg_idx]=1
        fi
    fi
done < "$TEMP_OUTPUT"

# Apply fallback counts for packages with 0 total (killed by turbo early abort)
for i in "${!pkg_names[@]}"; do
    if [[ ${pkg_total[$i]} -eq 0 ]] && [[ ${pkg_file_tests[$i]:-0} -gt 0 ]]; then
        # Package was killed mid-execution - use file-level counts as fallback
        # Even if marked as "aborted", if we have file-level test counts, trust them
        pkg_total[$i]=${pkg_file_tests[$i]}
        pkg_passed[$i]=${pkg_file_tests[$i]}
        pkg_skipped[$i]=${pkg_file_skipped[$i]:-0}
        # Adjust passed count if there were skipped tests
        pkg_passed[$i]=$((${pkg_total[$i]} - ${pkg_skipped[$i]}))
        # Clear abort flag since we recovered the counts
        pkg_aborted[$i]=0
    elif [[ ${pkg_total[$i]} -eq 0 ]] && [[ ${pkg_aborted[$i]:-0} -eq 1 ]]; then
        # Package was aborted AND we have no fallback data - mark as error
        pkg_total[$i]=1
        pkg_passed[$i]=0
        pkg_failed[$i]=0
        pkg_skipped[$i]=0
        pkg_errors[$i]=1
    fi
done

# Output clean summary
echo ""

# Show failing tests section if there are any failures
if [[ ${#failing_tests[@]} -gt 0 ]]; then
    echo "================================================================================"
    echo "FAILING TESTS"
    echo "================================================================================"
    echo ""

    # Group failures by package
    for pkg in "${pkg_names[@]}"; do
        pkg_has_failures=false

        # Check if this package has any failures
        for failure in "${failing_tests[@]}"; do
            if [[ $failure =~ ^$pkg\| ]]; then
                if [[ $pkg_has_failures == false ]]; then
                    echo -e "${BOLD}$pkg${NC}"
                    pkg_has_failures=true
                fi

                # Extract file and test name
                if [[ $failure =~ ^[^|]+\|([^|]+)\|(.+)$ ]]; then
                    test_file="${BASH_REMATCH[1]}"
                    test_name="${BASH_REMATCH[2]}"
                    echo -e "  ${RED}✗${NC} $test_file"
                    echo -e "    ${YELLOW}$test_name${NC}"
                fi
            fi
        done

        if [[ $pkg_has_failures == true ]]; then
            echo ""
        fi
    done

    echo "================================================================================"
    echo ""
fi

echo "================================================================================"
echo "TEST SUMMARY"
echo "================================================================================"
echo ""

for i in "${!pkg_names[@]}"; do
    pkg="${pkg_names[$i]}"
    total="${pkg_total[$i]}"
    passed="${pkg_passed[$i]}"
    failed="${pkg_failed[$i]}"
    skipped="${pkg_skipped[$i]}"
    errors="${pkg_errors[$i]}"
    suites_total="${pkg_suites_total[$i]:-0}"
    suites_passed="${pkg_suites_passed[$i]:-0}"
    suites_failed="${pkg_suites_failed[$i]:-0}"

    echo -e "${BOLD}$pkg${NC}"
    if [[ ${pkg_aborted[$i]:-0} -eq 1 ]] && [[ $errors -gt 0 ]]; then
        echo -e "  ${RED}✗ Test suite aborted (killed by turbo early exit)${NC}"
    fi

    # Show suite counts if available
    if [[ $suites_total -gt 0 ]]; then
        if [[ $suites_failed -gt 0 ]]; then
            echo -e "  Suites: ${RED}$suites_total total | $suites_passed passed | $suites_failed FAILED${NC}"
        else
            echo "  Suites: $suites_total total | $suites_passed passed | $suites_failed failed"
        fi
    fi

    echo "  Tests:  $total total | $passed passed | $failed failed | $skipped skipped | $errors errors"

    # Show failure summaries for this package
    if [[ $failed -gt 0 ]]; then
        for failure in "${pkg_failures[@]}"; do
            if [[ $failure =~ ^$pkg\|(.+)$ ]]; then
                echo -e "  ${RED}✗${NC} ${BASH_REMATCH[1]}"
            fi
        done
    fi
    echo ""
done

# Calculate totals
total_tests=0
total_passed=0
total_failed=0
total_skipped=0
total_errors=0
total_suites=0
total_suites_passed=0
total_suites_failed=0

for i in "${!pkg_names[@]}"; do
    total_tests=$((total_tests + pkg_total[$i]))
    total_passed=$((total_passed + pkg_passed[$i]))
    total_failed=$((total_failed + pkg_failed[$i]))
    total_skipped=$((total_skipped + pkg_skipped[$i]))
    total_errors=$((total_errors + pkg_errors[$i]))
    total_suites=$((total_suites + ${pkg_suites_total[$i]:-0}))
    total_suites_passed=$((total_suites_passed + ${pkg_suites_passed[$i]:-0}))
    total_suites_failed=$((total_suites_failed + ${pkg_suites_failed[$i]:-0}))
done

echo "================================================================================"
echo "OVERALL"
echo "================================================================================"

# Show suite totals if any suites were tracked
if [[ $total_suites -gt 0 ]]; then
    if [[ $total_suites_failed -gt 0 ]]; then
        echo -e "Suites: ${RED}$total_suites total | $total_suites_passed passed | $total_suites_failed FAILED${NC}"
    else
        echo "Suites: $total_suites total | $total_suites_passed passed | $total_suites_failed failed"
    fi
fi

echo "Tests:  $total_tests total | $total_passed passed | $total_failed failed | $total_skipped skipped | $total_errors errors"

if [[ $total_failed -eq 0 && $total_errors -eq 0 && $total_suites_failed -eq 0 ]]; then
    echo -e "Status: ${GREEN}✅ ALL TESTS PASSING${NC}"
    exit_code=0
else
    echo -e "Status: ${RED}❌ TESTS FAILING${NC}"
    if [[ $total_suites_failed -gt 0 ]]; then
        echo -e "        ${RED}→ $total_suites_failed test suite(s) failed to load or run${NC}"
    fi
    if [[ $total_failed -gt 0 ]]; then
        echo -e "        ${RED}→ $total_failed individual test(s) failed${NC}"
    fi
    if [[ $total_errors -gt 0 ]]; then
        echo -e "        ${RED}→ $total_errors test error(s) occurred${NC}"
    fi
    exit_code=1
fi

echo "================================================================================"

exit $exit_code
