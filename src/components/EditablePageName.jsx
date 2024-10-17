import { useState, useEffect, useRef } from 'react';
import { Input, Text } from '@chakra-ui/react';

const EditablePageName = ({ initialName, onSave, isEditing, onStartEdit }) => {
	const [name, setName] = useState(initialName);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	useEffect(() => {
		setName(initialName);
	}, [initialName]);

	const handleChange = event => {
		setName(event.target.value);
	};

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			onSave(name);
		} else if (event.key === 'Escape') {
			onSave(initialName); // Cancel editing
		}
	};

	const handleBlur = () => {
		onSave(name);
	};

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				w={`${name.length + 3}ch`}
                px={[0, 0, 0, 2]}
                fontSize={[10, 13, 14]}
				fontWeight='normal'
				value={name}
				onChange={handleChange}
				onBlur={handleBlur}
				onKeyDown={handleKeyPress}
			/>
		);
	}

	return (
		<Text
			px={[0, 0, 0, 2]}
			fontSize={[10, 13, 14]}
			overflow='hidden'
			textOverflow='ellipsis'
			onDoubleClick={onStartEdit}
		>
			{initialName}
		</Text>
	);
};

export default EditablePageName;
