import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { FaEye } from 'react-icons/fa6';
import { pagesAtom } from '../lib/atoms';
import PreviewVisualizer from './previewVisualizer/PreviewVisualizer';

export default function PreviewButton() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const pages = useAtomValue(pagesAtom);

	return (
		<>
			<Button size={['xs', 'sm', 'sm', 'sm', 'md']} onClick={onOpen} colorScheme='yellow' leftIcon={<FaEye/>}>
				Previsualizar
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} isCentered  size='6xl'>
				<ModalOverlay />
				<ModalContent  w='full' >
					<ModalHeader>Vista previa del libro</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<PreviewVisualizer book={pages} />
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
