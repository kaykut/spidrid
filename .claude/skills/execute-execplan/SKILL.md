---
name: execute-execplan
description: Executes an ExecPlan document through all milestones using TDD workflow. Requires execplan file path as first argument. Use when user says "execute execplan <path>", "run execplan <path>", or wants to implement a multi-milestone plan.
---

# Execute ExecPlan Skill

This skill automates the complete execution of an ExecPlan document following a rigorous Test-Driven Development workflow with implementation drift analysis.

## Usage

```
/execute-execplan <execplan-path> [--confirm]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `<execplan-path>` | **YES** | Path to the ExecPlan file (e.g., `docs/2026-01-11-navigation-revamp-execplan.md`) |
| `--confirm` | No | Enable interactive mode with confirmation prompts at milestone boundaries |

**Examples:**
```
/execute-execplan docs/2026-01-11-navigation-revamp-execplan.md
/execute-execplan docs/my-feature-execplan.md --confirm
```

**Default Behavior (Autonomous Mode):**
- Runs continuously without stopping for confirmation
- Only pauses if a gate check fails or an unrecoverable error occurs
- User can interrupt at any time to provide guidance

**With `--confirm` Flag (Interactive Mode):**
- Pauses at the end of each milestone for user approval
- Allows user to review progress before continuing
- Useful for high-risk changes or learning the workflow

## Workflow Overview

For each milestone in the ExecPlan:
1. **Plan Phase**: Read ExecPlan, explore related code, create TDD plan
2. **Execute Phase**: Implement with strict test requirements
3. **Verify Phase**: Drift analysis, fix drift, validate UI if applicable
4. **Gate Phase**: Tests + typecheck + lint must be 100% green

After all milestones complete:
- Full ExecPlan drift analysis
- Final validation
- Update ExecPlan living document sections

## Instructions

When this skill is invoked, follow these steps precisely:

### Step 0: Initialize

**0a. Parse Arguments**

Parse the skill arguments to extract:
- `execplan_path`: The first non-flag argument (REQUIRED)
- `confirm_mode`: Whether `--confirm` flag is present (default: false)

**If no execplan path is provided, STOP IMMEDIATELY and report:**
```
Error: ExecPlan path is required.

Usage: /execute-execplan <execplan-path> [--confirm]

Example: /execute-execplan docs/2026-01-11-navigation-revamp-execplan.md
```

Do NOT attempt to auto-detect or guess the execplan file. The path must be explicitly provided.

**0b. Load and Validate**

1. Read the ExecPlan file at the provided path
2. Read PLANS.md to ensure you understand ExecPlan requirements
3. Parse and identify all milestones in the ExecPlan
4. Create a TodoWrite task list with all milestones and their sub-phases

**0c. Report and Begin**

Report to the user:
- Execution mode: "Autonomous" or "Interactive (--confirm)"
- Number of milestones identified
- Brief summary of each milestone's goal

In **autonomous mode** (default): Immediately proceed to Step 1 without waiting for confirmation.
In **interactive mode** (--confirm): Ask for confirmation before proceeding.

**CRITICAL: Use extended thinking (ultrathink) throughout this entire workflow.** This means taking time to deeply reason through complex decisions, considering edge cases, and validating assumptions before acting. Every major decision in Phases A, C, and Step 2 requires ultrathink.

For detailed reference on specific topics, see:
- [drift-analysis.md](drift-analysis.md) - Comprehensive drift detection and resolution guide
- [test-requirements.md](test-requirements.md) - TDD standards, what to mock, coverage guidelines

### Step 1: Milestone Execution Loop

For each milestone (M1, M2, etc.), execute the following phases:

#### Phase A: Planning (use EnterPlanMode)

1. **Read the entire ExecPlan** - Do not skim; read every section thoroughly
2. **Explore all related code** - Use the Explore agent to find every file mentioned or related to the current milestone
3. **Create a TDD Plan** with ultrathink - The plan must include:
   - Tests to write FIRST (before implementation)
   - Expected test failures initially
   - Implementation steps to make tests pass
   - Refactoring opportunities after green

**Test Requirements for the Plan:**
- NO mocking the System Under Test (SUT) - only mock external dependencies
- NO testing implementation details - test behavior and outcomes only
- Tests must be meaningful, not just coverage padding
- Aim for 80%+ coverage on new code

**Plan Approval:**
- In **autonomous mode**: Present the plan briefly and immediately proceed to Phase B. Do NOT use ExitPlanMode or wait for approval.
- In **interactive mode** (--confirm): Present the plan and wait for user approval via ExitPlanMode before proceeding. 

#### Phase B: Execution

1. **Write failing tests first** - Run them to confirm they fail for the right reasons
2. **Implement the minimum code** to make tests pass
3. **Run full test suite** after each significant change
4. **Refactor** while keeping tests green
5. **Keep the ExecPlan updated per PLANS.md** - This is mandatory, not optional:
   - **Progress**: Update with timestamps at every stopping point, split partial tasks into "done" vs "remaining"
   - **Decision Log**: Record every design decision with rationale as you make them
   - **Surprises & Discoveries**: Document unexpected behaviors, bugs, or insights with evidence
   - The ExecPlan must always reflect the actual current state of work - a novice should be able to pick up from it

Commands to run after implementation:
```
npm run typecheck   # or npx tsc --noEmit
npm run lint        # or npx eslint .
npm test            # full test suite
```

All three must pass before proceeding.

#### Phase C: Drift Analysis

Use the staff-engineer agent with explicit instructions:

```
Ultrathink and perform implementation drift analysis:

