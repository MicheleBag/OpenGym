# Stage 1
FROM node:16 as build-stage
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build


# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /client/build /usr/share/nginx/html 
COPY /nginx.conf /etc/nginx/nginx.conf
COPY /nginx-server.conf /etc/nginx/conf.d
EXPOSE $REACT_DOCKER_PORT
CMD nginx -g 'daemon off;' 
# daemon off set ngix to execute in foreground
