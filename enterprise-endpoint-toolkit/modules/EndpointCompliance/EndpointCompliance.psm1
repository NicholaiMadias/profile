function Get-EndpointCompliance {
 [CmdletBinding()]
 param([ValidateRange(1,3650)][int]$InactiveDays=90)
 $cutoff=(Get-Date).AddDays(-$InactiveDays)
 Get-ADComputer -Filter * -Properties LastLogonDate,OperatingSystem | ForEach-Object {
  [pscustomobject]@{
   Name=$_.Name; OperatingSystem=$_.OperatingSystem; LastLogonDate=$_.LastLogonDate
   Status=if (-not $_.LastLogonDate) {'Unknown'} elseif ($_.LastLogonDate -lt $cutoff) {'Inactive'} else {'Active'}
  }
 }
}
Export-ModuleMember -Function Get-EndpointCompliance
# LastLogonDate is replicated/approximate; not a real-time compliance or security verdict.
