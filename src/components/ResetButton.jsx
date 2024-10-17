import { pagesAtom } from '../lib/atoms';
import { useSetAtom } from 'jotai';
import { displayedPageIndexAtom } from '../lib/atoms';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaTrash } from 'react-icons/fa6';

export default function ResetButton() {
	const setDisplayedPageIndex = useSetAtom(displayedPageIndexAtom);
	const setPages = useSetAtom(pagesAtom);
	const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();
	const toast = useToast();

	const cancelRef = useRef(null);

	function clearBook() {
		closeDeleteDialog();
		setPages([
			{
				name: 'Portada',
				template: 'cover',
				color: '#FFFFFF',
				images: {},
				text: {
					title: 'Título del cuento',
					subtitle: 'Texto',
				},
				audios: {},
				loading: {},
			},
		]);
		setDisplayedPageIndex(0);
		toast({
			title: 'Cuento borrado',
			status: 'success',
			duration: 4000,
			isClosable: true,
		});
	}

	return (
		<>
			<Button size={['xs', 'sm', 'sm', 'sm', 'md']} onClick={openDeleteDialog} colorScheme='red' leftIcon={<FaTrash />}>
				Borrar todo
			</Button>
			<AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={closeDeleteDialog} isCentered>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Borrar todas las páginas
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text>¿Estás seguro? Esta acción borrará todas las páginas y su contenido.</Text>
							<Text>Si no quieres perder el contenido actual, guarda el cuento antes de borrar todo.</Text>
						</AlertDialogBody>

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
