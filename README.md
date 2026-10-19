# Leadership Conversation Lab — Beta 1

A fully static, no-API GitHub Pages simulator, optimized for university Copilot and Gemini first (Claude/ChatGPT also supported), for SOW5377 social work administration and personnel management practice. Based on the earlier Personnel Case Wheel and Employee Corrective Meeting Simulation; redesigned using person-first case generation and realistic employee agency.

## Deploy

1. Create a new public GitHub repository (recommended) or intentionally replace an existing simulation site. No existing repository has been modified by this ZIP.
2. Upload the five website files `index.html`, `style.css`, `cases.js`, `promptEngine.js`, and `script.js` to the root of its default branch.
3. Go to **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.
4. Wait for Pages to publish, then open the HTTPS address. You can also open `index.html` locally for basic operation.

## Platform guidance (student-facing)

- **Microsoft Copilot — university**: default platform; **Automatic** selects the **Short** format (about 2,400 characters) with an explicit first-message script and termination marker. This is intended to fit constrained chat interfaces; university configurations and input limits vary.
- **Google Gemini — university**: **Automatic** selects **Standard** (about 4,900 characters), with more person-first and procedural instructions. Use Short if an institutional deployment rejects the longer prompt.
- **Claude / ChatGPT — optional**: **Automatic** selects **Expanded** for richer nuance; students can choose Short or Standard to compare the *same* prompt across tools. Use these for graded work only where course policy allows.
- Platform choice affects the automatically selected prompt length, **not** who is supervising, the underlying evidence, assignment standards or completion expectations.
- Prompt should be pasted as the **first complete message in a new conversation**. If the model truncates, omits the supervisor briefing or begins the employee dialogue unprompted, restart with Short and report it.
- Case generation runs locally, but chat content is processed by the selected external model. **Never add real identifiable client, student, or employee information.**

## Two distinct modes

- **Assignment (default)**: requires a specific, feasible, jointly understood corrective-action plan with ownership, timeframe and follow-up. Only after realistic agreement does the employee symbolically sign and show `SIMULATION COMPLETE — CORRECTIVE ACTION ASSIGNMENT`. It will NOT automatically agree or sign just to finish.
- **Advanced**: includes disputed allegations, grievances, operational escalation, and seven finalized termination cases; no signature required. Students use `END MEETING` to finish and receive `SIMULATION COMPLETE — ADVANCED LEADERSHIP MEETING`. The marker is NOT a judgment that the meeting was conducted effectively.

`CHECK COMPLETION` provides a no-score procedural checklist in either mode. `END MEETING` in an incomplete assignment shows what remains, without asserting completion. `COACH PAUSE`/`RESUME MEETING` work in request-only coaching mode. `DEBRIEF` can be requested after advanced meetings; no AI-generated student self-reflection is required or produced.

## Assignment alignment

The existing rubric expects: purpose, perspectives, evidence, impact on the employee/team/clients, agency values and relevant verified NASW ethical standards, problem-solving, clear decision/action plan with follow-up, and student reflection. Students submit their full AI transcript and their own answers to: **What did I do well? What would I do differently next time?** The original assignment's Canvas instructions and professor-issued rubric remain controlling.

The case generator distinguishes documented facts from uncertainty and discourages AI-invented allegations, false legal certainty, facile agreement and stereotype-based employee behavior.

The **Determined not to sign** employee response option is Advanced Mode only; Assignment Mode requires an achievable signed-plan pathway without automatic acquiescence.

## Content & testing notes

- Fictional characters only; no personal employee data, network calls, scores, local storage, API keys or external dependencies.
- The copied prompt includes employee portrayal instructions, which students can inspect if they open the preview; this is not a covert case-delivery product.
- Cases are educational and should be reviewed for policy / jurisdiction-specific accuracy before assigning. NASW Code numbering should be verified by the student and instructor against the current official Code.
- Client safety, employee accommodation, HR and investigation situations require policy-informed practice. Do not treat AI roleplays as employment-law advice.

## Attribution

The assignment structure draws on the *Employee Feedback Practice Exercise* by Shalay Jackson, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The associated simulated web application and original case content are independent adaptations for educational practice.
