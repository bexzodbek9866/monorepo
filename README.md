# Vue 3 + Quasar + Nx Monorepo

Bu loyiha Vue 3, Quasar Framework va Nx monorepo arxitekturasi asosida qurilgan zamonaviy web ilovadir.

## 🚀 Loyihada ishlatilgan texnologiyalar

### Frontend Framework
- **Vue 3** - Zamonaviy va tez Vue framework (v3.5.13)
- **Quasar Framework** - Material Design asosidagi UI komponentlar kutubxonasi (v2.18.2)
- **Vue Router** - SPA routing uchun (v4.5.0)
- **Pinia** - Vue 3 uchun state management (v3.0.3)

### Build Tools & Dev Environment
- **Vite** - Tez va zamonaviy bundler (v6.0.0)
- **TypeScript** - Tipizatsiya va kod sifati uchun (v5.8.2)
- **Nx** - Monorepo management va build optimization (v21.3.8)
- **Sass/SCSS** - CSS preprocessor (v1.90.0)

### Testing
- **Vitest** - Unit testing framework (v3.0.0)
- **Vue Test Utils** - Vue komponentlarini test qilish uchun (v2.4.6)
- **Playwright** - E2E testing (v1.36.0)
- **JSDOM** - Browser environment simulation

### Code Quality
- **ESLint** - Code linting (v9.8.0)
- **Prettier** - Code formatting (v2.6.2)
- **TypeScript ESLint** - TypeScript uchun linting rules

## 📁 Loyiha strukturasi

```
monorepo/
├── apps/
│   ├── home/                 # Asosiy Vue 3 aplikatsiya
│   │   ├── src/
│   │   │   ├── app/         # App komponenti va NxWelcome
│   │   │   ├── router/      # Vue Router konfiguratsiyasi
│   │   │   ├── stores/      # Pinia store'lar (counter, user)
│   │   │   ├── styles/      # Quasar variables va global styles
│   │   │   └── views/       # Sahifa komponetlari
│   │   └── vite.config.ts   # Vite konfiguratsiyasi
│   └── home-e2e/           # E2E testlar (Playwright)
├── libs/
│   ├── admin/              # Admin library (Git Submodule)
│   │   ├── src/
│   │   │   ├── layouts/    # AdminLayout komponenti
│   │   │   ├── pages/      # Admin sahifalari
│   │   │   └── stores/     # Admin store'lar
│   └── client/             # Client library komponetlari
├── packages/
│   └── home/               # Home package konfiguratsiyasi
├── .gitmodules             # Git submodules konfiguratsiyasi
├── nx.json                 # Nx workspace konfiguratsiyasi
├── package.json            # Root dependencies
└── tsconfig.base.json      # TypeScript base konfiguratsiya
```

## 🔄 Git Submodules

Bu loyihada `libs/admin` kutubxonasi git submodule sifatida boshqariladi. Bu admin kutubxonasini mustaqil repository sifatida rivojlantirish va boshqa loyihalarda qayta ishlatish imkonini beradi.

### Submodule haqida ma'lumot
- **Repository:** https://github.com/bexzodbek9866/admin-lib.git
- **Papka:** `libs/admin`
- **Maqsad:** Admin komponentlarini mustaqil kutubxona sifatida boshqarish

### Submodule bilan ishlash

#### Loyihani clone qilganda submodule'ni yuklab olish:
```bash
git clone --recursive https://github.com/bexzodbek9866/monorepo.git
```

#### Mavjud loyihada submodule'ni initialize qilish:
```bash
git submodule init
git submodule update
# yoki qisqacha:
git submodule update --init --recursive
```

#### Admin kutubxonasini yangilash:
```bash
cd libs/admin
git pull origin master
cd ../..
git add libs/admin
git commit -m "Update admin submodule"
git push origin dev
```

#### Admin kutubxonasida o'zgarish qilish:
```bash
cd libs/admin
# O'zgarishlar qiling
git add .
git commit -m "Your changes in admin library"
git push origin master

# Monorepo da submodule reference'ni yangilang
cd ../..
git add libs/admin
git commit -m "Update admin submodule reference"
git push origin dev
```

### Submodule qo'shish jarayoni (qo'llanma)

Agar siz ham o'z kutubxonangizni submodule qilmoqchi bo'lsangiz:

1. **Kutubxona uchun alohida repository yarating**
2. **Hozirgi kutubxonani backup qiling:**
   ```bash
   cp -r libs/your-lib backup-your-lib
   ```
3. **Kutubxonada git repository yarating:**
   ```bash
   cd libs/your-lib
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/your-lib.git
   git push -u origin master
   ```
4. **Monorepo dan kutubxonani o'chiring:**
   ```bash
   cd ../..
   git rm -r libs/your-lib
   ```
