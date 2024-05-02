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
	Button,
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
	Spacer,
	Input,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	AddIcon,
	DeleteIcon,
	ChevronDownIcon,
	PlusSquareIcon,
	CheckIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
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

	const [indexToDelete, setIndexToDelete] = useState(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const [editingPageIndex, setEditingPageIndex] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [newPageName, setNewPageName] = useState('');


	useEffect(() => {
		const handleResize = ()=> {
			const container = containerRef.current;
			if (container.clientWidth < container.scrollWidth) setIsOverflown(true);
			else if (isOverflown) setIsOverflown(false);
		};
		window.addEventListener('resize', handleResize);
		return () => {
		  window.removeEventListener('resize', handleResize);
		};

	  }, [isOverflown]);


	useEffect(() => {
		const container = containerRef.current;
		if (container.clientWidth < container.scrollWidth) setIsOverflown(true);
		else if (isOverflown) setIsOverflown(false);
	}, [pages, isOverflown]);

	useEffect(() => {
		const container = containerRef.current;
		const selectedPage = container.children[displayedPageIndex];
		selectedPage.scrollIntoView({ inline: 'center', behavior: 'smooth' });
	}, [displayedPageIndex]);

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
		setEditingPageIndex(null);
		setIsEditing(false);
	};

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSavePageName();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setEditingPageIndex(null);
			setIsEditing(false);
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
			name: 'Nueva página',
			template: 'titleSubtitle',
			color: '#FFFFFF',
			images: {},
			text: {
				title: 'Editar título',
				subtitle: 'Editar texto',
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
		if (moveTo === 'left') container.scrollLeft -= container.clientWidth;
		else if (moveTo === 'right') container.scrollLeft += container.clientWidth;
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
					onDragEnter={() => (draggedOverItemIndex.current = index)}
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
					{index===0 ? 'P' : index}
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
							_hover={{ bgColor: 'blackAlpha.200' }}
							icon={<PlusSquareIcon />}
							onClick={() => {
								duplicatePage(index);
							}}
						>
							Duplicar página
						</MenuItem>
						<MenuItem
							_hover={{ bgColor: 'blackAlpha.200' }}
							icon={<AddIcon />}
							onClick={() => handleInsertPageAfter(index)}
						>
							Insertar página a la derecha
						</MenuItem>
						<MenuItem
							_hover={{ bgColor: 'blackAlpha.200' }}
							icon={<DeleteIcon />}
							onClick={() => {
								confirmDeletePage(index);
							}}
						>
							Eliminar página
						</MenuItem>
						<MenuItem
							_hover={{ bgColor: 'blackAlpha.200' }}
							icon={<EditIcon />}
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
				{index===0 ? `Portada. ${page.name}` : `${index}. ${page.name}`}
			</MenuItem>
		);
	});

	return (
		<>
			<Flex
				w='100%'
				pos='sticky'
				bottom={0}
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
					<Flex shadow='-10px 0px 15px 0px rgba(0,0,0,0.10)'>
						<IconButton
							icon={<ChevronLeftIcon boxSize={5} />}
							onClick={() => handleScroll('left')}
							bgColor='transparent'
						/>
						<IconButton
							icon={<ChevronRightIcon boxSize={5} />}
							onClick={() => handleScroll('right')}
							bgColor='transparent'
						/>
					</Flex>
				) : null}
			</Flex>
			<AlertDialog
				isCentered
				isOpen={isDeleteDialogOpen}
				leastDestructiveRef={cancelRef}
				onClose={closeDeleteDialog}
			>
				<AlertDialogOverlay>
					<AlertDialogContent fontFamily='inter'>
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
