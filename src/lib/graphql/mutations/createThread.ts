import gql from 'graphql-tag';

const CREATE_THREAD = gql`mutation CreateThread($threadSlug: String!, $messages: [messageInput]) {
    createThread(threadSlug: $threadSlug, messages: $messages) {  
      slug 
    }
  }`

export default CREATE_THREAD;

