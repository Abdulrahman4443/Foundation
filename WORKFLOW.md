# AI Workflow Drill: Vague vs. Precise Prompts

This document compares two approaches to building a basic settings form: a naive "lazy" approach and a structured "precise" approach using constraints and verification.

## The Experiment

- **Branch 1 (`round-one-vague`)**: Simulates a single, unstructured prompt ("Make a settings form"). The AI was allowed to output whatever it chose with no constraints.
- **Branch 2 (`round-two-precise`)**: Uses an explore-plan-code loop with strict constraints (use `react-hook-form` and `zod`), explicit accessibility requirements (aria-invalid, linked labels), and a mandatory verification step (writing and running a Vitest test suite).

## Diff Analysis and Evaluation

### Correctness and Validation
In `round-one-vague`, the form completely lacked validation. It used standard React controlled inputs with no checks for email format or minimum string length. Submitting empty fields simply popped an alert. In contrast, `round-two-precise` enforced strict `zod` schemas. We caught multiple edge cases right away: what happens on an empty submit? What if the email is malformed? The tests proved these constraints were successfully applied.

### Accessibility (a11y)
The lazy implementation from round one had fundamental accessibility flaws. The inputs used `<span>` tags placed next to `<input>` tags without proper `htmlFor` attributes linking them to IDs. Round two explicitly implemented semantic `<label>` tags with `htmlFor` and mapped validation states to `aria-invalid` and `aria-describedby` attributes to announce errors to screen readers properly.

### Review Effort
Reviewing the lazy round one output was ostensibly "fast" because the code was short, but it would require a complete rewrite to make it production-ready. I immediately caught mistakes: inline styles were used, and there was no state management beyond basic `useState`. 

Round two felt slower initially because of the planning and the test writing phase. However, the end-to-end time was actually faster in terms of reaching production quality. Because the test suite passed automatically, manual QA was dramatically reduced, and I didn't have to go back and incrementally ask the AI to "add validation," "fix labels," etc. 

### AI Mistakes Caught
During the vague prompt approach, the AI made the classic mistake of wrapping a raw `alert()` in the submit handler rather than actually managing the loading state or simulating a proper async API call. In the precise prompt branch, the use of `isSubmitting` from `react-hook-form` handled the submit state correctly, rendering a "Saving..." indicator.

## Conclusion
The vague prompt forces the developer into a "code monkey" role where they have to micromanage and fix the AI's naive choices. The precise prompt elevates the developer to an architect: by defining constraints and a verification loop upfront, the AI outputs production-ready code on the first pass.
