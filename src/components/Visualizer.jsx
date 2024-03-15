import Image from './Image.jsx';
import EditableText from './EditableText.jsx';
import { currentPageTemplateAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';

export default function Visualizer() {
	const titleClass = {fontFamily: 'inter', fontSize: '2.5rem', fontWeight: 'black', textAlign:'center'};
	const subtitleClass = {fontFamily: 'inter', fontSize: '1.25rem', fontWeight: 'semiboldy'}

	const template = useAtomValue(currentPageTemplateAtom);

	const Templates = {
		titleSubtitle: (
			<>
				<EditableText textProps={titleClass} elementKey='title' />

				<EditableText textProps={subtitleClass} elementKey='subtitle' />
			</>
		),
		textOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={subtitleClass} elementKey='subtitle' />
			</div>
		),
		textImage: (
			<>
				<EditableText textStyles={titleClass} elementKey='title' />
				<Image width='full' height='full' elementKey='first' />
			</>
		),

		text2Images: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={titleClass} elementKey='title' />
				<div className='flex size-full flex-wrap items-start'>
					<Image width='1/2' height='full' elementKey='first' />
					<Image width='1/2' height='full' elementKey='second' />
				</div>
			</div>
		),
		imageOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image width='full' height='full' elementKey='first' />
				</div>
			</div>
		),
		twoImages: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image width='1/2' height='full' elementKey='first' />
					<Image width='1/2' height='full' elementKey='second' />
				</div>
			</div>
		),

		leftTextRightImage: (
			<div className='flex size-full items-center gap-5'>
				<div className='flex h-full w-1/2'>
					<EditableText textStyles={subtitleClass} elementKey='subtitle' />
				</div>
				<div className='flex h-full w-1/2 flex-wrap items-start'>
					<Image width='full' height='full' elementKey='first' />
				</div>
			</div>
		),
	};
	return Templates[template];
}
