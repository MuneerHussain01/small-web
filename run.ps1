# ---------------------------------------------------------------
# run.ps1  -  starts both backend and frontend in separate windows
#
# From VS Code terminal:
#   cd D:\wyxan-project
#   .\run.ps1
# ---------------------------------------------------------------

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "Starting Small Web..." -ForegroundColor Cyan
Write-Host "Backend  ->  http://localhost:4000" -ForegroundColor Gray
Write-Host "Frontend ->  http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "Close the two new windows to stop the servers." -ForegroundColor Gray
Write-Host ""

# open backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend'; Write-Host 'Backend starting...' -ForegroundColor Cyan; npm run start:dev"

# small delay so backend starts first
Start-Sleep -Seconds 2

# open frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend'; Write-Host 'Frontend starting...' -ForegroundColor Cyan; npm run dev"

Write-Host "Both servers are starting. Open http://localhost:3000 in your browser." -ForegroundColor Green
