import { PhotoIcon } from '@heroicons/react/16/solid';
function TemplateSelector({ changeTemplateFunction, className }) {
	return (
		<div className={className}>
			<button
				className='flex size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('titleSubtitle')}
			>
				<div className='flex h-32 w-40 flex-col rounded-xl border-2 bg-white p-3'>
					<div className='h-full w-full divide-y divide-black border border-black'>
						<div className='flex h-2/3 items-center justify-center text-xs font-semibold'>
							<p>Título</p>
						</div>
						<div className='flex h-1/3 items-center justify-center text-xs font-semibold'>
							<p>Subtítulo</p>
						</div>
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Título y subtítulo </div>
            </button>
            
			<button
				className='flex size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('textImage')}
			>
				<div className='flex h-32 w-40 flex-col rounded-xl border-2 bg-white p-3'>
					<div className='h-full w-full divide-y divide-black border border-black'>
						<div className='flex h-1/3 items-center justify-center text-xs font-semibold'>
							<p>Texto</p>
						</div>
						<div className='flex h-2/3 items-center justify-center text-xs font-semibold'>
							<PhotoIcon className='h-full text-neutral-400' />
						</div>
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Texto e imagen </div>
            </button>
            
			<button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('text2Images')}
			>
				<div className='flex h-32 w-40 flex-col rounded-xl border-2 bg-white p-3'>
					<div className='h-full w-full divide-y divide-black border border-black'>
						<div className='flex h-1/3 items-center justify-center text-xs font-semibold'>
							<p>Texto</p>
						</div>
						<div className='flex h-2/3 items-center justify-center text-xs font-semibold'>
							<PhotoIcon className='h-full text-neutral-400' />
							<PhotoIcon className='h-full text-neutral-400' />
						</div>
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Texto y 2 imágenes </div>
            </button>
     
			<button
				className='flex size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('imageOnly')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full justify-center divide-y divide-x divide-black border border-black'>
						<PhotoIcon className='h-full text-neutral-400' />
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Imagen</div>
            </button>
            
			<button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('twoImages')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full justify-center divide-x divide-black border border-black'>
                        <PhotoIcon className='h-full text-neutral-400' />
                        <PhotoIcon className='h-full text-neutral-400' />
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Dos imágenes </div>
            </button>

            <button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('textOnly')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full justify-center items-center divide-x divide-black border border-black'>
                    <div className='flex h-1/3 items-center justify-center text-xs font-semibold'>
							<p>Texto</p>
						</div>
					</div>
				</div>
				<p className='pt-3 font-semibold text-white'>Solo texto</p>
            </button>
            
            <button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => changeTemplateFunction('leftTextRightImage')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full justify-center divide-x divide-black border border-black'>
                    <div className='flex w-1/2 items-center justify-center text-xs font-semibold'>
							<p>Texto</p>
						</div>
                        <PhotoIcon className='h-full w-1/2 text-neutral-400' />
					</div>
				</div>
				<p className='pt-3 font-semibold text-white'>Texto a la izquierda e imagen a la derecha</p>
			</button>
		</div>
	);
}

export default TemplateSelector;
