import { useSetAtom } from 'jotai';
import { currentPageTemplateAtom } from '../lib/atoms';
import { Flex, Grid, GridItem, Icon, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
function TemplateSelector() {
	const [isLargerThanMobile] = useMediaQuery('(min-width: 445px)');
	const setTemplate = useSetAtom(currentPageTemplateAtom);

	function TemplateItem({ name, oc, children }) {
		if (!isLargerThanMobile) {
			return (
				<Tooltip label={`Usar la plantilla ${name}`} aria-label={name} openDelay={1250} placement='auto' hasArrow>
					<Flex
						w={{ base: '110px', md: '120px', lg: '150px', xl: '170px' }}
						h={{ base: 'fit-content', md: 'fit-content', xl: '150px' }}
						bgColor='blackAlpha.500'
						rounded='16px'
						p={2}
						direction='column'
						gap={1}
						transition='all 500ms'
						_hover={{
							cursor: 'pointer',
							outline: '1px solid',
							outlineColor: 'green.500',
							transition: 'all 100ms',
						}}
						onClick={oc}
					>
						<Text color='white' _dark={{ color: '#dedede' }} textAlign='center' fontFamily='inter' fontSize='0.6rem'>
							{name}
						</Text>
					</Flex>
				</Tooltip>
			);
		} else
			return (
				<Tooltip label={`Usar la plantilla ${name}`} aria-label={name} openDelay={1250} placement='auto' hasArrow>
					<Flex
						w={{ base: '110px', md: '120px', lg: '150px', xl: '170px' }}
						h={{ base: 'fit-content', md: 'fit-content', xl: '150px' }}
						bgColor='blackAlpha.500'
						rounded='16px'
						p={3}
						direction='column'
						gap={1}
						transition='all 500ms'
						_hover={{
							cursor: 'pointer',
							outline: '1px solid',
							outlineColor: 'green.500',
							transition: 'all 100ms',
						}}
						onClick={oc}
					>
						<Grid
							bgColor='white'
							_dark={{ bgColor: 'whiteAlpha.100', color: '#444444' }}
							flexGrow='1'
							flexShrink='0'
							p={2}
							rounded='8px'
							templateRows='repeat(5, 1fr)'
							templateColumns='repeat(2, 1fr)'
						>
							{children}
						</Grid>
						<Text
							display={{ base: 'none', md: 'block' }}
							color='white'
							_dark={{ color: '#dedede' }}
							textAlign='center'
							fontFamily='inter'
							fontWeight='semibold'
							fontSize='0.75rem'
						>
							{name}
						</Text>
					</Flex>
				</Tooltip>
			);
	}

	function ResponsiveText({ text }) {
		return (
			<Text
				_dark={{ color: 'whiteAlpha.700' }}
				fontFamily='inter'
				fontWeight='semibold'
				fontSize={{ base: '0.5em', md: '0.7rem', xl: '0.8rem' }}
			>
				{text}
			</Text>
		);
	}

	return (
		<Flex
			w='100%'
			h='fit-content'
			wrap='wrap'
			justify='space-evenly'
			gap={{ base: '0.2rem', md: '0.5rem', xl: '1rem' }}
		>
			<TemplateItem oc={() => setTemplate('cover')} name='Portada'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Título del libro' />
				</GridItem>
				<GridItem
					as={Flex}
					direction='column'
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					minW='min-content'
				>
					<ResponsiveText text='Descripción' />
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
			</TemplateItem>
			<TemplateItem oc={() => setTemplate('titleSubtitle')} name='Título y subtítulo'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Título' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					minW='min-content'
				>
					<ResponsiveText text='Subtítulo' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('textImage')} name='Texto e imagen'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					p={1}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('text2Images')} name='Texto y 2 imágenes'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					wrap='wrap'
					gap={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />

					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('titleImageText')} name='Título, imagen y texto'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Título' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					wrap='wrap'
					gap={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
					<ResponsiveText text='Texto' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('titleTextImage')} name='Título, texto e imagen'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Título' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					wrap='wrap'
					gap={5}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('imageText')} name='Imagen y título'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
					p={1}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('imageOnly')} name='Solo imagen'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
					wrap='wrap'
					gap={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
					</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('twoImages')} name='Dos imágenes'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
					p={2}
					wrap='wrap'
					gap={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />

					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('textOnly')} name='Solo texto'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
					gap={5}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('leftTextRightImage')} name='Texto izquierda e imagen derecha'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
					gap={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
					</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('leftImageRightText')} name='Texto izquierda e imagen derecha'>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
					minW='min-content'
				>
					<Icon as={FaImage} boxSize={{ base: 3, md: 5, xl: 6 }} color='gray' />
					</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
					p={1}
					minW='min-content'
				>
					<ResponsiveText text='Texto' />
				</GridItem>
			</TemplateItem>
		</Flex>
	);
}

export default TemplateSelector;
