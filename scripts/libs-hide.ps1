# Git Submodules Hide Script
# Bu script hozir yuklab olingan submodule'larni yashiradi (deinitialize qiladi)

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

function Get-InitializedSubmodules {
    # Hozir yuklab olingan submodule'larni olish
    $status = git submodule status 2>$null
    $initialized = @()
    
    if ($status) {
        foreach ($line in $status) {
            # Format: " commit_hash path (branch)" yoki "-commit_hash path"
            if ($line -match '^\s*[-]?[0-9a-f]+\s+(.+?)(\s+\(.*\))?$') {
                $path = $matches[1].Trim()
                $name = ($path -replace "libs/", "")
                if (-not [string]::IsNullOrWhiteSpace($path)) {
                    $initialized += @{
                        Path = $path
                        Name = $name
                    }
                }
            }
        }
    }
    
    # Agar git submodule status ishlamasa, .gitmodules dan o'qish
    if ($initialized.Count -eq 0 -and (Test-Path ".gitmodules")) {
        $content = Get-Content ".gitmodules"
        $currentPath = ""
        
        foreach ($line in $content) {
            if ($line -match '^\s*path\s*=\s*(.+)') {
                $currentPath = $matches[1].Trim()
                if (Test-Path $currentPath) {
                    $name = ($currentPath -replace "libs/", "")
                    $initialized += @{
                        Path = $currentPath
                        Name = $name
                    }
                }
            }
        }
    }
    
    return $initialized
}

function Show-InitializedSubmodules {
    param($initialized)
    
    Write-ColorText "`nHozir yuklab olingan Git Submodules:" "Cyan"
    Write-ColorText "==================================================" "Cyan"
    
    if ($initialized.Count -eq 0) {
        Write-ColorText "X Hech qanday submodule yuklab olinmagan!" "Red"
        return $false
    }
    
    for ($i = 0; $i -lt $initialized.Count; $i++) {
        $module = $initialized[$i]
        $number = $i + 1
        
        Write-ColorText "$number. $($module.Name)" "Yellow"
        Write-ColorText "   Path: $($module.Path)" "Gray"
        Write-ColorText "   Status: OK Yuklab olingan" "Green"
        Write-Host ""
    }
    
    return $true
}

function Add-ToNxIgnore {
    param($path)
    
    $nxignoreFile = ".nxignore"
    $content = @()
    $nxIgnorePath = "$path"
    
    # Mavjud .nxignore faylini o'qish
    if (Test-Path $nxignoreFile) {
        $content = Get-Content $nxignoreFile
    }
    
    # Agar path allaqachon mavjud bo'lmasa, qo'shish
    if ($content -notcontains $nxIgnorePath -and $content -notcontains $path) {
        $content += $nxIgnorePath
        $content | Set-Content $nxignoreFile -Encoding UTF8
        Write-ColorText "INFO $nxIgnorePath .nxignore fayliga qo'shildi" "Cyan"
    }
}

function Hide-Submodules {
    param($initialized, $selection)
    
    $numbers = $selection -split "," | ForEach-Object { $_.Trim() }
    $toHide = @()
    
    foreach ($num in $numbers) {
        if ($num -match '^\d+$' -and [int]$num -ge 1 -and [int]$num -le $initialized.Count) {
            $index = [int]$num - 1
            $toHide += $initialized[$index]
        }
        else {
            Write-ColorText "X Noto'g'ri raqam: $num" "Red"
            return $false
        }
    }
    
    if ($toHide.Count -eq 0) {
        Write-ColorText "X Hech qanday submodule tanlanmadi!" "Red"
        return $false
    }
    
    Write-ColorText "`nTanlangan submodule'larni yashirish..." "Cyan"
    Write-ColorText "WARNING Bu operatsiya faqat working directory'ni tozalaydi, git history'ga ta'sir qilmaydi!" "Yellow"
    
    foreach ($module in $toHide) {
        Write-ColorText "$($module.Name) ni yashirish..." "Yellow"
        
        try {
            # Submodule'ni deinitialize qilish
            git submodule deinit -f $module.Path
            if ($LASTEXITCODE -eq 0) {
                Write-ColorText "OK $($module.Name) muvaffaqiyatli yashirildi!" "Green"
                
                # .nxignore ga qo'shish
                Add-ToNxIgnore $module.Path
            }
            else {
                Write-ColorText "X $($module.Name) yashirishda xatolik!" "Red"
            }
        }
        catch {
            Write-ColorText "X $($module.Name) yashirishda xatolik: $_" "Red"
        }
    }
    
    return $true
}

# Main script logic
try {
    Write-ColorText "Git Submodules Manager - Hide Mode" "Magenta"
    
    $initialized = Get-InitializedSubmodules
    $hasModules = Show-InitializedSubmodules $initialized
    
    if (-not $hasModules) {
        exit 1
    }
    
    if (-not $Selection) {
        Write-ColorText "Qaysi submodule'larni yashirmoqchisiz?" "Cyan"
        Write-ColorText "Misol: 1 yoki 2 yoki 1,2" "Gray"
        $Selection = Read-Host "Raqamlarni kiriting"
    }
    
    if ([string]::IsNullOrWhiteSpace($Selection)) {
        Write-ColorText "X Hech narsa tanlanmadi!" "Red"
        exit 1
    }
    
    # Tasdiqlash
    Write-ColorText "`nWARNING Rostdan ham tanlangan submodule'larni yashirmoqchimisiz?" "Yellow"
    Write-ColorText "Bu ularni working directory'dan olib tashlaydi (git history'ga ta'sir qilmaydi)" "Gray"
    $confirm = Read-Host "Davom etish uchun 'ha' yozing"
    
    if ($confirm -eq "ha" -or $confirm -eq "yes" -or $confirm -eq "y") {
        $success = Hide-Submodules $initialized $Selection
        if ($success) {
            Write-ColorText "`nOperatsiya muvaffaqiyatli yakunlandi!" "Green"
            Write-ColorText "INFO Kerak bo'lsa, libs:show orqali yana yuklab olishingiz mumkin" "Cyan"
        }
    }
    else {
        Write-ColorText "X Operatsiya bekor qilindi!" "Red"
    }
}
catch {
    Write-ColorText "X Xatolik yuz berdi: $_" "Red"
    exit 1
}