5. **Submodule sifatida qo'shing:**
   ```bash
   git submodule add https://github.com/username/your-lib.git libs/your-lib
   git commit -m "Convert your-lib to submodule"
   git push origin dev
   ```

## 🛠 0'dan loyihani qurish bosqichlari

### 1. Nx Workspace yaratish
```bash
npx create-nx-workspace@latest monorepo --preset=empty --packageManager=npm
cd monorepo
```

### 2. Vue 3 app qo'shish
```bash
npx nx g @nx/vue:app home --routing --style=scss --unitTestRunner=vitest --e2eTestRunner=playwright
```

### 3. Quasar Framework o'rnatish
```bash
npm install quasar @quasar/extras @quasar/vite-plugin
```

### 4. Pinia state management qo'shish
```bash
npm install pinia
```

### 5. Admin va Client library'larni yaratish
```bash
npx nx g @nx/vue:lib admin --publishable --importPath=@apps/admin
npx nx g @nx/vue:lib client --publishable --importPath=@apps/client
```

### 6. Quasar konfiguratsiyasi
Vite config'da Quasar plugin'ni sozlash:
```typescript
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar()
  ]
});
```

### 7. Store'larni yaratish
- `stores/counter.ts` - Counter state
- `stores/user.ts` - User management
- `stores/adminStore.ts` - Admin functionality

### 8. Vue Router sozlash
Router konfiguratsiyasi `router/index.ts` faylida:
- Home view

### 9. Komponentlar yaratish
- `App.vue` - Asosiy app komponenti
- `NxWelcome.vue` - Nx welcome sahifasi
- Admin layout va sahifalar
- Demo sahifalar

## 📋 Asosiy buyruqlar

### Development
```bash
npm run dev          # Home app'ni development rejimida ishga tushirish
npm run build        # Production build yaratish
npm run test         # Unit testlarni ishga tushirish
npm run lint         # Code linting
```

### Libs Management (Git Submodules)
```bash
npm run libs:show    # Hide qilingan submodule'larni ko'rsatish va yuklab olish
npm run libs:hide    # Yuklab olingan submodule'larni yashirish (deinitialize)
```

#### Libs:show buyrug'i
Bu buyruq hide qilingan (deinitialize qilingan) git submodule'larni ko'rsatadi va tanlagan birlarini yuklab oladi:

```bash
npm run libs:show
```

**Funksiyalari:**
- Hide qilingan submodule'lar ro'yxatini ko'rsatadi
- Interaktiv tarzda yuklab olish uchun submodule tanlash imkonini beradi
- Tanlangan submodule'larni avtomatik initialize qiladi
- `.nxignore` faylidan avtomatik olib tashlaydi (Nx tomonidan ignore qilinmasligi uchun)

**Misol ishlatish:**
```
Hide qilingan Git Submodules:
========================================
1. admin
   Path: libs/admin
   Status: Hide qilingan

Qaysi submodule'larni yuklab olmoqchisiz?
Misol: 1 yoki 2 yoki 1,2
Raqamlarni kiriting: 1
```

#### Libs:hide buyrug'i
Bu buyruq hozir yuklab olingan git submodule'larni yashiradi (deinitialize qiladi):

```bash
npm run libs:hide
```

**Funksiyalari:**
- Yuklab olingan submodule'lar ro'yxatini ko'rsatadi
- Interaktiv tarzda yashirish uchun submodule tanlash imkonini beradi
- Tanlangan submodule'larni deinitialize qiladi
- `.nxignore` fayliga avtomatik qo'shadi (Nx tomonidan ignore qilinishi uchun)
- Working directory'ni tozalaydi, lekin git history'ga ta'sir qilmaydi

**Misol ishlatish:**
```
Hozir yuklab olingan Git Submodules:
==================================================
1. admin
   Path: libs/admin
   Status: OK Yuklab olingan

2. client
   Path: libs/client
   Status: OK Yuklab olingan

Qaysi submodule'larni yashirmoqchisiz?
Misol: 1 yoki 2 yoki 1,2
Raqamlarni kiriting: 1
```

**Nima uchun kerak?**
- **Memory va Disk Space**: Foydalanmayotgan kutubxonalarni yashirish orqali diskda joy tejash
- **Development Speed**: Kamroq kod - tez build va linting
- **Modularity**: Faqat kerakli kutubxonalar bilan ishlash imkoniyati
- **Team Work**: Har bir developer o'ziga kerakli kutubxonalar bilan ishlashi mumkin

### Nx buyruqlari
```bash
npx nx graph         # Loyiha dependencies grafigini ko'rish
npx nx build home    # Home app'ni build qilish
npx nx test admin    # Admin library testlarini ishga tushirish
npx nx e2e home-e2e  # E2E testlarni ishga tushirish
```

