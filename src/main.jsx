import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/inter';
import '@fontsource-variable/playpen-sans';

export const theme = extendTheme({
	styles: {
		global: {

			'html, body': {
				overscrollBehaviorY: 'none',
			},
	
			'&::-webkit-scrollbar': {
				height: '8px',
				width: '8px',
				backgroundColor: 'transparent',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: 'brand.400',
				borderRadius: '8px',
			},
			'&::-webkit-scrollbar-track': {
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			},
		},
	},
	initialColorMode: 'system',
	useSystemColorMode: true,
	colors: {
		brand: {
			50: '#f3e8ff',
			100: '#e4ccff',
			200: '#d0a9ff',
			300: '#b77eff',
			400: '#9955ff',
			500: '#7a2cff',
			600: '#552f7e',
			700: '#41235a',
			800: '#2d1840',
			900: '#1a0e26',
		},
	},
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
				_hover: { bgColor: 'blackAlpha.200' },
			},
		},
		Tooltip: {
			baseStyle: {
				borderRadius: '4px',
				shadow: '0 5px 20px rgba(0,0,0,0.25)',
			},
		},
	},
	fonts: {
		inter: `'Inter Variable', sans-serif`,
		playpen: `'Playpen Sans Variable', cursive`,
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</ChakraProvider>,
);
