import { Button, Flex, Grid, GridItem, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import CustomColorSelector from './components/CustomColorSelector';
import ExportButton from './components/ExportButton';
import PageNavigation from './components/PageNavigation';
import ResetButton from './components/ResetButton';
import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Grid
			h='100svh'
			w='100svw'
			bgColor='#552f7e'
			_dark={{ bgColor: 'brand.900' }}
			templateAreas={{
				base: `"templates"
					"buttons"
				   "visualizer"
				   "nav"`,
				md: `"templates visualizer"
				"buttons visualizer"
				 "nav nav"`,
			}}
			templateColumns={{ base: '1fr', md: '1fr 2fr' }}
			templateRows={{ base: 'auto auto 1fr auto', md: '1fr auto auto' }}
		>
			{
				<GridItem
					p={[1, 2, 4, 8]}
					as={Flex}
					gridArea='templates'
					direction='column'
					gap='20px'
					overflow='auto'
					sx={{ scrollbarGutter: 'stable' }}
				>
					<TemplateSelector />
				</GridItem>
			}

			<GridItem m={[1, 2, 4, 8]} gridArea='visualizer' pos='relative' overflow='hidden'>
				<CustomColorSelector />
				<Visualizer />
			</GridItem>

			<GridItem gridArea='buttons' overflow='auto'>
				<Flex align='center' justify='center' gap={[2, 2, 3, 4, 6]} direction='row' wrap='wrap' p={[1, 2, 2, 3, 6]}>
					<ExportButton />
					<ResetButton />
					<Tooltip label='Cambiar tema' openDelay={400} hasArrow>
						<Button size='sm' rightIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} onClick={toggleColorMode}>
							{colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
						</Button>
					</Tooltip>
				</Flex>
			</GridItem>

			<GridItem gridArea='nav' overflow='auto'>
				<PageNavigation />
			</GridItem>
		</Grid>
	);
}

export default App;
