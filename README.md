# T-100 ChatBot

## Getting Started
This app runs on the following technologies
- Next JS (main app)
- GraphQL (middleware)
- Prisma / Postgres (DB)

## What to expect
- You can chat with a friendly T-1000
- Your chat threads are persisted in the DB 
- Start a new chat by clicking the "new thead" button

## Installation
For the best experience execute the following steps (A docker compose file is present to help with future runs).

1. Set up your env - all services use a single `.env.local`. You can copy the .env.example file to figure out what vars you need to supply. The database env variables will also be used in the creation of your DB. 

**IMPORTANT:**
 For docker networking to work locally you must list the postgres hostname as `database` instead of localhost.
 So your environment variable `POSTGRES_PRISMA_URL` should look something like this

```
POSTGRES_PRISMA_URL="postgresql://<system>:<secret>@database:5432/<db>?schema=public"
```

`<system>` should be the same value as `POSTGRES_USER`
`<secret>` should be the same value as `POSTGRES_PASSWORD`
`<db>` should be the same value as `POSTGRES_DB`

**A pre-existing database is not required**

2. From the repo root - turn on the Core services (db and frontend) using the 'core' profile
```
docker compose -f compose.yml --profile "core" up
```

3. Once your database is up (and you see postgres logs) you can run the migrations using the 'migrate'
```
docker compose -f compose.yml --profile "migrate" up
```
**IMPORTANT NOTE - The db container must be running when you run the `migrate` container**

4. Navigate to localhost:3000 to access the application - have fun!

## To Do
- Error Handling (there is a sincere lack of error handling in this application right now)
- GraphQL hook generation (to ensure typesafety & for convenience)
- Test
- Hook up redis for graphql subsriptions to allow streaming over graphQL


## Refrences
Here are some links to content that I referenced & will help with further development
- https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
- https://www.npmjs.com/package/ai
- https://www.apollographql.com/docs/react/data/subscriptions/
