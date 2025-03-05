
import { gql } from 'graphql-tag';
import prisma  from '../prisma';
import {
    GraphQLDateTime
  } from 'graphql-iso-date';

import { AddMessagesMutationVariables, CreateThreadMutationVariables, Message, Mutation, Query} from '../../../generated/graphql';

type MessageCreate =  {
    role : string
    content : string
}



const resolvers = {
    GraphQLDateTime : GraphQLDateTime,
    Query: {
        async getLatestThread() {
            const latestThread = await prisma.thread.findFirst({
                orderBy : {
                    createdAt : 'desc'
                },
                include : {
                    messages : true
                }
            })
            if(latestThread) {
            //remap the messages so that we don't expose their PK
            let messages = latestThread?.messages.map((message, idx) => (
                {
                    ...message,
                    id : idx + 1
                }
            ))
            latestThread.messages = messages;
            return latestThread;
            } else {
                return 
            }
        }
    },
    Mutation : {
        // todo - use grahqlcodegen to autogen these types 
        async createThread(parent :Mutation  ,args : CreateThreadMutationVariables) {
            let { threadSlug, messages } = args;
            const thread = await prisma.thread.create({
                data : {slug : threadSlug},
            })

            if(thread && messages) {
                await prisma.message.createMany({
                    data : (messages as Partial<MessageCreate>[]).map(({role,content}) => (
                        {
                            threadId : thread.id,
                            role,
                            content,
                        } as any
                    ))
                });
            }

            return thread;
        },
        async addMessages(parent : Mutation,args : AddMessagesMutationVariables) {
            let { threadSlug, messages  } = args;
            const thread = await prisma.thread.findFirst({
                where : {
                    slug : threadSlug
                }
            });

            if(thread && messages){
            let persistedMessages = await prisma.message.createMany({
                data : (messages as Partial<MessageCreate>[]).map(({role,content}) => (
                    {
                        threadId : thread.id,
                        role,
                        content,
                    } as any
                ))
            })

            return persistedMessages;
        } else {
            return {count : 0};
        }

        } 
    }
}


const typeDefs = gql`
scalar GraphQLDateTime

type Thread { 
    slug: String! 
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    messages: [Message]
}

type Message {
    id : Int!
    content:  String!
    role: String!
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
}
 
type CreationResult {
    count : Int
}

type Query {
    "Returns the latest thread"
    getLatestThread : Thread
}

input messageInput {
    content : String!
    role : String!
}

input addMessageInput {
    threadSlug : String!,
}


type Mutation {
    "Creates a new thread"
    createThread(threadSlug : String!, messages: [messageInput]) : Thread
    "Update Messages"
    addMessages(messages : [messageInput], threadSlug : String! ) : CreationResult
}`;



export {
    typeDefs,
    resolvers
}