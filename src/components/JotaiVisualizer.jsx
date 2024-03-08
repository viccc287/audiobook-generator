import Image from './Image.jsx';
import EditableText from './EditableText.jsx';
import { displayedPageIndexAtom, pagesAtom } from '../lib/atoms.jsx';
import { useAtomValue } from 'jotai';

export default function JotaiVisualizer() {
	const titleClass = 'font-jakarta text-4xl font-bold';
	const subtitleClass = 'font-poppins text-2xl';
	
	const pages = useAtomValue(pagesAtom);
	const displayedPageIndex = useAtomValue(displayedPageIndexAtom);

	const Templates = {
		titleSubtitle: (
			<>
				<EditableText
					textStyles={titleClass}
					elementKey='title'
				/>

				<EditableText
					textStyles={subtitleClass}
					elementKey='subtitle'
				/>
			</>
		),
		textOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText
					textStyles={subtitleClass}
					elementKey='subtitle'
				/>
			</div>
		),
		/* textImage: (
			<>
				<EditableText
					textStyles={titleClass}
					pageIndex={pageIndex}
					elementIndex={0}
				/>
				<Image
					width='full'
					height='full'
					pageIndex={pageIndex}
					elementIndex={0}
				/>
			</>
		),
		text2Images: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText
					textStyles={titleClass}
					pageIndex={pageIndex}
					elementIndex={0}
				/>
				<div className='flex size-full flex-wrap items-start'>
					<Image
						width='1/2'
						height='full'
						pageIndex={pageIndex}
						elementIndex={0}
					/>
					<Image
						width='1/2'
						height='full'
						pageIndex={pageIndex}
						elementIndex={1}
					/>
				</div>
			</div>
		),
		imageOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image
						width='full'
						height='full'
						pageIndex={pageIndex}
						elementIndex={0}
					/>
				</div>
			</div>
		),
		twoImages: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image
						width='1/2'
						height='full'
						pageIndex={pageIndex}
						elementIndex={0}
					/>
					<Image
						width='1/2'
						height='full'
						pageIndex={pageIndex}
						elementIndex={1}
					/>
				</div>
			</div>
		),
		
		leftTextRightImage: (
			<div className='flex size-full items-center gap-5'>
				<div className='flex h-full w-1/2'>
					<EditableText
						textStyles={subtitleClass}
						pageIndex={pageIndex}
						elementIndex={1}
					/>
				</div>
				<div className='flex h-full w-1/2 flex-wrap items-start'>
					<Image
						width='full'
						height='full'
						pageIndex={pageIndex}
						elementIndex={0}
					/>
				</div>
			</div>
		), */
	};
	return Templates[pages[displayedPageIndex].template];
}
