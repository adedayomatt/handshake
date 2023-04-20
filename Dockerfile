FROM node:12.4.0

# createClient the log directory
RUN mkdir -p /var/log/application/bnpl_service

# Create app directory
WORKDIR /usr/src/app

RUN npm set registry http://npm.konga.com:4873

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install pm2@3.5.0 -g

# Bundle app source
COPY . /usr/src/app

# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/application/bnpl_service"]

COPY ./bin/start.sh /usr/local/bin/start.sh

RUN chmod +x ./bin/start.sh /usr/src/app/bin/start.sh

EXPOSE 80

CMD [ "/usr/src/app/bin/start.sh"]