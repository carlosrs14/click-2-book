FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

# RUN npm run build --configuration production

# FROM nginx:alpine

# COPY --from=build /app/dist/click2book-frontend /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["npm", "start"]