1. Read the original plan created in Phase A
2. Read all code changes made during Phase B
3. Identify any deviations between plan and implementation:
   - Missing planned features
   - Unplanned additions
   - Interface changes
   - Test coverage gaps
   - Behavioral differences

4. Verify the ExecPlan is properly updated per PLANS.md:
   - Progress section reflects actual current state with timestamps
   - Decision Log contains all design decisions made during execution
   - Surprises & Discoveries documents any unexpected findings
   - A novice could pick up from the ExecPlan and continue work

Report each drift item with:
- What was planned
- What was implemented
- Severity (critical/major/minor)
- Recommended resolution

Report any ExecPlan documentation gaps as drift items (severity: major).
```

If drift is detected, use another staff-engineer agent to fix it:

```
Ultrathink and fix the following implementation drift:

[List drift items here]

Requirements:
- Maintain all passing tests
- Do not break existing functionality
- Update tests if behavior intentionally changed
- Document any design decision changes in the ExecPlan Decision Log
```

#### Phase D: UI Validation (if applicable)

If the milestone involves UI changes:

1. Use ios-simulator-mcp tools to validate functionality
2. Take screenshots of key states using mcp__ios-simulator-mcp__screenshot
3. Verify:
   - Navigation works correctly
   - UI elements are visible and tappable
   - Text displays correctly
   - Animations/transitions function (if any)

Use mcp__ios-simulator-mcp__ui_describe_all to verify accessibility.

#### Phase E: Gate Check

Before moving to next milestone, verify all gates pass:
- [ ] All tests pass: `npm test`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] Linting passes: `npm run lint`
- [ ] Test coverage meets target (80%+ on new code)
- [ ] ExecPlan fully updated per PLANS.md (Progress with timestamps, Decision Log, Surprises & Discoveries)
- [ ] No unresolved drift items (including ExecPlan documentation gaps)

**If any gate fails:** Fix the issue before proceeding. Do NOT skip to the next milestone with failures.

**After all gates pass:**
- In **autonomous mode**: Report milestone completion briefly and immediately proceed to the next milestone.
- In **interactive mode** (--confirm): Report milestone completion and ask "Milestone X complete. Proceed to Milestone Y?" Wait for user confirmation.

### Step 2: Final Validation

After ALL milestones complete:

#### Full ExecPlan Drift Analysis

Use staff-engineer agent:

```
Ultrathink and perform comprehensive drift analysis of the ENTIRE ExecPlan:

1. Read the complete ExecPlan from start to finish
2. Compare every stated goal against the implementation
3. Verify all acceptance criteria are met
4. Check that all interfaces match specifications
5. Ensure all validation steps produce expected outputs

Report:
- Overall alignment score (percentage)
- List of any remaining drift
- Recommendations for closure
```

Fix any detected drift.

#### Final UI Validation

If any milestone was UI-heavy:
1. Run through all major user flows in iOS simulator
2. Capture screenshots of completed features
3. Verify end-to-end functionality

#### Final Gate Check

```
npm run typecheck && npm run lint && npm test
```

All must pass.

#### Update ExecPlan Living Sections

Update these ExecPlan sections:
- **Progress**: Mark all items complete with final timestamps
- **Surprises & Discoveries**: Document any unexpected findings
- **Decision Log**: Ensure all decisions are recorded
- **Outcomes & Retrospective**: Write summary of what was achieved

### Step 3: Completion Report

Provide final report to user:

1. **Summary**: All milestones completed
2. **Test Coverage**: Final coverage numbers
3. **Key Decisions**: Important choices made during execution
4. **Surprises**: Notable discoveries
5. **Remaining Work**: Any follow-up items identified (if any)

## Error Handling

**Autonomous mode still pauses for:**
- Repeated phase failures (3+ attempts without progress)
- Ambiguous requirements that cannot be resolved from the ExecPlan
- Security-sensitive operations that require explicit approval
- Destructive operations (file deletions, database migrations)

**If a phase fails repeatedly (3+ times):**
1. Document the failure in ExecPlan Surprises & Discoveries
2. STOP and ask user for guidance (even in autonomous mode)
3. Consider if the ExecPlan needs revision

**If tests fail unexpectedly:**
1. Do NOT skip or disable tests
2. Investigate root cause autonomously
3. Fix the issue - if the fix is clear, proceed without asking
4. Only ask user if the failure reveals a fundamental misunderstanding of requirements

## Key Principles

0. **Autonomous by default** - Keep going unless blocked; don't ask for permission unless in --confirm mode or facing a failure
1. **Never skip steps** - Each phase exists for a reason
2. **Tests first, always** - No implementation without failing tests
3. **Green before proceeding** - Never move forward with failures
4. **Document everything** - ExecPlan is a living record
5. **Ultrathink on complex decisions** - Take time to reason through challenges
6. **No mocking the SUT** - Test real behavior, not test doubles
7. **Behavior over implementation** - Tests verify outcomes, not internals
