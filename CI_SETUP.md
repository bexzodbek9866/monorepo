# CI uchun npm o'rnatish optimizatsiyasi

## Tezkor npm ci
npm ci --legacy-peer-deps --no-audit --no-fund --prefer-offline

## Yoki environment variables bilan
export NPM_CONFIG_LEGACY_PEER_DEPS=true
export NPM_CONFIG_AUDIT=false  
export NPM_CONFIG_FUND=false
export NPM_CONFIG_PROGRESS=false
npm ci

## Docker uchun
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund --prefer-offline
COPY . .
RUN npm run build
