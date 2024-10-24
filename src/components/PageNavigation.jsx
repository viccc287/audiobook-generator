import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { textApiKeyAtom, audioApiKeyAtom, imageApiKeyAtom, displayedPageIndexAtom, pagesAtom } from '../lib/atoms';

import {
	AddIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DeleteIcon,
	EditIcon,
	HamburgerIcon,
	PlusSquareIcon,
	ExternalLinkIcon,
} from '@chakra-ui/icons';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	Link,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Text,
	Tooltip,
	VStack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { FaKey } from 'react-icons/fa6';
import EditablePageName from './EditablePageName';

export default function PageNavigation() {
	const [displayedPageIndex, setDisplayedPageIndex] = useAtom(displayedPageIndexAtom);
	const [pages, setPages] = useAtom(pagesAtom);

	const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();
	const { isOpen: isKeyDialogOpen, onOpen: openKeyDialog, onClose: closeKeyDialog } = useDisclosure();

	const containerRef = useRef(null);
	const cancelDeleteRef = useRef(null);

	const dragItemIndex = useRef(0);
	const draggedOverItemIndex = useRef(0);

	const [indexToDelete, setIndexToDelete] = useState(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const [editingPageIndex, setEditingPageIndex] = useState(null);

	useEffect(() => {
		const handleResize = () => {
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

	// -----------------------------------------------------

	const handleStartEdit = index => {
		setEditingPageIndex(index);
	};

	const handleSavePageName = (index, newName) => {
		const newPages = [...pages];
		newPages[index].name = newName;
		setPages(newPages);
		setEditingPageIndex(null);
	};

	const confirmDeletePage = index => {
		setIndexToDelete(index);
		openDeleteDialog();
	};

	const handleSort = () => {
		const newPages = [...pages];
		const temp = newPages[dragItemIndex.current];
		newPages[dragItemIndex.current] = newPages[draggedOverItemIndex.current];
		newPages[draggedOverItemIndex.current] = temp;

		if (dragItemIndex.current === displayedPageIndex) setDisplayedPageIndex(draggedOverItemIndex.current);
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
				subtitle: '',
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
				setDisplayedPageIndex(indexToDelete === 0 ? indexToDelete : indexToDelete - 1);
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

	const PageItem = ({ page, index }) => {
		const [draggingOver, setDraggingOver] = useState(false);
		const isEditing = editingPageIndex === index;

		return (
			<Flex
				borderInline={draggingOver ? '2px' : '1px'}
				borderColor={draggingOver ? 'brand.500' : 'blackAlpha.300'}
				key={index}
				bgColor={displayedPageIndex === index ? 'blackAlpha.200' : 'transparent'}
			>
				<Button
					fontSize='inherit'
					draggable={!isEditing}
					onDragStart={e => {
						e.stopPropagation();
						dragItemIndex.current = index;
					}}
					onDragEnter={() => {
						draggedOverItemIndex.current = index;
						setDraggingOver(true);
					}}
					onDragLeave={() => {
						setDraggingOver(false);
					}}
					onDragEnd={() => {
						setDraggingOver(false);
						handleSort();
					}}
					onDragOver={e => {
						e.preventDefault();
						setDraggingOver(true);
					}}
					rounded='0'
					onClick={() => {
						setDisplayedPageIndex(index);
					}}
					fontWeight={displayedPageIndex === index ? 'bold' : 'normal'}
					bgColor='transparent'
				>
					<Text
						pe={4}
						fontWeight='semibold'
						color='blackAlpha.500'
						_dark={{ color: 'whiteAlpha.500' }}
						display={['none', 'none', 'none', 'flex']}
					>
						{index === 0 ? 'P' : index}
					</Text>
					<EditablePageName
						initialName={page.name}
						onSave={newName => handleSavePageName(index, newName)}
						isEditing={isEditing}
						onStartEdit={() => handleStartEdit(index)}
					/>
				</Button>
				<Menu isLazy>
					<Tooltip
						label={index === 0 ? 'Acciones para la portada' : `Acciones para la página ${index}`}
						openDelay={400}
						hasArrow
					>
						<MenuButton
							rounded='0'
							as={IconButton}
							icon={<ChevronDownIcon />}
							bgColor='transparent'
							onFocus={e => e.preventDefault()}
						></MenuButton>
					</Tooltip>
					<MenuList>
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
						<MenuItem _hover={{ bgColor: 'blackAlpha.200' }} icon={<EditIcon />} onClick={() => handleStartEdit(index)}>
							Renombrar página
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		);
	};

	const pageNavElements = pages.map((page, index) => {
		return <PageItem key={index} page={page} index={index} />;
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
				bgColor={displayedPageIndex === index ? 'blackAlpha.200' : 'transparent'}
				fontWeight={displayedPageIndex === index ? 'bold' : 'regular'}
			>
				{index === 0 ? `Portada. ${page.name}` : `${index}. ${page.name}`}
			</MenuItem>
		);
	});

	return (
		<>
			<Flex
				w='100%'
				bottom={0}
				bgColor='white'
				_dark={{ bgColor: 'whiteAlpha.200' }}
				ps={[0, 2, 10]}
				fontFamily='inter'
				fontSize='sm'
				alignItems='center'
			>
				<Flex>
					<Tooltip label='Insertar nueva página' openDelay={400} hasArrow>
						<IconButton
							icon={<AddIcon boxSize={3} />}
							onClick={() => handleInsertPageAfter(displayedPageIndex)}
							bgColor='transparent'
							onFocus={e => e.preventDefault()}
						/>
					</Tooltip>
					<Menu isLazy>
						<Tooltip label='Vista general de páginas' openDelay={400} hasArrow>
							<MenuButton
								rounded='0'
								as={IconButton}
								icon={<HamburgerIcon boxSize={3} />}
								bgColor='transparent'
								onFocus={e => e.preventDefault()}
							></MenuButton>
						</Tooltip>
						<Box p='0'>
							<MenuList
								maxHeight={72}
								overflow='auto'
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
					<Flex ref={containerRef} direction='row' bgColor='transparent' overflow='hidden' scrollBehavior='smooth'>
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
				<Menu isLazy>
					<MenuButton
						ms={[0, 0, 8]}
						rounded='0'
						as={IconButton}
						icon={<Icon as={FaKey} boxSize={3} />}
						bgColor='transparent'
						color='#bcbcbc'
					>
						API
					</MenuButton>

					<MenuList
						maxHeight={72}
						overflow='auto'
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
						<MenuItem onClick={openKeyDialog}>Cambiar API key</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<AlertDialog
				isCentered
				isOpen={isDeleteDialogOpen}
				leastDestructiveRef={cancelDeleteRef}
				onClose={closeDeleteDialog}
			>
				<AlertDialogOverlay>
					<AlertDialogContent fontFamily='inter'>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Borrar Página
						</AlertDialogHeader>

						<AlertDialogBody>¿Estás seguro? No podrás revertir esto.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelDeleteRef} onClick={closeDeleteDialog}>
								Cancelar
							</Button>
							<Button colorScheme='red' onClick={handleDeletePage} ml={3}>
								Borrar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<APIKeysModal isKeyDialogOpen={isKeyDialogOpen} closeKeyDialog={closeKeyDialog} />
		</>
	);
}

function APIKeysModal({ isKeyDialogOpen, closeKeyDialog }) {
	const setTextApiKey = useSetAtom(textApiKeyAtom);
	const setAudioApiKey = useSetAtom(audioApiKeyAtom);
	const setImageApiKey = useSetAtom(imageApiKeyAtom);

	const [audioKeyValue, setAudioKeyValue] = useState('');
	const [textKeyValue, setTextKeyValue] = useState('');
	const [imageKeyValue, setImageKeyValue] = useState('');

	const toast = useToast();

	const handleInputAudioKeyChange = e => setAudioKeyValue(e.target.value);
	const handleInputTextKeyChange = e => setTextKeyValue(e.target.value);
	const handleInputImageKeyChange = e => setImageKeyValue(e.target.value);

	const confirmAudioApiKeyChange = () => {
		setAudioApiKey(audioKeyValue);
		toast({
			title: 'API key de audio actualizada',
			description: `La API key de audio cambió`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		closeKeyDialog();
	};

	const confirmTextApiKeyChange = () => {
		setTextApiKey(textKeyValue);
		toast({
			title: 'API key de texto actualizada',
			description: `La API key de texto cambió`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		closeKeyDialog();
	};

	const confirmImageApiKeyChange = () => {
		setImageApiKey(imageKeyValue);
		toast({
			title: 'API key de imagen actualizada',
			description: `La API key de imagen cambió`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		closeKeyDialog();
	};

	const inputAudioKeyRef = useRef(null);
	const inputTextKeyRef = useRef(null);

	return (
		<Modal isCentered initialFocusRef={inputAudioKeyRef} isOpen={isKeyDialogOpen} onClose={closeKeyDialog}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Cambiar API key</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6} as={VStack} gap={8}>
					<FormControl as={VStack} align='start'>
						<FormLabel>
							<Link href='https://elevenlabs.io/api' isExternal>
								API key de audio <ExternalLinkIcon mx='2px' />
							</Link>
						</FormLabel>
						<Input value={audioKeyValue} onChange={handleInputAudioKeyChange} />
						<Button colorScheme='blue' mr={3} onClick={confirmAudioApiKeyChange} isDisabled={!audioKeyValue}>
							Cambiar key
						</Button>
					</FormControl>
					<FormControl as={VStack} align='start'>
						<FormLabel>
							<Link href='https://docs.cohere.com/v2/reference/about' isExternal>
								API key de texto <ExternalLinkIcon mx='2px' />
							</Link>
						</FormLabel>
						<Input ref={inputTextKeyRef} value={textKeyValue} onChange={handleInputTextKeyChange} />
						<Button colorScheme='blue' mr={3} onClick={confirmTextApiKeyChange} isDisabled={!textKeyValue}>
							Cambiar key
						</Button>
					</FormControl>
					<FormControl as={VStack} align='start'>
						<FormLabel>
							<Link href='https://huggingface.co/docs/api-inference/index' isExternal>
								API key de imagen <ExternalLinkIcon mx='2px' />
							</Link>
						</FormLabel>
						<Input value={imageKeyValue} onChange={handleInputImageKeyChange} />
						<Button colorScheme='blue' mr={3} onClick={confirmImageApiKeyChange} isDisabled={!imageKeyValue}>
							Cambiar key
						</Button>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={closeKeyDialog}>Volver</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
