# Self-configuring startup script for Spring Boot Blog REST API

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Spring Boot Blog API Run Controller" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Configure JDK 17
$JavaHome = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
if (-not (Test-Path $JavaHome)) {
    Write-Error "JDK 17 was not found at $JavaHome. Please run winget install Microsoft.OpenJDK.17 first."
}
$env:JAVA_HOME = $JavaHome
$env:PATH = "$JavaHome\bin;$env:PATH"
Write-Host "Using JDK 17: $JavaHome" -ForegroundColor Green

# 2. Configure Maven
$MavenVersion = "3.9.6"
$MavenDir = Join-Path $PSScriptRoot ".maven"
$MavenBinDir = Join-Path $MavenDir "apache-maven-$MavenVersion\bin"
$MavenBin = Join-Path $MavenBinDir "mvn.cmd"

if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    if (-not (Test-Path $MavenBin)) {
        Write-Host "Maven not detected in PATH. Downloading Apache Maven $MavenVersion..." -ForegroundColor Yellow
        $Url = "https://archive.apache.org/dist/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
        $ZipPath = Join-Path $PSScriptRoot "maven.zip"
        
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $Url -OutFile $ZipPath -UseBasicParsing
        
        Write-Host "Extracting Maven..." -ForegroundColor Yellow
        Expand-Archive -Path $ZipPath -DestinationPath $MavenDir -Force
        Remove-Item -Path $ZipPath -Force
        Write-Host "Maven installed successfully to $MavenDir" -ForegroundColor Green
    }
    $env:PATH = "$MavenBinDir;$env:PATH"
}

Write-Host "Using Maven: $(Get-Command mvn | Select-Object -ExpandProperty Source)" -ForegroundColor Green

# 3. Compile and Run Tests
Write-Host "`nBuilding project and running unit tests..." -ForegroundColor Cyan
& mvn clean package

# 4. Start Application
Write-Host "`nLaunching Spring Boot application..." -ForegroundColor Cyan
Write-Host "App will listen on http://localhost:8080" -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate application." -ForegroundColor Yellow
& mvn spring-boot:run
