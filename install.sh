# install deps, you need node 8+ (LTS)
npm i 

# create DBs
echo 'CREATE DATABASE twitt;CREATE DATABASE twitt_test;' | psql -U postgres -f -

# patch knex cli until [knex#2331](https://github.com/tgriesser/knex/pull/2331) gets merged
cd node_modules/knex
curl https://cdn.rawgit.com/caub/a8c23f97aa1942f2012ad8639769168c/raw/b3e96e3f09b2895329315b3aab13ce79a50049bc/knex-bin.diff | patch -p1 -t
cd ../..

# set up schemas
npx knex --config pg://postgres@localhost/twitt migrate:latest
npx knex --config pg://postgres@localhost/twitt_test migrate:latest
