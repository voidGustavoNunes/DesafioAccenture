# Etapa de build
FROM node:20-alpine as build
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Compilar a aplicação
RUN npm run build

# Etapa de execução
FROM nginx:alpine
COPY --from=build /app/dist/projeto-accenture /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
