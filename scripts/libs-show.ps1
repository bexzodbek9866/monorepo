# Git Submodules Show and Initialize Script
# Bu script mavjud git submodule'larni ko'rsatadi va tanlangan birlarini yuklab oladi

param(
    [string]$Selection = ""
)

# Ranglar uchun
function Write-ColorText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Color
}

function Get-Submodules {
    # .gitmodules faylini o'qish
    if (-not (Test-Path ".gitmodules")) {
        Write-ColorText "X .gitmodules fayli topilmadi!" "Red"
        return @()
    }
    
    $submodules = @()
    $content = Get-Content ".gitmodules"
    $currentModule = @{}
    
    foreach ($line in $content) {
        if ($line -match '^\[submodule "(.+)"\]') {
            if ($currentModule.Count -gt 0) {
                $submodules += $currentModule
            }
            $currentModule = @{
                Name = $matches[1]
                Path = ""
                Url = ""
            }
        }
        elseif ($line -match '^\s*path\s*=\s*(.+)') {
            $currentModule.Path = $matches[1].Trim()
        }
        elseif ($line -match '^\s*url\s*=\s*(.+)') {
            $currentModule.Url = $matches[1].Trim()
        }
    }
    
    if ($currentModule.Count -gt 0) {
        $submodules += $currentModule
    }
    
    return $submodules
}

function Get-InitializedSubmodules {
    # Hozir yuklab olingan submodule'larni tekshirish
    $status = git submodule status 2>$null
    $initialized = @()
    
    if ($status) {
        foreach ($line in $status) {
            if ($line -match '^\s*[0-9a-f]+\s+(.+?)(\s|$)') {
                $initialized += $matches[1]
            }
        }
    }
    
    return $initialized
}

function Show-SubmodulesList {
    param($submodules, $initialized)
    
    Write-ColorText "`nMavjud Git Submodules:" "Cyan"
    Write-ColorText "========================================" "Cyan"
    
    for ($i = 0; $i -lt $submodules.Count; $i++) {
        $module = $submodules[$i]
        $number = $i + 1
        $name = $module.Name -replace "libs/", ""
        $status = if ($initialized -contains $module.Path) { "OK Yuklab olingan" } else { "X Yuklab olinmagan" }
        
        Write-ColorText "$number. $name" "Yellow"
        Write-ColorText "   Path: $($module.Path)" "Gray"
        Write-ColorText "   Status: $status" $(if ($initialized -contains $module.Path) { "Green" } else { "Red" })
        Write-Host ""
    }
}

function Initialize-Submodules {
    param($submodules, $selection)
    
    $numbers = $selection -split "," | ForEach-Object { $_.Trim() }
    $toInitialize = @()
    
    foreach ($num in $numbers) {
        if ($num -match '^\d+$' -and [int]$num -ge 1 -and [int]$num -le $submodules.Count) {
            $index = [int]$num - 1
            $toInitialize += $submodules[$index]
        }
        else {
            Write-ColorText "X Noto'g'ri raqam: $num" "Red"
            return $false
        }
    }
    
    if ($toInitialize.Count -eq 0) {
        Write-ColorText "X Hech qanday submodule tanlanmadi!" "Red"
        return $false
    }
    
    Write-ColorText "`nTanlangan submodule'larni yuklab olish..." "Cyan"
    
    foreach ($module in $toInitialize) {
        $name = $module.Name -replace "libs/", ""
        Write-ColorText "$name ni yuklab olish..." "Yellow"
        
        try {
            git submodule update --init --recursive $module.Path
            if ($LASTEXITCODE -eq 0) {
                Write-ColorText "OK $name muvaffaqiyatli yuklab olindi!" "Green"
            }
            else {
                Write-ColorText "X $name yuklab olishda xatolik!" "Red"
            }
        }
        catch {
            Write-ColorText "X $name yuklab olishda xatolik: $_" "Red"
        }
    }
    
    return $true
}

# Main script logic
try {
    Write-ColorText "Git Submodules Manager - Show Mode" "Magenta"
    
    $submodules = Get-Submodules
    if ($submodules.Count -eq 0) {
        Write-ColorText "X Hech qanday submodule topilmadi!" "Red"
        exit 1
    }
    
    $initialized = Get-InitializedSubmodules
    Show-SubmodulesList $submodules $initialized
    
    if (-not $Selection) {
        Write-ColorText "Qaysi submodule'larni yuklab olmoqchisiz?" "Cyan"
        Write-ColorText "Misol: 1 yoki 2 yoki 1,2" "Gray"
        $Selection = Read-Host "Raqamlarni kiriting"
    }
    
    if ([string]::IsNullOrWhiteSpace($Selection)) {
        Write-ColorText "X Hech narsa tanlanmadi!" "Red"
        exit 1
    }
    
    $success = Initialize-Submodules $submodules $Selection
    if ($success) {
        Write-ColorText "`nOperatsiya muvaffaqiyatli yakunlandi!" "Green"
    }
}
catch {
    Write-ColorText "X Xatolik yuz berdi: $_" "Red"
    exit 1
}
