# About

TypeScript proof of concept implementing Domain Driven Design[^1] and SOLID principles.
  > *Collaboration network for creatives*.

# Stack

## Frontend ![Next](https://img.shields.io/badge/Next-333333?logo=next.js)
- [zustand](https://github.com/pmndrs/zustand) - State management
- [React Query](https://tanstack.com/query/v3/) - Data fetching/updating hooks
- [Tailwind](https://tailwindcss.com/) - Utility-first CSS framework
- [react-toastify](https://www.npmjs.com/package/react-toastify) - Notifications

## Backend ![Nest](https://img.shields.io/badge/Nest-333333?logo=nestjs) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-333333?logo=postgresql)
- [Prisma](https://www.prisma.io/) - Modern ORM for SQL databases
- [joi](https://joi.dev/) - Schema description
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [uuid](https://www.npmjs.com/package/uuid) - Unique identifier generation
- [Passport](https://www.passportjs.org/) - Authentication and authorization
- [Redis](https://redis.io/) - Caching and session management with [express-session](https://www.npmjs.com/package/express-session)

## Testing
- [Jest](https://jestjs.io/) - Unit and integration testing
- [Cypress](https://www.cypress.io/) - Frontend end-to-end testing

## Development
- [ESLint](https://eslint.org/) - Formatting
- [Storybook](https://storybook.js.org/) - Design components in isolation and documentation
- [Swagger](https://swagger.io/) - API documentation through [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- [Docker](https://www.docker.com/) - Containers
- [NGINX](https://www.nginx.com/) - Server, reverse-proxy for frontend deploy

# How to run

## Local
  ### Backend
  - `npm i` to install dependencies
  - Start local database server
  - Start `redis` server
  - Configure environment variables in `.env` according to example
  - `npm run migration:dev` to run migrations on database and generate the Prisma Client
  - `npm run start:debug` to launch backend server in debug mode

  ### Frontend
  - `npm i` to install dependencies
  - Start backend for requisitions
  - Configure environment variables in `.env` according to example
  - `npm run dev` to start frontend server

## Container
- Configure environment variables in `.env` according to example
- `docker-compose up -d` from project root to build images and the container network

# To-do
- [X] ~~Bugfix NGINX container~~
- [X] ~~AWS Deploy~~
- [X] ~~Migrate frontend to Next.js~~
- [X] ~~Registration page functionalities and design~~
- [X] ~~Login page functionalities and design~~
- [X] ~~Fix frontend Docker container~~
- [ ] Update documentation for backend and frontend
- [ ] Implement backend post flow
- [ ] Implement frontend post flow
- [ ] Add frontend test suite
- [ ] Add backend test suite
- [ ] Configure CI/CD


[^1]: Adapted from [this](https://github.com/Sairyss/domain-driven-hexagon) repository.
