[CmdletBinding()]
param(
 [string]$RepoUrl = 'https://github.com/Amazing-Grace-Home-Living/website.git',
 [string]$Workspace = 'C:\Tools\AmazingGrace',
 [ValidateRange(1,365)][int]$SessionDays = 30,
 [switch]$EnableTerminal,
 [ValidatePattern('^[a-p]{32}$|^$')][string]$ExtensionId = '',
 [switch]$LMStudioOnly
)
$ErrorActionPreference = 'Stop'
$taskName = 'Grace Remote Companion'

if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) { 
    throw 'Task already exists. Inspect it in Task Scheduler before changing it.' 
}

# 1. Auto-Clone / Download Repository Setup
if (-not (Test-Path -LiteralPath $Workspace -PathType Container)) {
    Write-Host "Creating workspace directory at: $Workspace..." -ForegroundColor Cyan
    New-Item -Path $Workspace -ItemType Directory -Force | Out-Null
}

$companionPath = Join-Path $Workspace 'assets\Tools\companion'
$extensionPath = Join-Path $Workspace 'assets\Tools\extension'

if (-not (Test-Path -LiteralPath (Join-Path $companionPath 'Start-GraceRemote.ps1'))) {
    if (Get-Command git -ErrorAction SilentlyContinue) {
        Write-Host "Cloning repository from $RepoUrl..." -ForegroundColor Cyan
        git clone $RepoUrl $Workspace
    } else {
        Write-Host "Git is not installed. Downloading repository zip archive..." -ForegroundColor Cyan
        $zipPath = Join-Path $env:TEMP 'grace_website.zip'
        Invoke-WebRequest -Uri 'https://github.com/Amazing-Grace-Home-Living/website/archive/refs/heads/main.zip' -OutFile $zipPath
        Expand-Archive -Path $zipPath -DestinationPath $env:TEMP\grace_extract -Force
        Copy-Item -Path "$env:TEMP\grace_extract\website-main\*" -Destination $Workspace -Recurse -Force
        Remove-Item -Path $zipPath, "$env:TEMP\grace_extract" -Recurse -Force
    }
}

$launcher = Join-Path $companionPath 'Start-GraceRemote.ps1'
if (-not (Test-Path -LiteralPath $launcher)) {
    throw "Launcher file not found at expected location: $launcher"
}

# 2. Configure Windows Scheduled Task Credentials
$identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
$credential = Get-Credential -UserName $identity -Message 'Windows account password (not PIN). Used by Task Scheduler for unattended startup.'
if (-not $credential -or $credential.UserName -ne $identity) { 
    throw 'Use the same Windows account as the companion and Codex.' 
}

$exe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$arguments = '-NoLogo -NoProfile -NonInteractive -File "{0}" -Workspace "{1}" -SessionDays {2}' -f $launcher, $Workspace, $SessionDays

if ($LMStudioOnly) { $arguments += ' -LMStudioOnly' }
if ($EnableTerminal) { $arguments += ' -EnableTerminal' }
if ($ExtensionId) { $arguments += ' -ExtensionId ' + $ExtensionId }

$action = New-ScheduledTaskAction -Execute $exe -Argument $arguments -WorkingDirectory $companionPath
$trigger = New-ScheduledTaskTrigger -AtStartup
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit ([TimeSpan]::Zero) -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

$plainPassword = $credential.GetNetworkCredential().Password
try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -User $identity -Password $plainPassword -RunLevel Limited | Out-Null
} finally {
    $plainPassword = $null
}

Write-Host "Registered '$taskName'. Extension available at: $extensionPath" -ForegroundColor Green