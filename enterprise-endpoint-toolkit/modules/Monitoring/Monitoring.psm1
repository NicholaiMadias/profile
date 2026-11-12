function Get-ServiceHealth {
 [CmdletBinding()]
 param([Parameter(Mandatory)][string[]]$Services)
 foreach($name in $Services) {
  $service=Get-Service -Name $name -ErrorAction SilentlyContinue
  if($null -eq $service){[pscustomobject]@{Name=$name;Status='NotFound';StartType=$null};continue}
  $service | Select-Object Name,Status,StartType
 }
}
Export-ModuleMember -Function Get-ServiceHealth
