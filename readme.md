# Recipes API

> [challenge](https://github.com/delivery-much/challenge)

> a working docker image for this challenge can vbe found [here](https://hub.docker.com/repository/docker/nathantorquato/recipes-api)

## Instructions

### Running with Docker

- Generate an API_KEY here for the Giphy API
- use it for setting the value for GIF_API_KEY in docker-compose.yml
- Start docker on your machine
- From your terminal, run `docker-compose up`

### Running locally

- Generate an API_KEY here for the Giphy API
- Create a .env file in the root of the project and set the same variables as we have in the `.env.test` file
- From your terminal, run:
  - `npm install`
  - `npm start`

### Running tests

- From your terminal, run:
  - `npm install`
  - `npm test`
