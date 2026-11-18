function Get-WSODeviceInventory {
 [CmdletBinding()]
 param(
  [Parameter(Mandatory)][ValidatePattern('^[a-zA-Z0-9.-]+$')][string]$Server,
  [Parameter(Mandatory)][ValidateNotNullOrEmpty()][string]$ApiKey,
  [ValidateRange(1,500)][int]$PageSize=500,
  [ValidateRange(1,10000)][int]$MaxPages=100,
  [string]$AccessToken
 )
 $headers=@{'aw-tenant-code'=$ApiKey;Accept='application/json'}
 if ($AccessToken) { $headers['Authorization']="Bearer $AccessToken" }
 for($page=0;$page -lt $MaxPages;$page++){
  $uri="https://$Server/API/mdm/devices/search?pagesize=$PageSize&page=$page"
  $response=Invoke-RestMethod -Uri $uri -Headers $headers -Method Get -TimeoutSec 30 -MaximumRedirection 0 -ErrorAction Stop
  if ($null -eq $response -or $null -eq $response.Devices) {
   throw "Workspace ONE response missing Devices at page $page; inventory incomplete"
  }
  $devices=@($response.Devices)
  foreach($device in $devices){$device}
  if($devices.Count -lt $PageSize){return}
 }
 throw "Workspace ONE reached MaxPages=$MaxPages; inventory may be incomplete. Increase limit after validating tenant pagination."
}
Export-ModuleMember -Function Get-WSODeviceInventory
# Validate pagination indexing and OAuth permissions against the target tenant before operational use.
