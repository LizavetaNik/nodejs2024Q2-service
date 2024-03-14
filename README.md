# Home Library Service

# For run need:

- clone this repository wiht branch `b develop_part1`
  `git clone git@github.com:LizavetaNik/nodejs2024Q2-service.git -b develop_part2`
- open app `cd nodejs2024Q2-service`
- run `npm install` to install
- if you want, you can write your data in the file `.env`
- start the docker containers `npm run docker:build:up`
- start the test `npm run test`

### Auto-fix and format

- npm run lint
- npm run format

### Pull docker image from docker hub

- `docker push lizavetanikiforova/nodejs2024q2-service-app-home-lib`
- `docker run -d -p 5435:5435 --rm --name nodejs2024q2-service-app-home-lib lizavetanikiforova/nodejs2024q2-service-app-home-lib`

### Check user-defined bridge

- `docker network ls`
- `docker network inspect bridge`

### Scan image vulnerabilities

- `npm run docker:scan`
