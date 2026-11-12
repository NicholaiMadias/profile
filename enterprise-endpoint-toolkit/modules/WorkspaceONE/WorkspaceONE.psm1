function Get-WSODeviceInventory {
 [CmdletBinding()]
 param([Parameter(Mandatory)][string]$Server,[Parameter(Mandatory)][string]$ApiKey,[int]$PageSize=500,[int]$MaxPages=100)
 if($Server -notmatch '^[a-zA-Z0-9.-]+$'){throw 'Server must be a hostname'}
 $headers=@{'aw-tenant-code'=$ApiKey;Accept='application/json'}
 for($page=0;$page -lt $MaxPages;$page++){
  $uri="https://$Server/API/mdm/devices/search?pagesize=$PageSize&page=$page"
  $response=Invoke-RestMethod -Uri $uri -Headers $headers -Method Get -ErrorAction Stop
  $devices=@($response.Devices)
  foreach($device in $devices){$device}
  if($devices.Count -lt $PageSize){break}
 }
}
Export-ModuleMember -Function Get-WSODeviceInventory
# Depending on tenant configuration, additional OAuth authorization may be required.
