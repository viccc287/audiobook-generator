import CustomImage from './CustomImage.jsx';
import EditableText from './EditableText.jsx';
import { currentPageColorAtom, currentPageTemplateAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';
import { Flex } from '@chakra-ui/react';
import CustomColorSelector from './CustomColorSelector.jsx';
import invertColor from '../utils/colorUtils.js';

export default function Visualizer() {
	const selectedTemplate = useAtomValue(currentPageTemplateAtom);
	const selectedColor = useAtomValue(currentPageColorAtom);


	const invertedColor = invertColor(selectedColor, true);

	const titleProps = {
		fontFamily: 'playpen',
		fontSize: { base: '1.5rem', md: '2.25rem', xl: '2.75rem' },
		fontWeight: 'black',
		textAlign: 'center',
		color: invertedColor,
	};

	const subtitleProps = {
		fontFamily: 'playpen',
		fontSize: { base: '1rem', md: '1.3rem', xl: '1.6rem' },
		fontWeight: 'regular',
		textAlign: 'center',
		color: invertedColor,
	};

	const textProps = {
		fontFamily: 'playpen',
		fontSize: { base: '1rem', md: '1.3rem', xl: '1.5rem' },
		fontWeight: 'regular',
		color: invertedColor,
	};

	const templates = {
		titleSubtitle: (
			<>
				<EditableText textProps={titleProps} elementKey='title' />
				<EditableText textProps={subtitleProps} elementKey='subtitle' />
			</>
		),
		cover: (
			<>
				<EditableText textProps={titleProps} elementKey='title' />
				<EditableText textProps={subtitleProps} elementKey='subtitle' />
				<CustomImage elementKey='first' color={invertedColor} />
			</>
		),
		textOnly: (
			<>
				<Flex boxSize='full' gap='inherit' align='center'>
					<EditableText textProps={subtitleProps} elementKey='subtitle' />
				</Flex>
			</>
		),
		textImage: (
			<>
				<EditableText textProps={titleProps} elementKey='title' />
				<CustomImage elementKey='first' color={invertedColor} />
			</>
		),

		titleImageText: (
			<>
				<EditableText textProps={titleProps} elementKey='title' />
				<Flex boxSize='full' gap='inherit' align='center'>
					<CustomImage elementKey='first' color={invertedColor} />
					<EditableText textProps={textProps} elementKey='subtitle' />
				</Flex>
			</>
		),
		titleTextImage: (
			<>
				<EditableText textProps={titleProps} elementKey='title' />
				<Flex boxSize='full' gap='inherit' align='center'>
					<EditableText textProps={textProps} elementKey='subtitle' />
					<CustomImage elementKey='first' color={invertedColor} />
				</Flex>
			</>
		),

		text2Images: (
			<>
				<EditableText textProps={subtitleProps} elementKey='subtitle' />
				<Flex boxSize='full' gap='inherit'>
					<CustomImage elementKey='first' color={invertedColor} />
					<CustomImage elementKey='second' color={invertedColor} />
				</Flex>
			</>
		),
		imageText: (
			<>
				<CustomImage elementKey='first' color={invertedColor} />
				<EditableText textProps={titleProps} elementKey='title' />
			</>
		),
		imageOnly: (
			<Flex boxSize='full' gap='inherit'>
				<CustomImage elementKey='first' color={invertedColor} />
			</Flex>
		),
		twoImages: (
			<Flex boxSize='full' gap='inherit'>
				<CustomImage elementKey='first' color={invertedColor} />
				<CustomImage elementKey='second' color={invertedColor} />
			</Flex>
		),

		leftTextRightImage: (
			<Flex boxSize='full' gap='inherit' align='center'>
				<EditableText textProps={textProps} elementKey='subtitle' />

				<CustomImage elementKey='first' color={invertedColor} />
			</Flex>
		),
		leftImageRightText: (
			<Flex boxSize='full' gap='inherit' align='center'>
				<CustomImage elementKey='first' color={invertedColor} />
				<EditableText textProps={textProps} elementKey='subtitle' />
			</Flex>
		),
	};
	return (
		<Flex
			pos='relative'
			w='full'
			direction='column'
			gap={{ base: 5, md: 10, xl: 16 }}
			p={{ base: 5, md: 10, xl: 16 }}
			alignItems='stretch'
			rounded='15px'
			bgColor={selectedColor}
			transition='background-color 300ms'
		>
			{templates[selectedTemplate]}
			<CustomColorSelector />
		</Flex>
	);
}
