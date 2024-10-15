import { Flex, Grid, GridItem, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import ExportButton from './components/ExportButton';
import PageNavigation from './components/PageNavigation';
import ResetButton from './components/ResetButton';
import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import CustomColorSelector from './components/CustomColorSelector';

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
				   "visualizer"
				   "nav"`,
			md: `"templates visualizer"
				 "nav nav"`
			}}
		
		  templateColumns={{ base: '1fr', md: '1fr 2fr' }}
		  templateRows={{ base: 'auto 1fr auto', md: '1fr auto' }}
		>
		{  <GridItem p={[1, 2, 4, 8]} as={Flex} gridArea='templates' direction='column' gap='20px' overflow='auto'>
			<TemplateSelector />
			<Flex align='center' gap={[2, 2, 3, 4, 10]} direction='row' wrap='wrap' p={[1, 2, 2, 3, 4]}>
			  <ExportButton />
			  <ResetButton />
			  <Tooltip label='Cambiar tema' openDelay={400} hasArrow>
				<IconButton  icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} onClick={toggleColorMode}>
				  {colorMode === 'light' ? 'Oscuro' : 'Claro'}
				</IconButton>
			  </Tooltip>
			</Flex>
		  </GridItem>}
	  
		  <GridItem m={[1, 2, 4, 8]} gridArea='visualizer' pos='relative' overflow='hidden'>
			<CustomColorSelector />
			<Visualizer />
		  </GridItem>
	  
		  <GridItem gridArea='nav' overflow='auto'>
			<PageNavigation />
		  </GridItem>
		</Grid>
	  );
}

export default App;
