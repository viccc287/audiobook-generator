import { Button, useToast } from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import JSZip from 'jszip';
import { FaUpload } from 'react-icons/fa';
import { pagesAtom } from '../lib/atoms';

export default function LoadButton() {
  const setPages = useSetAtom(pagesAtom);
  const toast = useToast();

  async function loadStory(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      const pagesJSON = JSON.parse(await contents.file('pages.json').async('text'));

      for (let i = 0; i < pagesJSON.length; i++) {
        const page = pagesJSON[i];

        for (const [key, fileName] of Object.entries(page.images)) {
          const imageBlob = await contents.file(fileName).async('blob');
          page.images[key] = URL.createObjectURL(imageBlob);
        }

        for (const [key, audio] of Object.entries(page.audios)) {
          const audioBlob = await contents.file(audio.url).async('blob');
          page.audios[key].file = audioBlob;
          page.audios[key].url = URL.createObjectURL(audioBlob);
        }
      }

      setPages(pagesJSON);

      toast({
        title: 'Cuento cargado',
        description: `Páginas: Portada + ${pagesJSON.length - 1}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      toast({
        title: 'Error al cargar',
        description: 'No se pudo cargar el archivo del cuento',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Button as="label" cursor='pointer' htmlFor="file-upload" colorScheme='orange' leftIcon={<FaUpload />} size={['xs', 'sm', 'sm', 'sm', 'md']}>
      Importar cuento
      <input
        id="file-upload"
        type="file"
        accept=".zip"
        style={{ display: 'none' }}
        onChange={loadStory}
      />
    </Button>
  );
}