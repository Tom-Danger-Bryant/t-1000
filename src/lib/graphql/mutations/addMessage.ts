import gql from 'graphql-tag';

const ADD_MESSAGE = gql`mutation AddMessages($threadSlug: String!, $messages: [messageInput]) {
  addMessages(threadSlug: $threadSlug, messages: $messages) {
    count
  }
}`

export default ADD_MESSAGE;

