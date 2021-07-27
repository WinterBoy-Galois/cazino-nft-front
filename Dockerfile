FROM nginx:1.18

WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

COPY ava ./ava

COPY build/ ./

COPY underm.html ./

EXPOSE 80

# CMD ["npm", "start"]

# CMD ["tail", "-f", "/dev/null"]
