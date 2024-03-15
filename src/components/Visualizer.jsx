import Image from './Image.jsx';
import EditableText from './EditableText.jsx';
import { currentPageTemplateAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';
import { Flex } from '@chakra-ui/react';

export default function Visualizer() {
	const titleClass = {
		fontFamily: 'inter',
		fontSize: '3rem',
		fontWeight: 'black',
		textAlign: 'center',
	};
	const subtitleClass = { fontFamily: 'inter', fontSize: '1.5rem', fontWeight: 'semibold' };

	const template = useAtomValue(currentPageTemplateAtom);

	const Templates = {
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
				<Image width='full' height='full' elementKey='first' />
			</>
		),

		text2Images: (
			<>
				<EditableText textProps={titleClass} elementKey='title' />
				<Flex boxSize='full'>
					<Image width='1/2' height='full' elementKey='first' />
					<Image width='1/2' height='full' elementKey='second' />
				</Flex>
			</>
		),
		imageOnly: <Image width='full' height='full' elementKey='first' />,
		twoImages: (
			<Flex boxSize='full'>
				<Image width='1/2' height='full' elementKey='first' />
				<Image width='1/2' height='full' elementKey='second' />
			</Flex>
		),

		leftTextRightImage: (
			<Flex boxSize='full'>
				<EditableText textProps={subtitleClass} elementKey='subtitle' />

				<Image width='full' height='full' elementKey='first' />
			</Flex>
		),
	};
	return Templates[template];
}
