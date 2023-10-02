# About

TypeScript proof of concept implementing Domain Driven Design[^1] and SOLID principles.
  > *Collaboration network for creatives*.

# Stack

## Frontend ![Next](https://img.shields.io/badge/Next-333333?logo=next.js)
- [zustand](https://github.com/pmndrs/zustand) - State management
- [React Query](https://tanstack.com/query/v3/) - Data fetching/updating hooks
- [Tailwind](https://tailwindcss.com/) - Utility-first CSS framework
- [react-toastify](https://www.npmjs.com/package/react-toastify) - Notifications
- [Zod](https://zod.dev/) - Schema description
- [Firebase](https://firebase.google.com/docs/auth/web/start) - Authentication and authorization

## Backend ![Nest](https://img.shields.io/badge/Nest-333333?logo=nestjs) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-333333?logo=postgresql)
- [Prisma](https://www.prisma.io/) - Modern ORM for SQL databases
- [joi](https://joi.dev/) - Schema description
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [uuid](https://www.npmjs.com/package/uuid) - Unique identifier generation
- [Firebase Admin](https://firebase.google.com/docs/admin/setup) - Authentication and authorization

## Testing
- [Jest](https://jestjs.io/) - Unit and integration testing
- [Cypress](https://www.cypress.io/) - Frontend end-to-end testing

## Development
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io) - Formatting
- [Storybook](https://storybook.js.org/) - Design components in isolation and documentation
- [Swagger](https://swagger.io/) - API documentation through [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- [Docker](https://www.docker.com/) - Containers
- [NGINX](https://www.nginx.com/) - Reverse-proxy

# How to run

## Local
  ### Backend
  - `npm i` to install dependencies
  - Start local database server
  - Configure environment variables in `.env` according to example
  - Configure [Google Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc)
  - `npm run migration:dev` to run migrations on database and generate the Prisma Client
  - `npm run start:debug` to launch backend server in debug mode

  ### Frontend
  - `npm i` to install dependencies
  - Start backend for requisitions
  - Configure environment variables in `.env` according to example
  - `npm run dev` to start frontend server

## Container
- Configure environment variables in root and client `.env` files according to example
- Change image names in docker-compose.yaml accordingly
- `docker-compose up -d` from project root to build images and the container network

# To-do
- [X] ~~Bugfix NGINX container~~
- [X] ~~AWS Deploy~~
- [X] ~~Migrate deploy to Google Cloud~~
- [X] ~~Migrate frontend to Next.js~~
- [X] ~~Registration page functionalities and design~~
- [X] ~~Login page functionalities and design~~
- [X] ~~Fix frontend Docker container~~
- [ ] Update documentation for backend and frontend
- [X] ~~Implement backend post flow~~
- [X] ~~Implement frontend post flow~~
- [ ] Add frontend test suite
- [ ] Add backend test suite
- [X] ~~Configure CD~~
- [ ] Configure CI


[^1]: Adapted from [this](https://github.com/Sairyss/domain-driven-hexagon) repository.
