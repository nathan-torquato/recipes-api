# Recipes API

> [challenge](https://github.com/delivery-much/challenge)

> a working docker image for this challenge can vbe found [here](https://hub.docker.com/repository/docker/nathantorquato/recipe-api)

## Instructions

- Generate an API_KEY here for the Giphy API [here](https://developers.giphy.com/docs/sdk) (click the "Create an App" button)

### Running with Docker

- Use the generated API_KEY for setting the value for GIF_API_KEY in docker-compose.yml
- Start docker on your machine
- From your terminal, run `docker-compose up`
- Access http://localhost:7777/recipes?i=tomato,onion

### Running locally

- Create a .env file in the root of the project and set the same variables as we have in the `.env.test` file
- Use the generated API_KEY for setting the value for GIF_API_KEY
- From your terminal, run:
  - `npm install`
  - `npm start`

### Running tests

- From your terminal, run:
  - `npm install`
  - `npm test`
