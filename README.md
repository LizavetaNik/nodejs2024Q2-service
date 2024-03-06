# Home Library Service

# For run need:

- clone this repository wiht branch `b develop_part1`
  `git clone git@github.com:LizavetaNik/nodejs2024Q2-service.git -b develop_part1`
- open app `cd nodejs2024Q2-service`
- run `npm install` to install
- if you want, you can create a file `.env` and write your port, for example `PORT=4002`,
  but the default port is used `PORT=4000`
- npm start

# For test:

`npm run test test/favorites.e2e.spec.ts test/users.e2e.spec.ts test/artists.e2e.spec.ts test/albums.e2e.spec.ts test/tracks.e2e.spec.ts`

# For doc:

`http://localhost:{'your port'}/doc/`

### Auto-fix and format

- npm run lint
- npm run format
