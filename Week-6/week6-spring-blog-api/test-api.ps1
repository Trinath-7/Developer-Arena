# API Endpoint verification script for Spring Boot Blog REST API

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "    Blog API Integration Test Runner" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$BaseUrl = "http://localhost:8080/api"

# Helper function to run endpoint requests and format output
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Path,
        [object]$Body = $null
    )
    
    $Url = "$BaseUrl$Path"
    Write-Host "`n[$Method] $Url" -ForegroundColor Yellow
    if ($Body) {
        $JsonBody = $Body | ConvertTo-Json -Compress
        Write-Host "Payload: $JsonBody" -ForegroundColor DarkGray
    }
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        if ($Method -eq "GET") {
            $resp = Invoke-RestMethod -Uri $Url -Method Get -Headers $headers
        } elseif ($Method -eq "POST") {
            $resp = Invoke-RestMethod -Uri $Url -Method Post -Headers $headers -Body $JsonBody
        } elseif ($Method -eq "DELETE") {
            $resp = Invoke-RestMethod -Uri $Url -Method Delete -Headers $headers
            Write-Host "Deleted successfully." -ForegroundColor Green
            return
        }
        
        $resp | ConvertTo-Json -Depth 10 | Write-Host -ForegroundColor Green
    } catch {
        Write-Host "Request failed!" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errBody = $reader.ReadToEnd()
            Write-Host $errBody -ForegroundColor Red
        } else {
            Write-Host $_.Exception.Message -ForegroundColor Red
        }
    }
}

# Wait for service availability check
Write-Host "Checking if API is up on http://localhost:8080..." -ForegroundColor Yellow
$up = $false
for ($i = 1; $i -le 10; $i++) {
    try {
        $tc = New-Object System.Net.Sockets.TcpClient("localhost", 8080)
        $tc.Close()
        $up = $true
        break
    } catch {
        Write-Host "Waiting for service to start... ($i/10)" -ForegroundColor DarkGray
        Start-Sleep -Seconds 3
    }
}

if (-not $up) {
    Write-Error "Could not connect to http://localhost:8080. Please ensure the app is running (run '.\run.ps1' in another terminal)."
}

Write-Host "API is responsive! Running endpoint tests..." -ForegroundColor Green

# 1. Get Categories (initial seed)
Test-Endpoint -Method "GET" -Path "/categories"

# 2. Create a Category
$NewCategory = [PSCustomObject]@{
    name = "Cloud Computing"
    description = "AWS, Azure, Docker, and Kubernetes topics"
}
Test-Endpoint -Method "POST" -Path "/categories" -Body $NewCategory

# 3. Create a Post
$NewPost = [PSCustomObject]@{
    title = "Getting Started with Docker"
    content = "Docker containerization simplifies running apps in microservices environments."
    author = "Jane Cloud"
    categoryId = 1
}
Test-Endpoint -Method "POST" -Path "/posts" -Body $NewPost

# 4. Get Posts (paginated)
Test-Endpoint -Method "GET" -Path "/posts"

# 5. Add a Comment to Post 1
$NewComment = [PSCustomObject]@{
    content = "Loved this post. Extremely helpful information!"
    author = "Alice Security"
    postId = 1
}
Test-Endpoint -Method "POST" -Path "/comments" -Body $NewComment

# 6. Get Comments for Post 1
Test-Endpoint -Method "GET" -Path "/comments/post/1"

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "      Verification Tests Completed!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
