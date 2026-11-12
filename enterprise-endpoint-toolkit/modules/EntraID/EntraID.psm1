function Get-EntraUserReport {
 [CmdletBinding()]
 param([string]$OutputFile='./Users.csv')
 if(-not (Get-MgContext)){throw 'Connect-MgGraph -Scopes User.Read.All before running'}
 Get-MgUser -All -Property DisplayName,UserPrincipalName,AccountEnabled |
  Select-Object DisplayName,UserPrincipalName,AccountEnabled |
  Export-Csv -LiteralPath $OutputFile -NoTypeInformation
}
Export-ModuleMember -Function Get-EntraUserReport
