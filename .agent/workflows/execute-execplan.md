---
description: Executes an ExecPlan document through all milestones using TDD workflow.
---

# Execute ExecPlan Workflow

This workflow automates the complete execution of an ExecPlan document following a rigorous Test-Driven Development workflow with implementation drift analysis.

## Usage

```
/execute-execplan <execplan-path> [--confirm]
```

## Workflow Steps

// turbo-all

1. **Parse Arguments**:
   - `execplan_path`: First argument.
   - `confirm_mode`: Check for `--confirm`.

2. **Load and Validate**:
   - Read the ExecPlan file.
   - Read `PLANS.md`.
   - Identify milestones.

3. **Milestone Execution Loop**:
   For each milestone:
   
   **Phase A: Planning**
   - Read ExecPlan section.
   - Explore related code.
   - Create TDD plan (Tests First, Expected Failures, Implementation).
   - *Interactive Mode*: Wait for approval.

   **Phase B: Execution**
   - Write failing tests first.
   - Implement minimum code.
   - Run tests.
   - Refactor.
   - **Update ExecPlan**: Progress, Decision Log, Surprises.

   **Phase C: Drift Analysis**
   - Analyze implementation vs plan.
   - Fix drift.

   **Phase D: Gate Check**
   - `npm test` (Must Pass)
   - `npm run typecheck` (Must Pass)
   - `npm run lint` (Must Pass)
   - Coverage check.
   - ExecPlan updated?

4. **Final Validation**:
   - Full ExecPlan drift analysis.
   - Final `npm test && npm run typecheck && npm run lint`.
   - Update `Progress`, `Outcomes`, `Decision Log` in ExecPlan.

5. **Completion Report**:
   - Summary of milestones.
   - Coverage stats.
   - Remaining work.
