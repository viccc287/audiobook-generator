import { useAtomValue } from 'jotai';
import { pagesAtom } from '../lib/atoms';
import { Button } from '@chakra-ui/react';

export default function ExportButton() {
	const pages = useAtomValue(pagesAtom);
	const pagesJSON = JSON.parse(JSON.stringify(pages));

	async function exportStory() {
		// Crear un nuevo objeto FileSystemDirectoryHandle

		if (pages[0].template != 'cover' || !pages[0].text.title || !pages[0].text.subtitle) {
			alert("La primera página debe tener la plantilla 'Portada', así como tener un título y subtítulo");
			return;
		}

		const PARENT_FOLDER_NAME = 'books';

		const bookTitle = pages[0].text.title.toLowerCase().replaceAll(' ', '_');
		const dirHandle = await window.showDirectoryPicker();

		// Crear una carpeta para los archivos
		const folderHandle = await dirHandle.getDirectoryHandle(bookTitle, { create: true });

		for (let i = 0; i < pages.length; i++) {
			const page = pages[i];

			for (const [key, url] of Object.entries(page.images)) {
				const response = await fetch(url);
				const blob = await response.blob();

				// Crear un nuevo archivo para cada imagen dentro de la carpeta
				const imageFileHandle = await folderHandle.getFileHandle(`page${i + 1}-${key}.jpg`, { create: true });
				const imageWritable = await imageFileHandle.createWritable();
				await imageWritable.write(blob);
				await imageWritable.close();
			}

			for (const [key, audio] of Object.entries(page.audios)) {
				// Crear un nuevo archivo para cada audio dentro de la carpeta
				const audioFileHandle = await folderHandle.getFileHandle(`page${i + 1}-${key}.mp3`, { create: true });
				const audioWritable = await audioFileHandle.createWritable();
				await audioWritable.write(audio.file);
				await audioWritable.close();
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

		console.log(JSON.stringify(pagesJSON));

		// Escribir el archivo JSON dentro de la carpeta
		const fileHandle = await folderHandle.getFileHandle(`pages.json`, { create: true });
		const writable = await fileHandle.createWritable();
		await writable.write(JSON.stringify(pagesJSON));
		await writable.close();

		alert('El cuento ha sido exportado en la carpeta seleccionada');
	}

	return (
		<Button onClick={exportStory} colorScheme='green'>
			Exportar cuento
		</Button>
	);
}
