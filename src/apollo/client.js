import ApolloClient from 'apollo-boost';
import config from '../config';

const { NODE_ENV, REACT_APP_CAS_HOST } = process.env;

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
				if (NODE_ENV === 'production') {
					if (window.location.pathname !== '/') {
						window.location.replace(`https://${REACT_APP_CAS_HOST}/cas/logout`);
					}
				} else {
					window.location.pathname !== '/' && window.location.replace('/');
				}
			}
		}

		if (networkError) {
			console.log('ApolloClient networkError');
			console.log(networkError);
		}
	},
});
