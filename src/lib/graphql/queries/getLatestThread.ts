import gql from 'graphql-tag';

const GET_THREAD = gql`
query GetLatestThread {
  getLatestThread {
    slug
    messages {
      role
      content
      id
    }
  }
}`

export default GET_THREAD;