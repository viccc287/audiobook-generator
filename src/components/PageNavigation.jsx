import { pagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { useState, useRef } from 'react';
import { displayedPageIndexAtom } from '../lib/atoms';

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
	Spacer,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	AddIcon,
	DeleteIcon,
	ChevronDownIcon,
	PlusSquareIcon,
	CheckIcon,
} from '@chakra-ui/icons';

export default function PageNavigation() {
	const [displayedPageIndex, setDisplayedPageIndex] = useAtom(
		displayedPageIndexAtom,
	);
	const [pages, setPages] = useAtom(pagesAtom);

	const {
		isOpen: isDeleteDialogOpen,
		onOpen: openDeleteDialog,
		onClose: closeDeleteDialog,
	} = useDisclosure();

	const cancelRef = useRef(null);
	const dragItemIndex = useRef(0);
	const draggedOverItemIndex = useRef(0);

	const [indexToDelete, setIndexToDelete] = useState(null);

	const confirmDeletePage = index => {
		setIndexToDelete(index);
		openDeleteDialog();
	};

	const handleSort = () => {
		const newPages = [...pages];
		const temp = newPages[dragItemIndex.current];
		newPages[dragItemIndex.current] = newPages[draggedOverItemIndex.current];
		newPages[draggedOverItemIndex.current] = temp;

		if (dragItemIndex.current === displayedPageIndex)
			setDisplayedPageIndex(draggedOverItemIndex.current);
		setPages(newPages);
	};

	function handleInsertPageAfter(index) {
		const newPages = [...pages];
		newPages.splice(index + 1, 0, {
			name: `Nueva página`,
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
	}

	function duplicatePage(index) {
		const newPages = [...pages];
		newPages.splice(index + 1, 0, JSON.parse(JSON.stringify(pages[index])));
		setPages(newPages);
	}

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
			closeDeleteDialog();
			deletePage();
		}
	};

	const [contextMenu, setContextMenu] = useState({
		isOpen: false,
		pageIndex: null,
	});

	const pageNavElements = pages.map((page, index) => {
		return (
			<Flex
				key={index}
				bgColor={
					displayedPageIndex === index ? 'blackAlpha.200' : 'transparent'
				}
			>
				<Button
					fontSize='inherit'
					draggable
					onDragStart={() => (dragItemIndex.current = index)}
					onDragEnter={() => (draggedOverItemIndex.current = index)}
					onDragEnd={handleSort}
					onDragOver={e => e.preventDefault()}
					rounded='0'
					onClick={() => {
						setDisplayedPageIndex(index);
					}}
					fontWeight={displayedPageIndex === index ? 'bold' : 'regular'}
					bgColor='transparent'
					onContextMenu={e => {
						e.preventDefault(); // Evitar que aparezca el menú contextual del navegador
						e.stopPropagation(); // Evitar que se propague el evento

						setContextMenu({
							isOpen: true,
							pageIndex: index,
						});
					}}
				>
					{page.name}
				</Button>
				<Menu isLazy>
					<MenuButton
						rounded='0'
						as={IconButton}
						icon={<ChevronDownIcon />}
						bgColor='transparent'
					></MenuButton>
					<MenuList color='black'>
						<MenuItem
							icon={<PlusSquareIcon />}
							onClick={() => {
								duplicatePage(index);
							}}
						>
							Duplicar página
						</MenuItem>
						<MenuItem
							icon={<AddIcon />}
							onClick={() => handleInsertPageAfter(index)}
						>
							Insertar página a la derecha
						</MenuItem>
						<MenuItem
							icon={<DeleteIcon />}
							onClick={() => {
								confirmDeletePage(index);
							}}
						>
							Eliminar página
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		);
	});

	const pageMenuElements = pages.map((page, index) => {
		let icon = null;
		if (index === displayedPageIndex) icon = <CheckIcon />;

		return (
			<MenuItem
				_hover={{ bgColor: 'blackAlpha.200' }}
				icon={icon}
				key={index}
				onClick={() => {
					setDisplayedPageIndex(index);
				}}
				bgColor={
					displayedPageIndex === index ? 'blackAlpha.200' : 'transparent'
				}
				fontWeight={displayedPageIndex === index ? 'bold' : 'regular'}
			>
				{`${index + 1}. ${page.name}`}
			</MenuItem>
		);
	});

	return (
		<>
			<Flex
				direction='row'
				bgColor='white'
				fontFamily='inter'
				fontSize='sm'
				px={8}
				overflow='auto'
			>
				<IconButton
					icon={<AddIcon boxSize={3} />}
					onClick={() => handleInsertPageAfter(displayedPageIndex)}
				/>
				<Menu isLazy>
					<MenuButton
						rounded='0'
						as={IconButton}
						icon={<HamburgerIcon boxSize={3} />}
						bgColor='transparent'
					></MenuButton>
					<Box p='0'>
						<MenuList maxHeight={72} overflow='auto' color='black'>
							{pageMenuElements}
						</MenuList>
					</Box>
				</Menu>

				{pageNavElements}
			</Flex>

			<AlertDialog
				isOpen={isDeleteDialogOpen}
				leastDestructiveRef={cancelRef}
				onClose={closeDeleteDialog}
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
							<Button ref={cancelRef} onClick={closeDeleteDialog}>
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
