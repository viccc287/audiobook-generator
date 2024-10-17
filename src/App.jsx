import { Button, Collapse, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { FaBars, FaChevronDown } from 'react-icons/fa6';
import CustomColorSelector from './components/CustomColorSelector';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import PageNavigation from './components/PageNavigation';
import PreviewButton from './components/PreviewButton';
import ResetButton from './components/ResetButton';
import SaveButton from './components/SaveButton';
import TemplateSelector from './components/TemplateSelector';
import { ToggleModeButton } from './components/ToggleModeButton';
import Visualizer from './components/Visualizer';

function App() {
	const [buttonsVisible, setButtonsVisible] = useState(true);
	return (
		<Grid
			h='100svh'
			w='100svw'
			bgColor='#552f7e'
			_dark={{ bgColor: 'brand.900' }}
			templateAreas={{
				base: `"templates"
				"visualizer"
					"buttons"
				   "nav"`,
				md: `"templates visualizer"
				"buttons visualizer"
				 "nav nav"`,
			}}
			templateColumns={{ base: '1fr', md: '1fr 2fr' }}
			templateRows={{ base: 'auto 1fr auto auto', md: '1fr auto auto' }}
		>
			{
				<GridItem
					m={[1, 2, 4, 6]}
					as={Flex}
					gridArea='templates'
					direction='column'
					gap='20px'
					overflow='auto'
					sx={{ scrollbarGutter: 'stable' }}
					alignItems='stretch'
				>

					<TemplateSelector />
				</GridItem>
			}

			<GridItem m={[1, 2, 4, 6]} gridArea='visualizer' pos='relative' overflow='hidden'>
				<Visualizer />
				<CustomColorSelector />
			</GridItem>
			<GridItem as={Flex} direction='column' gridArea='buttons' overflow='hidden' alignItems='stretch'>
				<Collapse in={buttonsVisible}>
					<SimpleGrid align='center' justify='center' columns={2} gap={[2, 2, 3, 4]} mx={[1, 2, 4, 6]}>
						<Flex direction='column' align='stretch' gap={2}>
							<SaveButton />
							
							<ImportButton />
							<ResetButton />
						</Flex>
						<Flex direction='column' align='stretch' gap={2}>
							<PreviewButton />
							<ExportButton />
				
							<ToggleModeButton />
						</Flex>
					</SimpleGrid>
				</Collapse>

				<Button
					onClick={() => setButtonsVisible(!buttonsVisible)}
					leftIcon={buttonsVisible ? <FaChevronDown /> : <FaBars />}
					aria-label={buttonsVisible ? 'Hide buttons' : 'Show buttons'}
					fontSize='sm'
					m={[1, 2, 4, 6]}
				>
					{buttonsVisible ? 'Ocultar opciones' : 'Opciones'}
				</Button>
			</GridItem>

			<GridItem gridArea='nav' overflow='auto'>
				<PageNavigation />
			</GridItem>
		</Grid>
	);
}

export default App;
