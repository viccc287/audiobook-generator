import Image from './Image.jsx';
import EditableText from './EditableText.jsx';
import { currentPageTemplateAtom, displayedPageIndexAtom, pagesAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';

export default function JotaiVisualizer() {
	const titleClass = 'font-jakarta text-4xl font-bold';
	const subtitleClass = 'font-poppins text-2xl';

	const template = useAtomValue(currentPageTemplateAtom);

	const Templates = {
		titleSubtitle: (
			<>
				<EditableText textStyles={titleClass} elementKey='title' />

				<EditableText textStyles={subtitleClass} elementKey='subtitle' />
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
					<Image width='1/2' height='1/2' elementKey='first' />
					<Image width='1/2' height='1/2' elementKey='second' />
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
					<Image width='1/2' height='1/2' elementKey='first' />
					<Image width='1/2' height='1/2' elementKey='second' />
				</div>
			</div>
		),

		leftTextRightImage: (
			<div className='flex size-full items-center gap-5'>
				<div className='flex h-full w-1/2'>
					<EditableText textStyles={subtitleClass} elementKey='subtitle' />
				</div>
				<div className='flex h-full w-1/2 flex-wrap items-start'>
					<Image width='1/2' height='1/2' elementKey='first' />
				</div>
			</div>
		),
	};
	return Templates[template];
}
