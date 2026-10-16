# Response Drill

Practice a containment-and-recovery sequence with explicit prerequisites and an inspectable exercise clock.

**Field:** Incident response  
**Relevant roles:** Junior Incident Response Analyst · SOC Analyst I  
**Status:** working prototype, published on GitHub and Vercel.

[**Open the live interactive lab**](https://response-drill.vercel.app/)

The hosted lab runs synthetic exercises in your browser. See the scope below for local integration exercises and limitations.

## Run

Requires Node.js 22 or newer. The core prototype has no npm dependencies.

```sh
npm test
npm run build
npm start
```

Open `http://127.0.0.1:8767`. Use `PORT=8770 npm start` for another port.
To run analysis without a browser:

```sh
npm run analyze
node run.mjs input.json
```

## Explore

1. Capture evidence, revoke sessions, and disable the account. Inspect the containment checkpoint.
2. Append rotate-credentials, validate-recovery, and restore-account to complete recovery.
3. Try restoring before validation. The state machine must reject the sequence and explain the missing prerequisite.

## What is implemented

- A project-specific analysis engine shared by the browser and CLI.
- Guided controls plus editable/importable JSON input (maximum 1 MB).
- Computed decisions, supporting records, explicit empty/error states, and
  downloadable evidence containing the input and limitations.
- Self-hosted Space Grotesk headings and DM Sans text; 18px body text,
  16px supporting text, 15px technical labels, keyboard focus, reduced motion,
  and responsive evidence rows.
- Independent boundary and regression tests in `tests/`.

## Scope and limitations

This is a tabletop state-machine exercise. It changes no live account and executes no OS commands. Durations are simulated, not measured operational performance.

All bundled identities, documents, logs, and advisories are fictional. Browser
inputs are visitor-controlled; this public demo is not a trusted security
boundary. Do not use it with private production data. Local enforcement or
provider runners, where provided, have their own documented setup and limits.
Do not report fixture outcomes as production results or live-model findings.

## Publish independently

This directory is a complete, separate GitHub/Vercel project. After creating a
repository, push this directory as its root. Import that repository in Vercel:
framework **Other**, build command **npm run build**, output **public**.
There are no required secrets for the public demo. Do not include `public/`,
`.env`, provider credentials, or actual investigation evidence in Git.

## Structure

- `web/engine.js`: domain-specific analysis and validation
- `web/runtime.js`: input validation, canonicalization, and hashing utilities
- `web/app.js`: accessible controls, result views, imports, and exports
- `tests/`: independently asserted security and behavior tests
- `docs/THREAT-MODEL.md`: trust boundaries and claims
- `scripts/`: optional local integrations, if applicable

## Validation

Run `npm test` for current results. Browser viewport checks and performance
metrics must be measured separately; passing engine tests does not establish
visual accessibility or production readiness.

Font notices are included in `web/fonts/`. Source code is MIT licensed.
