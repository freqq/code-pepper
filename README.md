# Code&Pepper assingment

## Assingment description:

- Node.js framework - NestJS + Typescript
- Used Rest API communication interface
- Added simple episode resolver as an example of GraphQL interface implementation - code first approach
- Apollo playground on http://localhost:3000/graphql
- Used TDD and integrations tests for testing and development purposes
- Fully functional rest API documentation - Open API - available at http://localhost:3000/api-docs#/
- Database modeling - TypeORM (other possible alternatives are e.g. Prisma or Knex.js)
- Introduced simple rate limiting for Rest API endpoints
- Added simple API versioning
- Added simple cache interceptor for Rest API endpoints - Redis usage
- Simple usage of CQRS + DDD - a bit of over kill for such small showcase but it's just to set an example for possible future development
- DTO/Entity auto mapping
- JSON Postman collection ready to import and test API endpoints
- Ready to use cloud solution - AWS API Gateway + Lambda deployment + RDS Postgres database - unfortunately i don't have free tier account anymore so i didn't deploy these templates

## Things to improve

- Extract repository interfaces to make them database technology agnostic
- Use full blown CQRS + DDD instead of small prototype (events, aggregates etc)
- Add E2E tests
- Add character GraphQL resolver - should be quite simple to do, since all of the business logic is extracted into handlers
- Add ElastiCache to CloudFormation template
- Create external repo with infra code - consider using Terraform HCL or Typescript CDK

## Running unit tests

```
yarn test:cov
```

## How to run locally

```
docker-compose up
yarn && yarn start:dev
```

## How to run on cloud

```
cd .aws && aws cloudformation deploy --stack-name code-pepper-db --template-file rds.yaml
yarn && yarn build && serverless deploy # Create API Gateway (acting as a proxy) and Lambda functions
```
