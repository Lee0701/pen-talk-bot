FROM node:12
WORKDIR /home/runner/app

RUN apt update
RUN apt install -y fonts-noto-cjk
RUN apt install -y wget gnupg ca-certificates \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json ./
RUN npm install

COPY . .

RUN groupadd -r runner && useradd -r -g runner -G audio,video runner \
    && mkdir -p /home/runner/Downloads \
    && chown -R runner:runner /home/runner \
    && chown -R runner:runner /home/runner/app/node_modules

USER runner

CMD ["npm", "start"]
