import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://dev.relatemediadesign.com:4000/graphql',
  credentials: 'include',
});
