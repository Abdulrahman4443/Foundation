# Project Rules

1. **Form State and Validation**: Never use unmanaged or ad-hoc controlled inputs for forms. All forms must use `react-hook-form` for state management and `zod` for schema validation. Do not bypass the schema for "simple" fields.

2. **Accessibility Constraints**: All form inputs must have a semantically linked `<label>` using the `htmlFor` attribute. Error messages must map to `aria-invalid` and `aria-describedby` attributes on the input element to ensure screen readers announce validation errors.

3. **Mandatory Verification**: Never consider a UI component "done" until an automated test has verified its behavior. Component PRs must include a test file (e.g., using Vitest and React Testing Library) simulating successful and failed validation paths.
