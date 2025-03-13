# Check if the script is running as administrator
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    # Create a new PowerShell process with elevated privileges
    $newProcess = Start-Process -FilePath "powershell.exe" -ArgumentList ('-NoProfile -ExecutionPolicy Bypass -File "' + $MyInvocation.MyCommand.Path + '"') -Verb RunAs
    
    # If not administrator, stop the current script
    exit
}

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptDirectory

npm install --force

npm run build | Tee-Object -FilePath "build.log"
