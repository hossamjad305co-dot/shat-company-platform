---
name: audit-trail
description: |
  Generates immutable audit logs, tracks user activity, records transaction history, and produces compliance reports.
---

# Audit Trail Engine Skill

## Instructions
1. Review transactions and business events for `Audit Trail Engine`.
2. Apply the following validations:
   - Log records must be append-only and immutable
   - Capture user ID, timestamp, original value, and new value for every database modification
   - Generate unique hashes for each audit record to prevent trace tampering
3. Generate appropriate output matching ERP standard formats.
