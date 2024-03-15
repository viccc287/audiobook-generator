import { PhotoIcon } from '@heroicons/react/16/solid';
import { useSetAtom } from 'jotai';
import { currentPageTemplateAtom } from '../lib/atoms';
import { Center, Flex, Grid, GridItem } from '@chakra-ui/react';
function TemplateSelector() {
	const setTemplate = useSetAtom(currentPageTemplateAtom);

	const width = '180px';
	const height = '120px';

	return (
		<div className='flex size-fit h-full w-1/3 flex-wrap items-start justify-center gap-5'>
			<Flex w={width} h={height} bgColor='blackAlpha.500' rounded='16px' p={3} fontSize='0.75rem'>
				<Grid
					bgColor='white'
					flex='auto'
					p={2}
					rounded='8px'
					templateRows='repeat(, 1fr)'
					templateColumns='repeat(2, 1fr)'
				>
					<GridItem as={Flex} border='1px solid' justify='center' align='center' colSpan={2} rowSpan={2}>
						Titulo
					</GridItem>
					<GridItem as={Flex} border='1px solid' justify='center' align='center' colSpan={2} rowSpan={3}>
						Subtitulo
					</GridItem>
				</Grid>
			</Flex>

			<button
				className='flex size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => setTemplate('titleSubtitle')}
			>
				<div className='flex h-24 w-32 flex-col rounded-xl border-2 bg-white p-3'>
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
				onClick={() => setTemplate('textImage')}
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
				onClick={() => setTemplate('text2Images')}
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
				onClick={() => setTemplate('imageOnly')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full justify-center divide-x divide-y divide-black border border-black'>
						<PhotoIcon className='h-full text-neutral-400' />
					</div>
				</div>
				<div className='pt-3 font-semibold text-white'>Imagen</div>
			</button>

			<button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => setTemplate('twoImages')}
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
				onClick={() => setTemplate('textOnly')}
			>
				<div className='flex h-32 w-40  flex-col rounded-xl border-2 bg-white p-3'>
					<div className='flex h-full w-full items-center justify-center divide-x divide-black border border-black'>
						<div className='flex h-1/3 items-center justify-center text-xs font-semibold'>
							<p>Texto</p>
						</div>
					</div>
				</div>
				<p className='pt-3 font-semibold text-white'>Solo texto</p>
			</button>

			<button
				className='flex  size-fit flex-col items-center justify-center rounded-lg bg-black/20 p-3 transition duration-200 hover:bg-black/40 hover:ring hover:ring-white '
				onClick={() => setTemplate('leftTextRightImage')}
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
