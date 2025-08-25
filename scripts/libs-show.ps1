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
    $currentName = ""
    $currentPath = ""
    $currentUrl = ""
    
    foreach ($line in $content) {
        if ($line -match '^\[submodule "(.+)"\]') {
            # Oldingi modulni saqlash
            if ($currentPath -ne "") {
                $submodules += [PSCustomObject]@{
                    Name = $currentName
                    Path = $currentPath
                    Url = $currentUrl
                }
            }
            # Yangi modul boshlash
            $currentName = $matches[1]
            $currentPath = ""
            $currentUrl = ""
        }
        elseif ($line -match '^\s*path\s*=\s*(.+)') {
            $currentPath = $matches[1].Trim()
        }
        elseif ($line -match '^\s*url\s*=\s*(.+)') {
            $currentUrl = $matches[1].Trim()
        }
    }
    
    # Oxirgi modulni qo'shish
    if ($currentPath -ne "") {
        $submodules += [PSCustomObject]@{
            Name = $currentName
            Path = $currentPath
            Url = $currentUrl
        }
    }
    
    return $submodules
}

function Get-InitializedSubmodules {
    # Hozir yuklab olingan submodule'larni tekshirish
    $status = git submodule status 2>$null
    $initialized = @()
    
    if ($status) {
        foreach ($line in $status) {
            # Faqat "-" belgisi yo'q bo'lgan (initialized) submodule'larni olish
            # "-" belgisi bilan boshlanganlar deinitialize qilingan
            if ($line -match '^\s*[0-9a-f]+\s+(.+?)(\s|$)') {
                $initialized += $matches[1].Trim()
            }
        }
    }
    
    return $initialized
}

function Get-HiddenSubmodules {
    # Git submodule status orqali to'g'ridan-to'g'ri hide qilinganlarni olish
    $status = git submodule status 2>$null
    $hiddenSubmodules = @()
    
    if ($status) {
        foreach ($line in $status) {
            # "-" bilan boshlanganlar hide qilingan
            if ($line -match '^-[0-9a-f]+\s+(.+?)(\s|$)') {
                $path = $matches[1].Trim()
                $name = $path -replace "libs/", ""
                
                $moduleObj = [PSCustomObject]@{
                    Name = $name
                    Path = $path
                    Url = ""
                }
                
                $hiddenSubmodules += $moduleObj
            }
        }
    }
    
    # PowerShell array return muammosini hal qilish uchun
    return ,$hiddenSubmodules
}

function Show-HiddenSubmodulesList {
    param($hiddenSubmodules)
    
    Write-ColorText "`nHide qilingan Git Submodules:" "Cyan"
    Write-ColorText "========================================" "Cyan"
    
    if ($hiddenSubmodules.Count -eq 0) {
        Write-ColorText "X Hech qanday hide qilingan submodule topilmadi!" "Red"
        Write-ColorText "INFO Barcha submodule'lar hozir yuklab olingan!" "Green"
        return $false
    }
    
    for ($i = 0; $i -lt $hiddenSubmodules.Count; $i++) {
        $module = $hiddenSubmodules[$i]
        $number = $i + 1
        $name = $module.Name -replace "libs/", ""
        
        Write-ColorText "$number. $name" "Yellow"
        Write-ColorText "   Path: $($module.Path)" "Gray"
        Write-ColorText "   Status: Hide qilingan" "Red"
        Write-Host ""
    }
    
    return $true
}

function Remove-FromNxIgnore {
    param($path)
    
    $nxignoreFile = ".nxignore"
    $nxIgnorePath = "$path/**"
    
    if (Test-Path $nxignoreFile) {
        $content = Get-Content $nxignoreFile | Where-Object { 
            $_ -ne $path -and $_ -ne $nxIgnorePath -and $_.Trim() -ne "" 
        }
        $content | Set-Content $nxignoreFile -Encoding UTF8
        Write-ColorText "INFO $nxIgnorePath .nxignore faylidan olib tashlandi" "Cyan"
    }
}

function Initialize-Submodules {
    param($hiddenSubmodules, $selection)
    
    $numbers = $selection -split "," | ForEach-Object { $_.Trim() }
    $toInitialize = @()
    
    foreach ($num in $numbers) {
        if ($num -match '^\d+$' -and [int]$num -ge 1 -and [int]$num -le $hiddenSubmodules.Count) {
            $index = [int]$num - 1
            $toInitialize += $hiddenSubmodules[$index]
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
                
                # .nxignore dan olib tashlash
                Remove-FromNxIgnore $module.Path
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
    
    $hiddenSubmodules = Get-HiddenSubmodules
    $hasHiddenModules = Show-HiddenSubmodulesList $hiddenSubmodules
    
    if (-not $hasHiddenModules) {
        exit 0
    }
    
    if (-not $Selection) {
        Write-ColorText "Qaysi submodule'larni yuklab olmoqchisiz?" "Cyan"
        Write-ColorText "Misol: 1 yoki 2 yoki 1,2" "Gray"
        $Selection = Read-Host "Raqamlarni kiriting"
    }
    
    if ([string]::IsNullOrWhiteSpace($Selection)) {
        Write-ColorText "X Hech narsa tanlanmadi!" "Red"
        exit 1
    }
    
    $success = Initialize-Submodules $hiddenSubmodules $Selection
    if ($success) {
        Write-ColorText "`nOperatsiya muvaffaqiyatli yakunlandi!" "Green"
    }
}
catch {
    Write-ColorText "X Xatolik yuz berdi: $_" "Red"
    exit 1
}
