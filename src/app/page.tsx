"use client";

import { ApolloProvider } from '@apollo/client';
import ChatBox  from '../components/chat/chatBox';
import client from '../lib/graphql/client';


export default function Home() {

  return (
    <ApolloProvider client={client}>
      <ChatBox/>
    </ApolloProvider>
  )

}
