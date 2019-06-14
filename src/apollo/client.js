import ApolloClient from 'apollo-boost';
import config from '../config';

export const client = new ApolloClient({
	uri: config.graphqlEndpoint,
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
				window.location.pathname !== '/' && window.location.replace('/');
			}
		}

		if (networkError) {
			console.log('ApolloClient networkError');
			console.log(networkError);
		}
	},
});
