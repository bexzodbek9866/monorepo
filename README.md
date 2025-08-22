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
│   ├── admin/              # Admin library komponetlari
│   │   ├── src/
│   │   │   ├── layouts/    # AdminLayout komponenti
│   │   │   ├── pages/      # Admin sahifalari
│   │   │   └── stores/     # Admin store'lar
│   └── client/             # Client library komponetlari
├── packages/
│   └── home/               # Home package konfiguratsiyasi
├── nx.json                 # Nx workspace konfiguratsiyasi
├── package.json            # Root dependencies
└── tsconfig.base.json      # TypeScript base konfiguratsiya
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
- About view  
- Pinia Demo
- Quasar Demo
- Reactivity Test

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

### Nx buyruqlari
```bash
npx nx graph         # Loyiha dependencies grafigini ko'rish
npx nx build home    # Home app'ni build qilish
npx nx test admin    # Admin library testlarini ishga tushirish
npx nx e2e home-e2e  # E2E testlarni ishga tushirish
```

## 🎯 Loyihaning asosiy xususiyatlari

1. **Monorepo arxitektura** - Nx yordamida bir nechta bog'liq loyihalarni boshqarish
2. **Modern Vue 3** - Composition API va script setup sintaksisi
3. **Quasar UI** - Material Design komponentlari
4. **State Management** - Pinia bilan reactive state
5. **Type Safety** - TypeScript bilan to'liq tipizatsiya
6. **Testing Suite** - Unit va E2E testlar
7. **Code Quality** - ESLint va Prettier integratsiyasi
8. **Hot Reload** - Vite bilan tez development

## 🔧 Konfiguratsiya fayllari

- `nx.json` - Nx workspace konfiguratsiyasi
- `vite.config.ts` - Vite bundler sozlamalari
- `tsconfig.json` - TypeScript konfiguratsiyasi
- `eslint.config.mjs` - ESLint qoidalari
- `vitest.workspace.ts` - Test konfiguratsiyasi

Bu loyiha zamonaviy web development best practice'lari asosida tuzilgan va kengaytirishga tayyor arxitekturaga ega.
