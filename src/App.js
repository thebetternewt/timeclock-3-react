import React from 'react';
import { Location } from '@reach/router';
import { useCookies } from 'react-cookie';

import GlobalStyle from './styled/Global';
import Layout from './components/Layout';
import Routes from './components/navigation/Routes';

const App = () => {
	const [cookies] = useCookies();

	// setCookie('_ga', 'GA1.3.495313017.1560367323');
	// setCookie('IDMSESSID', '35B6CA513ACF1387E0532A021282F517');

	console.log('app cookies', cookies);

	return (
		<Location>
			{({ location }) => {
				console.log('location', location);
				return (
					<>
						<GlobalStyle />
						<Layout>
							<Routes />
						</Layout>
					</>
				);
			}}
		</Location>
	);
};

export default App;
