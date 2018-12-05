FROM docker.ptit365.com/node-10-cnpm


ADD . /app

WORKDIR /app

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install

EXPOSE 3000

CMD node service.js
