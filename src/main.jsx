import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/inter';
import '@fontsource-variable/playpen-sans';
import '@fontsource/acme';

export const theme = extendTheme({
	components: {
		IconButton: {
			baseStyle: {
				bgColor: 'transparent',
			},
		},
		Button: {
			baseStyle: {
				bgColor: 'transparent',
			},
		},
		MenuItem: {
			baseStyle: {
				_hover: { bgColor: 'blackAlpha.200' }
			}
		}
	},
	fonts: {
		inter: `'Inter', sans-serif`,
		acme: `'Acme', sans-serif`,
		playpen: `'Playpen Sans Variable', cursive`,
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(

		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
,
);
