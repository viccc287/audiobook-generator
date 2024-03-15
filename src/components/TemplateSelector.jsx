import { PhotoIcon } from '@heroicons/react/16/solid';
import { useSetAtom } from 'jotai';
import { currentPageTemplateAtom } from '../lib/atoms';
import { Center, Divider, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
function TemplateSelector() {
	const setTemplate = useSetAtom(currentPageTemplateAtom);

	const width = 170;
	const height = 150;

	function TemplateItem({ width, height, name, oc, children }) {
		//Children must be GridItems. 5 rows and 2 cols
		return (
			<Flex
				w={width}
				minH={height}
				bgColor='blackAlpha.500'
				rounded='16px'
				p={3}
				direction='column'
				gap={2}
				transition='all 500ms'
				_hover={{
					outline: '1px solid',
					outlineColor: 'green.500',
					transform: 'scale(1.1)',
					transition: 'all 100ms',
				}}
				onClick={oc}
			>
				<Grid
					fontSize='0.75rem'
					bgColor='white'
					flexGrow='1'
					flexShrink='0'
					flexBasis={height * 0.6}
					p={2}
					rounded='8px'
					templateRows='repeat(5, 1fr)'
					templateColumns='repeat(2, 1fr)'
				>
					{children}
				</Grid>
				<Text
					color='white'
					textAlign='center'
					fontFamily='inter'
					fontWeight='semibold'
					fontSize={height * 0.09}
				>
					{name}
				</Text>
			</Flex>
		);
	}

	return (
		<Grid w='33.3%' h='100%' gap={5} gridTemplateColumns={`repeat(auto-fill, ${width}px)`} justifyContent='space-evenly'>
			<TemplateItem
				oc={() => setTemplate('titleSubtitle')}
				width={width}
				height={height}
				name='Título y subtítulo'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
				>
					Titulo
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
				>
					Subtítulo
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('textImage')}
				width={width}
				height={height}
				name='Texto e imagen'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
				>
					Texto
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('text2Images')}
				width={width}
				height={height}
				name='Texto y 2 imágenes'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={2}
				>
					Texto
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={2}
					rowSpan={3}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('imageOnly')}
				width={width}
				height={height}
				name='Solo imagen'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('twoImages')}
				width={width}
				height={height}
				name='2 imágenes'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('textOnly')}
				width={width}
				height={height}
				name='Solo texto'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
				>
					Texto
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('leftTextRightImage')}
				width={width}
				height={height}
				name='Texto a la izquierda e imagen a la derecha'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
				>
					Texto
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('leftTextRightImage')}
				width={width}
				height={height}
				name='Texto a la derecha e imagen a la izquierda'
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
				>
					<Icon as={FaImage} boxSize={height * 0.25} color='gray' flexGrow='1' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
				>
					Texto
				</GridItem>
			</TemplateItem>
		</Grid>
	);
}

export default TemplateSelector;
