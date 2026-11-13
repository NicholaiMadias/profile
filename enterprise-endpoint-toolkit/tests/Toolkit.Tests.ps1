BeforeAll {
 Import-Module "$PSScriptRoot/../modules/WorkspaceONE/WorkspaceONE.psm1" -Force
 Import-Module "$PSScriptRoot/../modules/EndpointCompliance/EndpointCompliance.psm1" -Force
 Import-Module "$PSScriptRoot/../modules/Monitoring/Monitoring.psm1" -Force
}
Describe 'Workspace ONE inventory reference' {
 BeforeEach {
  Mock Invoke-RestMethod { [pscustomobject]@{ Devices=@([pscustomobject]@{Id=1}) } } -ModuleName WorkspaceONE
 }
 It 'returns inventory from a successful response' {
  @(Get-WSODeviceInventory -Server 'example.test' -ApiKey 'test' -PageSize 10).Count | Should -Be 1
 }
 It 'rejects malformed API response' {
  Mock Invoke-RestMethod { [pscustomobject]@{ Results=@() } } -ModuleName WorkspaceONE
  { Get-WSODeviceInventory -Server 'example.test' -ApiKey 'test' } | Should -Throw '*missing Devices*'
 }
 It 'rejects silently truncated inventory' {
  Mock Invoke-RestMethod { [pscustomobject]@{ Devices=@([pscustomobject]@{Id=1}) } } -ModuleName WorkspaceONE
  { Get-WSODeviceInventory -Server 'example.test' -ApiKey 'test' -PageSize 1 -MaxPages 1 } | Should -Throw '*incomplete*'
 }
 It 'rejects invalid hostnames' {
  { Get-WSODeviceInventory -Server 'example.test/evil' -ApiKey 'test' } | Should -Throw
 }
}
Describe 'Endpoint inventory reference' {
 It 'classifies missing last logon as unknown' {
  Mock Get-ADComputer { [pscustomobject]@{Name='test';OperatingSystem='Windows';LastLogonDate=$null} } -ModuleName EndpointCompliance
  @(Get-EndpointCompliance)[0].Status | Should -Be 'Unknown'
 }
}
Describe 'Service health reference' {
 It 'reports missing services' {
  Mock Get-Service { $null } -ModuleName Monitoring
  @(Get-ServiceHealth -Services 'missing-service')[0].Status | Should -Be 'NotFound'
 }
}
