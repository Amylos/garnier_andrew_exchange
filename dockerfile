FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

# CMD ["npm", "run", "test"]




# docker build latest -t garnier_andrew_exchange .
# docker run -p 3000:3000 garnier_andrew_exchange


# Pousser sur docker HUB
# Create repo
# docker ui create repository garnier_andrew_exchange
# docker login
# docker token
# github token add secret repo DOCKER_HUB_TOKEN  new repository secret
