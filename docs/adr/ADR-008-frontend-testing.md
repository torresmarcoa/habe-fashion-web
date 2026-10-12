# ADR-008: Test the Frontend with Vitest and React Testing Library

- **Status:** Accepted
- **Date:** 2026-10-09

## Context

`docs/harness.md` §4 Layer B requires automated tests before an implementation is considered complete, and REQ-NFR-004 states that critical application behavior should allow automated verification.

The frontend testing framework was listed as an open decision in `specs/architecture.md` §15 and must be resolved before automated UI tests are written.

The MVP's critical behavior is mostly presentational and verifiable at the component level: WhatsApp link generation, social media link configuration, navigation targets, page metadata, and accessibility attributes. No test in the MVP needs a running browser.

## Decision

Use **Vitest** as the test runner with **React Testing Library** and **jest-dom** for DOM assertions. Run tests in a jsdom environment.

End-to-end testing with **Playwright** is deferred. It may be introduced when a flow exists that cannot be verified at the component level, at which point this ADR should be revisited.

Requirements to verify with tests include:

- WhatsApp link generation from the configured number (REQ-CONTACT-002).
- Behavior when the WhatsApp number is unconfigured (REQ-CONTACT-005).
- Social media link targets and omission of unconfigured platforms (REQ-SOCIAL-002, REQ-SOCIAL-003).
- Root layout metadata (REQ-SEO-001, REQ-SEO-002).

## Alternatives Considered

1. **Vitest + React Testing Library:** Selected. Fast enough to run on every change, works in a jsdom environment without extra binaries, and tests components the way users interact with them.
2. **Playwright from the start:** Rejected for now. It requires browser binaries, runs considerably slower, and makes SEO metadata and render assertions more brittle for the MVP's needs.
3. **Both from the start:** Rejected as premature. It adds Playwright setup, configuration, and CI time before a flow exists that requires it.

## Consequences

### Positive

- Test runs are fast enough to run on every change.
- No browser binary download or additional infrastructure is required.
- Testing Library's queries by accessible role and name directly exercise the accessibility requirements in REQ-A11Y-003 and REQ-A11Y-005.
- Coverage of the MVP's critical paths is achievable with a small suite.

### Trade-offs

- jsdom does not reproduce real rendering, so visual regressions and layout problems are not caught.
- Playwright will eventually be needed to verify responsive behavior across viewports, which REQ-RESP-001 and REQ-RESP-004 require.
- Two test tools will eventually run side by side once Playwright is introduced.

## Constraints

- Do not disable tests, coverage thresholds, or lint rules to obtain a passing result.
- Do not assert on implementation details; query by role, label, or visible text.
- Do not introduce a snapshot-test-heavy suite; snapshots of markup tend to be updated rather than reviewed.
- Re-evaluate this ADR when end-to-end flows are needed.

## References

- `specs/requirements.md` REQ-NFR-004, REQ-A11Y-003, REQ-A11Y-005
- `docs/harness.md` §4 (Verification Layers)
- `docs/engineering-rules.md` §9 (Testing and Verification)