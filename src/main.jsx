import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import PageNavigation from './components/PageNavigation.jsx';

import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/inter';

export const theme = extendTheme({
/* 	components: {
		Button: {
			baseStyle: {
				fontSize: 'inherit',
			},
		},
	}, */
	fonts: {
		inter: `'Inter', sans-serif`,
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</StrictMode>,
);
