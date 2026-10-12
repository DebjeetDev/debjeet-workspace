# QUALITY AND TESTING GATES
## What “complete” means on the Real Path

Testing is not a final chapter. It starts with the first function and grows with the system.

## Universal gate for every project

Before marking any project complete:

- Input contract written.
- Output contract written.
- Happy path tested.
- Empty input tested.
- Invalid input tested.
- Boundary values tested.
- Duplicate/repeated calls tested where relevant.
- Failure path tested.
- Mutation and cleanup reviewed.
- README written.
- Student explains the design in their own words.
- Git diff reviewed.
- `git diff --check` passes.

## JavaScript gate

- Node test runner or Vitest tests pass.
- Closure state is explained.
- Async ordering is explained.
- Promise failures are tested.
- Timers are cleaned up.
- No accidental global state.
- No copied implementation presented as student work.

## TypeScript gate

- Strict mode enabled.
- No unexplained `any`.
- External data is narrowed or validated.
- Error and result types are clear.
- Typecheck passes in CI.

## React gate

- Component behaviour is tested.
- Forms have validation and error states.
- Loading, empty, and failure states exist.
- Keyboard and accessible labels work.
- Effects have correct cleanup.
- Unnecessary re-renders are measured before optimisation.
- Production build succeeds.

## Next.js gate

- Server/client boundary is intentional.
- Secrets never reach client code.
- Route and form errors are handled.
- Caching and revalidation are understood.
- Environment variables are documented.
- Deployment smoke test passes.
- At least one Playwright flow passes.

## Backend gate

- Unit tests cover business rules.
- Integration tests cover real route behaviour.
- Database constraints and migrations are tested.
- Auth success and failure cases are tested.
- Authorization is tested separately from authentication.
- Invalid input never reaches business logic.
- Errors have safe client messages and useful server logs.
- Rate limits and abuse paths are considered.
- Health check exists.
- API documentation matches the implementation.
- Deployment and rollback notes exist.

## AI gate

- Model output is schema-validated.
- Provider errors and timeouts are handled.
- Retry policy is bounded.
- Prompt injection is considered.
- Tools have explicit permissions.
- Sensitive data is not sent accidentally.
- Cost and latency are recorded.
- Evaluation examples exist.
- A bad model answer cannot silently become a successful database mutation.
- Human approval exists for destructive actions.

## Release gate

A product is ready for portfolio use only when:

- It is deployed.
- README has live URL and local setup.
- Architecture diagram exists.
- Tests run from a clean checkout.
- CI runs lint, typecheck, and tests.
- Secrets are externalised.
- Logs and failure behaviour are explainable.
- The student can give a five-minute architecture walkthrough.

## Full-path verification after the syllabus is implemented

The final audit will check:

1. One active roadmap exists.
2. No stale J3/J5 duplicate remains.
3. Every project has a folder, plan, source, tests, and status.
4. Every status claim has evidence.
5. Reading references do not masquerade as active tasks.
6. All project test commands pass.
7. All required docs have valid paths.
8. Git worktree, commit, and remote state are verified.
9. The next-AI continuity pack points to the correct immediate action.
