FROM node:16

# Cria o diretório app
WORKDIR /usr/src/app

# Instala as dependencias do app
COPY package*.json ./

RUN npm install

# Empacota app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]