import ApolloClient from 'apollo-boost';
import config from '../config';

export const client = new ApolloClient({
	uri: config.graphqlEndpoint,
	// uri: 'http://localhost:4000/graphql',
	credentials: 'include',
	onError: ({ graphQLErrors = false, networkError, response }) => {
		if (graphQLErrors) {
			console.log('ApolloClient graphQLErrors');
			console.log(graphQLErrors);

			const notAuthenticated = graphQLErrors.find(err => {
				return err.message === 'Not authenticated!';
			});

			if (notAuthenticated) {
				console.log('NOT AUTHENTICATED!');
				window.location.pathname !== '/login' &&
					window.location.replace('/login');
			}
		}

		if (networkError) {
			console.log('ApolloClient networkError');
			console.log(networkError);
		}
	},
});
