$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptDirectory

$buildScript = $scriptDirectory + '\build.ps1'

Start-Process -FilePath "powershell.exe" -ArgumentList ('-NoProfile -ExecutionPolicy Bypass -File "' + $buildScript + '"') -Verb RunAs

Start-Sleep -Seconds 10

$newProcesses = Get-Process | Where-Object {$_.Name -like "*node*"}

$newProcesses.foreach{
    $_.WaitForExit()
}

./install.ps1

