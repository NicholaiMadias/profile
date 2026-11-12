# Enterprise Endpoint Automation Toolkit

Reusable, security-conscious examples for endpoint engineering and reporting.

## Components
- PowerShell: AD computer inactivity inventory, Windows service health, Workspace ONE paginated device search, Microsoft Graph user export, CSV status summary.
- Python: CSV compliance visualization and a paginated Microsoft Graph client.
- AI prompts: Workspace ONE sensor design and Intune migration review.
- Docs: deployment prerequisites and portfolio case study.

**Status:** Portfolio reference implementations, not certified production integrations. Run in a test tenant and validate permissions, API versions, throttling, logging, and organizational policy before use.

## Quick start
```powershell
Import-Module ./modules/EndpointCompliance/EndpointCompliance.psm1
Get-EndpointCompliance -InactiveDays 90
```
```sh
python -m pip install -e ./enterprise-endpoint-toolkit/python
```
Never commit tokens, tenant identifiers, user exports, or device inventory. The repository's GPL-3.0 license applies; check compatibility before reusing in proprietary environments.
