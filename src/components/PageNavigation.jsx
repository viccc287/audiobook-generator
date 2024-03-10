import { pagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { useState, useRef } from 'react';
import { displayedPageIndexAtom } from '../lib/atoms';

import {
	ChevronDownIcon,
	PlusIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/16/solid';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	Icon,
	Button,
	ButtonGroup,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Box,
	useDisclosure,
	Flex,
	Text,
	StackDivider,
} from '@chakra-ui/react';

export default function PageNavigation() {
	const [displayedPageIndex, setDisplayedPageIndex] = useAtom(
		displayedPageIndexAtom,
	);
	const [pages, setPages] = useAtom(pagesAtom);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [indexToDelete, setIndexToDelete] = useState(null);

	const confirmDeletePage = (e, index) => {
		e.stopPropagation();
		setIndexToDelete(index);
		onOpen();
	};

	const handleAddPage = () => {
		setPages([
			...pages,
			{
				name: 'Página',
				template: 'titleSubtitle',
				images: {},
				text: {
					title: 'Editar título',
					subtitle: 'Editar subtítulo',
				},
				audios: {},
				loading: {},
			},
		]);
	};

	const handleInsertPageAfter = index => {
		const newPages = [...pages];
		newPages.splice(index+1, 0, {
			name: `Página ${index+2}`,
			template: 'titleSubtitle',
			images: {},
			text: {
				title: 'Editar título',
				subtitle: 'Editar subtítulo',
			},
			audios: {},
			loading: {},
		});
		setPages(newPages);
	};

	const handleDeletePage = () => {
		const deletePage = () => {
			setPages(pages.filter((_, index) => index !== indexToDelete));

			if (indexToDelete === displayedPageIndex) {
				setDisplayedPageIndex(
					indexToDelete === 0 ? indexToDelete : indexToDelete - 1,
				);
			} else if (indexToDelete < displayedPageIndex) {
				setDisplayedPageIndex(displayedPageIndex - 1);
			}
		};

		if (pages.length === 1) {
			alert('No se puede borrar la única página del libro');
		} else {
			onClose();
			deletePage();
		}
	};
	const currentPages = pages.map((page, index) => {
		return (
			<ButtonGroup isAttached key={index}>
				<Button
					rounded='0'
					onClick={() => {
						setDisplayedPageIndex(index);
					}}
					bgColor='blackAlpha.100'
				>
					{page.name}
				</Button>
				<Menu isLazy>
					<MenuButton
						rounded='0'
						as={IconButton}
						icon={<Icon as={ChevronDownIcon} />}
						bgColor='blackAlpha.100'
					></MenuButton>
					<MenuList color='black'>
						<MenuItem
							icon={<Icon as={PlusIcon} />}
							onClick={() => handleInsertPageAfter(index)}
						>
							Insertar página a la derecha
						</MenuItem>
						<MenuItem
							icon={<Icon as={TrashIcon} />}
							onClick={e => {
								confirmDeletePage(e, index);
							}}
						>
							Eliminar página
						</MenuItem>
					</MenuList>
				</Menu>
			</ButtonGroup>
		);
	});

	return (
		<>
			<Flex direction='row' wrap='wrap' bgColor='white'>
				{currentPages}
				<Text>
				{displayedPageIndex + 1} / {pages.length}
			</Text>
			</Flex>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Borrar Página
						</AlertDialogHeader>

						<AlertDialogBody>
							¿Estás seguro? No podrás revertir esto.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancelar
							</Button>
							<Button colorScheme='red' onClick={handleDeletePage} ml={3}>
								Borrar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
