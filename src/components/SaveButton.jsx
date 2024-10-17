import {
    Button,
    useToast
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { useAtomValue } from 'jotai';
import JSZip from 'jszip';
import { FaFloppyDisk } from 'react-icons/fa6';
import { pagesAtom } from '../lib/atoms';

export default function SaveButton() {
	const pages = useAtomValue(pagesAtom);
	const pagesJSON = JSON.parse(JSON.stringify(pages));
	const toast = useToast();

	function generateSaveFileName(title) {
		let bookTitleRaw = title.toLowerCase().replaceAll(' ', '_');
		let bookTitle = bookTitleRaw
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[<>:"/\\|?*.,;!¡¿()[\]{}]/g, '')
			.replace(/\s+/g, ' ')
			.trim()
			.replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i, '_$1')
            .slice(0, 64)
            .concat('_save');

		return bookTitle.length > 0 ? bookTitle : 'nuevo_cuento';
	}

    async function saveStory() {
        
        if (pages[0].template !== 'cover' || !pages[0].text.title || !pages[0].text.subtitle) {
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

		const zip = new JSZip();

		for (let i = 0; i < pages.length; i++) {
			const page = pages[i];

			for (const [key, url] of Object.entries(page.images)) {
				const response = await fetch(url);
				const blob = await response.blob();
				const imageFileName = `page${i + 1}-${key}.jpg`;
				zip.file(imageFileName, blob);
				pagesJSON[i].images[key] = imageFileName;
			}

			for (const [key, audio] of Object.entries(page.audios)) {
				const audioFileName = `page${i + 1}-${key}.mp3`;
				zip.file(audioFileName, audio.file);
				pagesJSON[i].audios[key].url = audioFileName;
			}
		}

		zip.file('pages.json', JSON.stringify(pagesJSON));

		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, generateSaveFileName(pages[0].text.title) + '.zip');

		toast({
			title: 'Cuento guardado',
			description: `Cuento guardado con éxito`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	return (
		<Button
			onClick={saveStory}
			colorScheme='green'
			leftIcon={<FaFloppyDisk />}
			size={['xs', 'sm', 'sm', 'sm', 'md']}
		>
			Guardar cuento
		</Button>
	);
}
