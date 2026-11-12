function Export-ExecutiveDashboard {
 [CmdletBinding()]
 param([Parameter(Mandatory)][string]$InputFile)
 Import-Csv -LiteralPath $InputFile | Group-Object Status | Select-Object @{N='Status';E={$_.Name}},Count
}
Export-ModuleMember -Function Export-ExecutiveDashboard
