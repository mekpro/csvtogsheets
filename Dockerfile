FROM node:14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

ENTRYPOINT ["node" , "csvtogsheets.js"]