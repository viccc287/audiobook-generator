import { Button, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa6";



export function ToggleModeButton() {


    const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Tooltip label='Cambiar tema' openDelay={400} hasArrow>
			<Button size={['xs','sm', 'sm', 'sm', 'md']} color='white' _hover={{bg:'whiteAlpha.300'}} variant='outline' leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} onClick={toggleColorMode}>
				{colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
			</Button>
		</Tooltip>
	);
}
