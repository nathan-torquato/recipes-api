# Recipes API

> [challenge](https://github.com/delivery-much/challenge)

> a working docker image for this challenge can vbe found [here](https://hub.docker.com/repository/docker/nathantorquato/recipe-api)

## General Instructions

- Generate an API_KEY for the Giphy API [here](https://developers.giphy.com/docs/sdk) (click the "Create an App" button)
- Create a .env at the project's root directory
- Set the same variables as we have in the `.env.test` file
- Use the generated API_KEY for setting the value for GIF_API_KEY

### Running with Docker

- Start docker on your machine
- From your terminal, run `docker-compose up`
- Access the link logged on your terminal

### Running locally

- From your terminal, run:
  - `npm install`
  - `npm start`

### Running tests

- From your terminal, run:
  - `npm install`
  - `npm test`
