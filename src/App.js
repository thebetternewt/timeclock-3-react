import React from 'react';
import { Location } from '@reach/router';

import GlobalStyle from './styled/Global';
import Layout from './components/Layout';
import Routes from './components/navigation/Routes';

const App = () => {
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
