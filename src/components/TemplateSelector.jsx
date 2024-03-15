import { PhotoIcon } from '@heroicons/react/16/solid';
import { useSetAtom } from 'jotai';
import { currentPageTemplateAtom } from '../lib/atoms';
import { Center, Divider, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
function TemplateSelector() {
	const setTemplate = useSetAtom(currentPageTemplateAtom);

	const gap = '10px';

	function TemplateItem({ parentGap, name, oc, children }) {
		//Children must be GridItems. 5 rows and 2 cols
		return (
			<Flex
				grow='1'
				minW='100px'
				maxW={`calc(33% - ${parentGap})`}
				minH='150px'
				maxH='25%'
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
					fontSize='0.75rem'
				>
					{name}
				</Text>
			</Flex>
		);
	}

	return (
		<Flex w='100%' h='fit-content' wrap='wrap' gap={gap} justify='space-evenly'>
			<TemplateItem
				oc={() => setTemplate('titleSubtitle')}
				name='Título y subtítulo'
				parentGap={gap}
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

			<TemplateItem oc={() => setTemplate('textImage')} name='Texto e imagen' parentGap={gap}>
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
					p={1}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('text2Images')} name='Texto y 2 imágenes' parentGap={gap}>
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
					wrap='wrap'
					p={1}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('imageOnly')} name='Solo imagen' parentGap={gap}>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
					wrap='wrap'
					p={1}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('twoImages')} name='Dos imágenes' parentGap={gap}>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={5}
					rowSpan={5}
					p={2}
					gap={1}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem oc={() => setTemplate('textOnly')} name='Solo texto' parentGap={gap}>
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
				name='Texto izquierda e imagen derecha'
				parentGap={gap}
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
					p={1}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
			</TemplateItem>

			<TemplateItem
				oc={() => setTemplate('leftTextRightImage')}
				name='Texto izquierda e imagen derecha'
				parentGap={gap}
			>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
				>
					<Icon as={FaImage} w='50%' h='70%' color='gray' />
				</GridItem>
				<GridItem
					as={Flex}
					border='1px solid'
					justify='center'
					align='center'
					colSpan={1}
					rowSpan={5}
					p={1}
				>
					Texto
				</GridItem>
			</TemplateItem>
		</Flex>
	);
}

export default TemplateSelector;
