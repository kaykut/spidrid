# Drift Analysis Reference

This document provides detailed guidance on performing implementation drift analysis.

## What is Drift?

Implementation drift occurs when the actual code diverges from the planned specification. Drift is not inherently bad - sometimes it represents valid design evolution - but it must be intentional and documented.

## Types of Drift

### 1. Missing Features
The plan specified functionality that was not implemented.

**Detection**: Compare each planned feature against the codebase.
**Resolution**: Implement the missing feature OR document why it was intentionally omitted in the Decision Log.

### 2. Interface Drift
Function signatures, component props, or API contracts differ from specification.

**Detection**: Compare specified interfaces against actual code.
**Resolution**: Update code to match spec OR update spec if the change was an improvement, documenting the rationale.

### 3. Behavioral Drift
Code behaves differently than the plan described.

**Detection**: Run acceptance scenarios from the plan and compare outputs.
**Resolution**: Fix behavior OR update plan with new expected behavior and rationale.

### 4. Structural Drift
Files are in different locations, named differently, or organized differently than planned.

**Detection**: Compare planned file paths against actual paths.
**Resolution**: Reorganize to match OR update plan with new structure and rationale.

### 5. Test Coverage Drift
Tests don't cover what the plan specified, or cover different scenarios.

**Detection**: Review test files against planned test cases.
**Resolution**: Add missing tests OR document why certain tests were modified.

### 6. Unplanned Additions
Code was added that wasn't in the plan.

**Detection**: Review all new code and compare against plan scope.
**Resolution**: Document the addition in the plan OR remove if not needed.

## Drift Analysis Checklist

For each milestone, verify:

- [ ] All planned files exist at specified paths
- [ ] All planned functions/components exist with correct signatures
- [ ] All planned tests exist and pass
- [ ] All acceptance criteria produce expected outputs
- [ ] No major unplanned additions exist without documentation
- [ ] All interfaces match specifications
- [ ] Error handling matches plan

## Severity Levels

### Critical
- Core functionality missing or broken
- Security-related deviations
- Breaking changes to public APIs
- Tests that should exist but don't

### Major
- Significant behavioral differences
- Interface changes that affect consumers
- Missing edge case handling
- Performance characteristics differ significantly

### Minor
- Naming differences
- Code organization differs slightly
- Extra helper functions added
- Minor documentation gaps

## Resolution Process

1. **Document the drift** - Write down exactly what differs
2. **Assess intent** - Was this an intentional improvement or oversight?
3. **Evaluate impact** - What breaks if we don't fix this?
4. **Choose resolution path**:
   - Fix code to match plan
   - Update plan to reflect intentional change
   - Both (if partial drift)
5. **Update Decision Log** - Record the decision and rationale
6. **Verify resolution** - Confirm tests pass and behavior is correct

## Example Drift Report

```markdown
## Drift Analysis: Milestone 3

### Item 1: Missing Error Boundary
- **Planned**: ErrorBoundary component wrapping ArticleReader
- **Implemented**: No error boundary present
- **Severity**: Major
- **Resolution**: Implement ErrorBoundary as specified

### Item 2: Interface Change
- **Planned**: `fetchArticle(id: string): Promise<Article>`
- **Implemented**: `fetchArticle(id: string, options?: FetchOptions): Promise<Article>`
- **Severity**: Minor (additive change)
- **Resolution**: Update plan to document the improvement

### Item 3: Unplanned Addition
- **Planned**: Not specified
- **Implemented**: Added ArticleCache service
- **Severity**: Minor (enhancement)
- **Resolution**: Document in plan as discovered optimization

Overall Alignment: 92%
Action Items: 1 critical, 1 documentation update
```

## When Drift is Acceptable

Drift is acceptable when:
1. It represents a clear improvement discovered during implementation
2. It's documented in the Decision Log with rationale
3. It doesn't break acceptance criteria
4. Tests are updated to reflect the change
5. The ExecPlan is updated to reflect reality

Drift is NOT acceptable when:
1. It silently changes expected behavior
2. It removes planned functionality without discussion
3. It introduces technical debt without acknowledgment
4. Tests are weakened or removed to accommodate it
