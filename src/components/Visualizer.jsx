import CustomImage from './CustomImage.jsx';
import EditableText from './EditableText.jsx';
import { currentPageColorAtom, currentPageTemplateAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';
import { Flex, Input } from '@chakra-ui/react';
import CustomColorSelector from './CustomColorSelector.jsx';

export default function Visualizer() {
	const titleClass = {
		fontFamily: 'inter',
		fontSize: '3rem',
		fontWeight: 'black',
		textAlign: 'center',
	};

	const subtitleClass = { fontFamily: 'inter', fontSize: '1.5rem', fontWeight: 'semibold' };

	const selectedTemplate = useAtomValue(currentPageTemplateAtom);
	const selectedColor = useAtomValue(currentPageColorAtom);

	const templates = {
		titleSubtitle: (
			<>
				<EditableText textProps={titleClass} elementKey='title' />

				<EditableText textProps={subtitleClass} elementKey='subtitle' />
			</>
		),
		textOnly: (
			<>
				<EditableText textProps={subtitleClass} elementKey='subtitle' />
			</>
		),
		textImage: (
			<>
				<EditableText textProps={titleClass} elementKey='title' />
				<CustomImage elementKey='first' />
			</>
		),

		text2Images: (
			<>
				<EditableText textProps={titleClass} elementKey='title' />
				<Flex boxSize='full'>
					<CustomImage elementKey='first' />
					<CustomImage elementKey='second' />
				</Flex>
			</>
		),
		imageOnly: <CustomImage elementKey='first' />,
		twoImages: (
			<Flex boxSize='full'>
				<CustomImage elementKey='first' />
				<CustomImage elementKey='second' />
			</Flex>
		),

		leftTextRightImage: (
			<Flex boxSize='full'>
				<EditableText textProps={subtitleClass} elementKey='subtitle' />

				<CustomImage  elementKey='first' />
			</Flex>
		),
	};
	return (
		<Flex
			pos='relative'
			w='full'
			direction='column'
			gap={5}
			p={5}
			alignItems='stretch'
			rounded='15px'
			bgColor={selectedColor}
		>
			{templates[selectedTemplate]}
			<CustomColorSelector />
		</Flex>
	);
}
