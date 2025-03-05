import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../../../lib/graphql/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from "next/server";


const server = new ApolloServer({ resolvers,typeDefs });

const handler =  startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});


export { handler as GET, handler as POST };