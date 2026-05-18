# Especifica versão de sistema operacional base
FROM node:22-alpine

# Difine a pasta onde o codigo vai ser executado
WORKDIR  /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Informar a porta que o container vai usar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
