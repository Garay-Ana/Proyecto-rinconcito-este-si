# Dockerfile para backend Node.js con Express

FROM node:18-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
