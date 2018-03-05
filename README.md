# Tech Task

Twitter API, react/redux/redux-sagas

## Run locally

requires to run redis (either a local instance or in docker: `docker run -d --name redis -h localhost -p "6379:6379" --expose 6379 redis:alpine`)

- `npm i` install dependencies
- `npm run build`: build app for production (then run `node server` to start it)
- `npm start` to start app in development mode, browse http://localhost:9000
- `npm test` test app (`npx jest --watch` to run it in watch mode)

## Todos

- browser shims: es-shims or polyfill.io (for Promise, fetch, matchMedia, ..)
