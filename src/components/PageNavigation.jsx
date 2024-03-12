import { pagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { useState, useRef, useEffect } from 'react';
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
	Circle,
	Input,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	AddIcon,
	DeleteIcon,
	ChevronDownIcon,
	PlusSquareIcon,
	CheckIcon,
	ArrowRightIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
	CheckCircleIcon,
	CloseIcon,
	EditIcon,
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

	const containerRef = useRef(null);
	const cancelRef = useRef(null);
	const dragItemIndex = useRef(0);
	const draggedOverItemIndex = useRef(0);
	const inputRef = useRef(null);

	const [indexToDelete, setIndexToDelete] = useState(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const [editingPageIndex, setEditingPageIndex] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [newPageName, setNewPageName] = useState('');

	useEffect(() => {
		const container = containerRef.current;
		if (container.clientWidth < container.scrollWidth) setIsOverflown(true);
		else if (isOverflown) setIsOverflown(false);
		else return;
	}, [pages]);

	const handleRenamePage = index => {
		setEditingPageIndex(index);
		setNewPageName(pages[index].name);
		setIsEditing(true);
	};

	const handlePageNameChange = event => {
		setNewPageName(event.target.value);
	};

	const handleSavePageName = () => {
		const newPages = [...pages];
		newPages[editingPageIndex].name = newPageName;
		setPages(newPages);
		setEditingPageIndex(null); // Finalizar el modo de edición
		setIsEditing(false);
	};

	const handleCancelRename = () => {
		setEditingPageIndex(null); // Cancelar el modo de edición
	};

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Evitar que se envíe el formulario si está dentro de uno
			handleSavePageName(); // Llamar a la función para guardar el nombre de la página
		}
	};

	// -----------------------------------------------------

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

	function handleScroll(moveTo) {
		const container = containerRef.current;

		if (moveTo === 'left') container.scrollLeft -= 500;
		else if (moveTo === 'right') container.scrollLeft += 500;
		console.log(container.scrollLeft);
	}

	const pageNavElements = pages.map((page, index) => {
		return (
			<Flex
				borderInline='1px'
				borderColor='blackAlpha.300'
				key={index}
				bgColor={
					displayedPageIndex === index ? 'blackAlpha.200' : 'transparent'
				}
			>
				<Button
					fontSize='inherit'
					draggable={!isEditing}
					onDragStart={e => {
						e.stopPropagation();
						dragItemIndex.current = index;
					}}
					onDragEnter={e => (draggedOverItemIndex.current = index)}
					onDragEnd={handleSort}
					onDragOver={e => e.preventDefault()}
					rounded='0'
					onClick={() => {
						setDisplayedPageIndex(index);
					}}
					onDoubleClick={() => handleRenamePage(index)}
					fontWeight={displayedPageIndex === index ? 'bold' : 'normal'}
					bgColor='transparent'
				>
					<Text pe={4} fontWeight='semibold' color='blackAlpha.500'>
						{index + 1}
					</Text>
					{editingPageIndex === index ? (
						<Input
							w={24}
							px={2}
							fontSize='sm'
							fontWeight='normal'
							value={newPageName}
							onChange={handlePageNameChange}
							onBlur={handleSavePageName}
							onKeyDown={handleKeyPress}
							ref={inputRef}
						/>
					) : (
						<Text px={2}>{page.name}</Text>
					)}
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
						<MenuItem
							icon={<EditIcon/>}
							onClick={() => handleRenamePage(index)}
						>
							Renombrar página
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
				bgColor='white'
				ps={10}
				pe={20}
				fontFamily='inter'
				fontSize='sm'
				alignItems='center'
			>
				<Flex>
					<IconButton
						icon={<AddIcon boxSize={3} />}
						onClick={() => handleInsertPageAfter(displayedPageIndex)}
						bgColor='transparent'
					/>
					<Menu isLazy>
						<MenuButton
							rounded='0'
							as={IconButton}
							icon={<HamburgerIcon boxSize={3} />}
							bgColor='transparent'
						></MenuButton>
						<Box p='0'>
							<MenuList
								maxHeight={72}
								overflow='auto'
								color='black'
								sx={{
									'&::-webkit-scrollbar': {
										width: '6px',
										backgroundColor: 'white',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: 'rgba(0, 0, 0, 0.25)',
										borderRadius: '8px',
									},
									'&::-webkit-scrollbar-track': {
										backgroundColor: 'rgba(0, 0, 0, 0.25)',
										// Agrega un padding en la parte superior e inferior del track
										padding: '10px 0',
									},
								}}
							>
								{pageMenuElements}
							</MenuList>
						</Box>
					</Menu>
				</Flex>
				<Flex px={3} overflow='hidden'>
					<Flex
						ref={containerRef}
						direction='row'
						bgColor='transparent'
						overflow='hidden'
						scrollBehavior='smooth'
					>
						{pageNavElements}
					</Flex>
				</Flex>

				<Spacer></Spacer>
				{isOverflown ? (
					<Flex>
						<IconButton
							icon={<ChevronLeftIcon boxSize={6} />}
							onClick={() => handleScroll('left')}
							bgColor='transparent'
						/>
						<IconButton
							icon={<ChevronRightIcon boxSize={6} />}
							onClick={() => handleScroll('right')}
							bgColor='transparent'
						/>
					</Flex>
				) : null}
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
