# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencias necesarias para algunas libs
RUN apk add --no-cache libc6-compat

# Activar pnpm
RUN corepack enable

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar deps
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build Nuxt (genera .output)
RUN pnpm build


# ---------- RUN STAGE ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

RUN corepack enable

# Solo copiar output final (imagen más ligera)
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
