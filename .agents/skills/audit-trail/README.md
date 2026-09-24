# Audit Trail Engine Skill

Enterprise-grade Accounting Skill for Antigravity.

## Overview
Generates immutable audit logs, tracks user activity, records transaction history, and produces compliance reports.

## Key Enterprise Features
- **ERP Compatibility**: Fully integrates with SAP, Oracle, and Microsoft Dynamics structures.
- **Standards Compliance**: Built to conform with IFRS and local GAAP requirements.
- **Robust Validation**: Enforces critical enterprise accounting constraints automatically.

## Validation Rules
- **Rule 1**: Log records must be append-only and immutable
- **Rule 2**: Capture user ID, timestamp, original value, and new value for every database modification
- **Rule 3**: Generate unique hashes for each audit record to prevent trace tampering

## Best Practices
1. **Regular Reconciliation**: Integrate run logs daily with General Ledger accounts.
2. **Four-Eyes Principle**: Ensure approvals are managed by authorized corporate roles.
3. **Audit Readiness**: Maintain comprehensive logs of all transaction requests.

## Troubleshooting & Common Errors
- **Imbalance Errors**: Verify transaction entries ensure credits match debits.
- **Period Locked**: Verify posting date falls within an open financial period.
- **Unauthorized Role**: Ensure the active credentials match the required workflow access level.
