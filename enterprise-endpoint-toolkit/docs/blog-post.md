# Building a Reusable Enterprise Endpoint Automation Toolkit

Endpoint engineering spans identity, device management, service health, and executive reporting. A reusable toolkit should keep each responsibility separate and make data movement explicit.

This project demonstrates five PowerShell modules, a small Python package, and prompts for sensor design and migration analysis. It prioritizes predictable outputs, safe credential handling, and understandable failure modes.

The Active Directory inventory example uses LastLogonDate as an approximate inactivity signal, **not** a definitive compliance judgment. Workspace ONE and Microsoft Graph examples require tenant-specific authorization and validation.

Explore the source under `enterprise-endpoint-toolkit/` in the NicholaiMadias/profile repository. The examples are educational and should be tested before production use.
