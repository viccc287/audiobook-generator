import { pagesAtom } from '../lib/atoms';
import { useSetAtom } from 'jotai';
import { displayedPageIndexAtom } from '../lib/atoms';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';

export default function ResetButton() {
	const setDisplayedPageIndex = useSetAtom(displayedPageIndexAtom);
	const setPages = useSetAtom(pagesAtom);
	const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();

	const cancelRef = useRef(null);

    function clearBook() {
        closeDeleteDialog();
		setPages([
			{
				name: 'Portada',
				template: 'textOnly',
				color: '#FFFFFF',
				images: {},
				text: {
					title: 'Portada',
					subtitle: 'Portada',
				},
				audios: {},
				loading: {},
			},
		]);
        setDisplayedPageIndex(0);
	}

	return (
		<>
			<Button onClick={openDeleteDialog} colorScheme='red'>Limpiar todo</Button>;
			<AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={closeDeleteDialog}>
				<AlertDialogOverlay>
					<AlertDialogContent fontFamily='inter'>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Borrar todas las páginas
						</AlertDialogHeader>

						<AlertDialogBody>¿Estás seguro? Esta acción borrará todas las páginas.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={closeDeleteDialog}>
								Cancelar
							</Button>
							<Button colorScheme='red' onClick={clearBook} ml={3}>
								Borrar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