### Git va Deployment

#### Monorepo (home app) ga o'zgarish push qilish:
```bash
# O'zgarishlarni staging area ga qo'shish
git add .

# Commit yaratish
git commit -m "Your changes description"

# Dev branch ga push qilish
git push origin dev

# Agar main branch ga merge qilmoqchi bo'lsangiz:
git checkout main
git merge dev
git push origin main
```

#### Admin kutubxonasiga o'zgarish push qilish:
```bash
# Admin submodule ga o'ting
cd libs/admin

# O'zgarishlarni ko'ring
git status
git diff

# O'zgarishlarni commit qiling
git add .
git commit -m "Admin library changes"

# Admin repository ga push qiling
git push origin master

# Monorepo ga qaytib, submodule reference'ni yangilang
cd ../..
git add libs/admin
git commit -m "Update admin submodule to latest version"
git push origin dev
```

#### Yangi feature branch yaratish:
```bash
# Monorepo uchun
git checkout -b feature/new-feature
# o'zgarishlar qiling
git push origin feature/new-feature

# Admin kutubxonasi uchun
cd libs/admin
git checkout -b feature/admin-enhancement
# o'zgarishlar qiling
git push origin feature/admin-enhancement
cd ../..
```

## 🎯 Loyihaning asosiy xususiyatlari

1. **Monorepo arxitektura** - Nx yordamida bir nechta bog'liq loyihalarni boshqarish
2. **Modern Vue 3** - Composition API va script setup sintaksisi
3. **Quasar UI** - Material Design komponentlari
4. **State Management** - Pinia bilan reactive state
5. **Type Safety** - TypeScript bilan to'liq tipizatsiya
6. **Testing Suite** - Unit va E2E testlar
7. **Code Quality** - ESLint va Prettier integratsiya
8. **Hot Reload** - Vite bilan tez development
9. **Git Submodules** - Admin kutubxonasini mustaqil boshqarish
10. **CI/CD Integration** - GitHub Actions bilan avtomatik test va build
11. **Dynamic Loading** - Kutubxonalar hide qilinganda error bermaydi
12. **Conditional Navigation** - Tab'lar faqat mavjud kutubxonalarga ko'rsatiladi

### Dynamic Navigation System

Loyihada **conditional navigation** tizimi mavjud:

- **Home tab** - har doim ko'rinadi
- **Admin tab** - faqat `libs/admin` mavjud bo'lganda ko'rinadi
- **Client tab** - faqat `libs/client` mavjud bo'lganda ko'rinadi

Bu system quyidagicha ishlaydi:

1. **Kutubxona mavjud** → Tab ko'rinadi, route ishlaydi
2. **Kutubxona hide qilingan** → Tab ko'rinmaydi, route fallback'ga yo'naltiriladi
3. **Kutubxona show qilingan** → Tab avtomatik paydo bo'ladi

**Misol:**
```bash
# Admin lib ni hide qiling
npm run libs:hide
# Admin tab yo'qoladi, faqat Home va Client ko'rinadi

# Admin lib ni show qiling  
npm run libs:show
# Admin tab qaytadan paydo bo'ladi
```

Bu feature'ning afzalliklari:
- **Clean UI** - Foydalanuvchi faqat mavjud bo'limlarni ko'radi
- **Error Prevention** - Mavjud bo'lmagan kutubxonalarga kirish xatolarini oldini oladi
- **Development Flexibility** - Developer faqat kerakli qismlar bilan ishlashi mumkin

## ⚠️ Muhim eslatmalar

### Submodule bilan ishlashda:
- Doimo submodule'ni yangilab turing: `git submodule update --remote`
- Admin kutubxonasida o'zgarish qilgandan keyin monorepo'da reference'ni yangilang
- Clone qilganda `--recursive` flag'ini ishlatishni unutmang

### Development jarayonida:
- `npm run dev` ishlatishdan oldin submodule'lar yuklanganligini tekshiring
- TypeScript error'lari chiqsa, `libs/admin` papkasi mavjudligini tekshiring
- CI/CD pipeline'da submodule'lar avtomatik yuklanadi

### Git workflow:
- **dev branch** - rivojlantirish uchun
- **main branch** - production-ready kod uchun
- **feature branches** - yangi funksiyalar uchun

## 🔧 Konfiguratsiya fayllari

- `nx.json` - Nx workspace konfiguratsiyasi
- `vite.config.ts` - Vite bundler sozlamalari
- `tsconfig.json` - TypeScript konfiguratsiyasi
- `eslint.config.mjs` - ESLint qoidalari
- `vitest.workspace.ts` - Test konfiguratsiyasi

Bu loyiha zamonaviy web development best practice'lari asosida tuzilgan va kengaytirishga tayyor arxitekturaga ega.
