# Tech Task

Twitter API, react/redux/redux-sagas

## plan

It'll take 4H-15H, because not sufficient knowledge on redux-sagas and twitter API yet

## install

- requires to run a local postgresql instance (9.6+)
- `npm i`: install deps, you need node 8+ (LTS)
- create local dbs: `echo 'CREATE DATABASE twitt;CREATE DATABASE twitt_test;' | psql -U postgres -f -`
- run `cd node_modules/knex && curl https://cdn.rawgit.com/caub/a8c23f97aa1942f2012ad8639769168c/raw/b3e96e3f09b2895329315b3aab13ce79a50049bc/knex-bin.diff | patch -p1 -t` until [knex#2331](https://github.com/tgriesser/knex/pull/2331) gets merged
- run `npx knex --config pg://postgres@localhost/twitt migrate:latest` to set up db schema
- run `npx knex --config pg://postgres@localhost/twitt_test migrate:latest` to set up test db schema
- `npm run build`: build app for production (then run `node server` to start it)
- `npm start` to start app in development mode, browse http://localhost:9000
- `npm test` test app (`npx jest --watch` to run it in watch mode)
