# Git Submodules Management Scripts

Bu papkada libs/ papkasidagi git submodule'lar bilan ishlashni osonlashtirish uchun PowerShell scriptlar joylashgan.

## Scriptlar

### 1. libs-show.ps1
**Maqsad**: Mavjud git submodule'larni ko'rsatish va tanlangan birlarini yuklab olish

**Foydalanish**:
```bash
npm run libs:show
```

**Imkoniyatlar**:
- .gitmodules faylidan barcha submodule'larni o'qiydi
- Har birining holatini ko'rsatadi (yuklab olingan/yuklab olinmagan)
- Interactive tarzda tanlamaniz mumkin
- Bir nechta submodule'ni birdan tanlash mumkin (1,2)

**Misol**:
```
1. admin
   Path: libs/admin
   Status: X Yuklab olinmagan

2. client
   Path: libs/client
   Status: OK Yuklab olingan

Raqamlarni kiriting: 1,2  // ikkalasini ham yuklab oladi
```

### 2. libs-hide.ps1
**Maqsad**: Hozir yuklab olingan submodule'larni yashirish (working directory'dan olib tashlash)

**Foydalanish**:
```bash
npm run libs:hide
```

**Imkoniyatlar**:
- Faqat yuklab olingan submodule'larni ko'rsatadi
- Interactive tarzda tanlamaniz mumkin
- Tasdiqlash so'raydi
- Git history'ga ta'sir qilmaydi, faqat working directory'ni tozalaydi

**Muhim**: Bu operatsiya `git submodule deinit` ishlatadi - bu submodule'ni working directory'dan olib tashlaydi, lekin git history'da saqlanadi.

## Qo'shimcha npm scriptlar

package.json faylida quyidagi scriptlar qo'shildi:

```json
{
  "scripts": {
    "libs:show": "powershell -ExecutionPolicy Bypass -File scripts/libs-show.ps1",
    "libs:hide": "powershell -ExecutionPolicy Bypass -File scripts/libs-hide.ps1"
  }
}
```

## Misol ishlatish

1. **Barcha submodule'larni ko'rish va admin'ni yuklab olish**:
   ```bash
   npm run libs:show
   # 1 ni tanlang
   ```

2. **Bir nechta submodule'ni yuklab olish**:
   ```bash
   npm run libs:show
   # 1,2 ni kiriting
   ```

3. **Admin'ni yashirish**:
   ```bash
   npm run libs:hide
   # 1 ni tanlang va 'ha' bilan tasdiqlang
   ```

## Afzalliklar

- **Oson foydalanish**: Interactive interface
- **Xavfsiz**: Git history'ga ta'sir qilmaydi
- **Tez**: Faqat kerakli submodule'larni yuklash
- **Tartibli**: Working directory'ni toziq saqlash
- **Ranglar**: Chiroyli terminal output

## Texnik ma'lumotlar

- PowerShell 5.1+ bilan mos
- Windows PowerShell'da ishlaydi
- UTF-8 encoding'da yozilgan
- Git 2.0+ bilan mos
