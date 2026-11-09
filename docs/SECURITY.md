# Security and authentication boundary

## Current state

The public landing and operator workspace are separate build outputs. The operator workspace is a local synthetic prototype with `noindex` metadata. `noindex` is not access control; the operator output must not be placed on public hosting.

No authentication, accounts, passwords, sessions, recovery flow, provider tokens, webhook secrets, or social credentials exist in this repository. Every external adapter fails closed.

## Decision gate before private deployment

The founder must select an owned authentication approach. Entra is explicitly not assumed. The selected implementation must provide proven primitives for:

- password hashing if passwords are used (never custom cryptography);
- secure, rotating, server-side or signed sessions with revocation;
- email/identity verification and recovery;
- MFA or passkeys where appropriate;
- rate limiting, brute-force protection, CSRF defenses, and secure cookies;
- roles at minimum for founder/admin, operator, reviewer, and contributor;
- tenant/project isolation and object-level authorization;
- audit events for sign-in, role, connector, approval, scheduling, publication, and correction actions;
- secret storage outside source and browser storage;
- backup, incident response, access removal, and recovery testing.

## Connector gate

Each provider needs a separate decision covering account owner, application owner, scopes, token storage, renewal, target verification, harmless read proof, write authority, revocation, and receipt storage. “Configured,” “authorized,” “target verified,” “read proven,” and “write proven” are distinct states.

No connector may turn an internal status change into an external action without explicit authority at the action boundary. Success is recorded only from a durable provider receipt.

## Deployment boundary

The public build may later be deployed alone. The operator build requires authentication and authorization first. A host-level route rule, separate project, or separate origin should enforce this split; relying on an unlinked URL is not acceptable.

