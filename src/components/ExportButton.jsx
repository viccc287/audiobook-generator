import {
	Button,
	useToast
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { useAtomValue } from 'jotai';
import JSZip from 'jszip';
import { FaFileExport } from 'react-icons/fa6';
import { pagesAtom } from '../lib/atoms';

export default function ExportButton() {
	const pages = useAtomValue(pagesAtom);
	const pagesJSON = JSON.parse(JSON.stringify(pages));
	const toast = useToast();

	function generateExportFileName(title) {
		let bookTitleRaw = title.toLowerCase().replaceAll(' ', '_');
		let bookTitle = bookTitleRaw
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[<>:"/\\|?*.,;!¡¿()[\]{}]/g, '')
			.replace(/[^\x20-\x7E]/g, '')
			.replace(/\s+/g, ' ')
			.trim()
			.replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i, '_$1')
			.slice(0, 64);
		return bookTitle.length > 0 ? bookTitle : 'nuevo_cuento';
	}

	async function exportStory() {
		if (pages[0].template != 'cover' || !pages[0].text.title || !pages[0].text.subtitle) {
			if (!toast.isActive('coverError')) {
				toast({
					id: 'coverError',
					title: 'Falta portada',
					description: `La primera página debe tener la plantilla 'Portada', así como tener un título y subtítulo`,
					status: 'warning',
					duration: 4000,
					isClosable: true,
				});
			}
			return;
		}

		let allAudiosReady = true;

		for (let i = 0; i < pages.length; i++) {
			const page = pages[i];

			for (const isLoading of Object.values(page.loading)) {
				console.log(isLoading);
				
				if (isLoading) {
					if (!toast.isActive('audioError')) {
						toast({
							id: 'audioError',
							title: 'Audio en proceso',
							description: `El audio de la página ${i} aún se está generando`,
							status: 'warning',
							duration: 4000,
							isClosable: true,
						});
					}
					allAudiosReady = false;
					return;
				}
			}
		}

		if (!allAudiosReady) return;

		const PARENT_FOLDER_NAME = 'books';
		const bookTitle = generateExportFileName(pages[0].text.title);

		const zip = new JSZip();
		const folder = zip.folder(bookTitle);

		for (let i = 0; i < pages.length; i++) {
			const page = pages[i];

			for (const [key, url] of Object.entries(page.images)) {
				const response = await fetch(url);
				const blob = await response.blob();
				folder.file(`page${i + 1}-${key}.jpg`, blob);
			}

			for (const [key, audio] of Object.entries(page.audios)) {
				folder.file(`page${i + 1}-${key}.mp3`, audio.file);
			}
		}

		for (let i = 0; i < pagesJSON.length; i++) {
			const page = pagesJSON[i];

			for (const [key] of Object.entries(page.images)) {
				page.images[key] = `./${PARENT_FOLDER_NAME}/${bookTitle}/page${i + 1}-${key}.jpg`;
			}

			for (const [key] of Object.entries(page.audios)) {
				page.audios[key].url = `./${PARENT_FOLDER_NAME}/${bookTitle}/page${i + 1}-${key}.mp3`;
			}
		}

		folder.file('pages.json', JSON.stringify(pagesJSON));

		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, `${bookTitle}.zip`);

		toast({
			title: 'Cuento exportado',
			description: `Páginas: Portada + ${pagesJSON.length - 1}`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	return (
		<Button onClick={exportStory} colorScheme='cyan' leftIcon={<FaFileExport />} size={['xs', 'sm', 'sm', 'sm', 'md']}>
			Exportar cuento
		</Button>
	);
}
