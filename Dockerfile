FROM node:12
WORKDIR /usr/src/app

RUN apt update
RUN apt install -y fonts-noto-cjk
RUN apt-get install -y libnss3

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]