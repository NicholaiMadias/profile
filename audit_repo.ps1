# Simple audit script for PowerShell secrets
# Scans *.ps1, *.env, *.json files for common secret patterns
# Outputs file paths and line numbers where matches are found
$patterns = @(
    'AIza',                # Google API key
    'ya29\.',             # OAuth refresh token prefix
    'AAAA',                # Generic placeholder token pattern
    '-----BEGIN PRIVATE KEY-----',
    'private_key',
    'secret',
    'password'
)
Get-ChildItem -Recurse -Include *.ps1, *.env, *.json | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content -Path $file -ErrorAction SilentlyContinue
    if ($null -eq $content) { return }
    for ($i = 0; $i -lt $content.Length; $i++) {
        $line = $content[$i]
        foreach ($pat in $patterns) {
            if ($line -match $pat) {
                Write-Host "Potential secret in $file : line $($i+1) -> $line"
            }
        }
    }
}
