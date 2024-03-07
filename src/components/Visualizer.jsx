import { useState } from 'react';
import Image from './Image.jsx';
import EditableText from './EditableText.jsx';

export default function Visualizer({withTemplate}) {

	const titleClass = 'font-jakarta text-4xl font-bold'
	const subtitleClass = 'font-poppins text-2xl'

	const Templates = {
		titleSubtitle: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={titleClass} index={0} />
				<EditableText textStyles={subtitleClass} index={1} />
			</div>
		),
		textImage: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={titleClass} index={0} />
				<div className='flex size-full flex-wrap items-start'>
					<Image width='full' height='full' index={0} />
				</div>
			</div>
		),
		text2Images: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={titleClass} index={0} />
				<div className='flex size-full flex-wrap items-start'>
					<Image width='1/2' height='full' index={0} />
					<Image width='1/2' height='full' index={1} />
				</div>
			</div>
		),
		imageOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image width='full' height='full' index={0} />
				</div>
			</div>
		),
		twoImages: (
			<div className='flex size-full flex-col items-center gap-5'>
				<div className='flex size-full flex-wrap items-start'>
					<Image width='1/2' height='full' index={0} />
					<Image width='1/2' height='full' index={1} />
				</div>
			</div>
		),
		textOnly: (
			<div className='flex size-full flex-col items-center gap-5'>
				<EditableText textStyles={subtitleClass} index={1} />
			</div>
		),
		leftTextRightImage: (
			<div className='flex size-full items-center gap-5'>
				<div className='flex h-full w-1/2'>
				<EditableText textStyles={subtitleClass} index={1} />
				</div>
				<div className='flex h-full w-1/2 flex-wrap items-start'>
					<Image width='full' height='full' index={0} />
				</div>
			</div>
		),
	};
	return Templates[withTemplate];
}
