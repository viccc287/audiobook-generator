import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import PageNavigation from './components/PageNavigation.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</StrictMode>,
);
