import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import CustomText from './CustomText';
import invertColor from '../../utils/colorUtils';

const Page = React.forwardRef(function Page(props, ref) {
	const titleAudio = props.audios.title;
	const subtitleAudio = props.audios.subtitle;

	const firstImageSrc = props.images.first;
	const secondImageSrc = props.images.second;

	const textColor = invertColor(props.bgColor, true);

	const titleProps = {
		whiteSpace: 'pre-line',
		fontFamily: 'playpen',
		fontWeight: 'black',
		textAlign: 'center',
	};
	const subtitleProps = {
		whiteSpace: 'pre-line',
		fontFamily: 'playpen',
		fontWeight: 'regular',
		textAlign: 'left',
	};

	const templates = {
		titleSubtitle: (
			<>
				<CustomText textAudio={titleAudio} textProps={titleProps} text={props.title} />
				<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
			</>
		),

		textOnly: (
			<>
				<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
			</>
		),

		titleImageText: (
			<>
				<CustomText textAudio={titleAudio} textProps={titleProps} text={props.title} />
				<Flex gap={5} align='center'>
					<Image
						src={firstImageSrc}
						w='40%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(-2deg)' }}
					/>
					<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
				</Flex>
			</>
		),

		titleTextImage: (
			<>
				<CustomText textAudio={titleAudio} textProps={titleProps} text={props.title} />
				<Flex gap={5} align='center'>
					<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
					<Image
						src={firstImageSrc}
						w={['20%', '20%', '20%', '20%', '40%']}
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(2deg)' }}
					/>
				</Flex>
			</>
		),

		text2Images: (
			<>
				<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
				<Flex gap={5} align='center' w='100%' justify='center'>
					<Image
						src={firstImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(-2deg)' }}
					/>
					<Image
						src={secondImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(2deg)' }}
					/>
				</Flex>
			</>
		),

		textImage: (
			<>
				<CustomText textAudio={titleAudio} textProps={titleProps} text={props.title} />

				<Flex gap={5} align='center' w='100%' justify='center'>
					<Image
						src={firstImageSrc}
						w='90%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(1.5deg)' }}
					/>
				</Flex>
			</>
		),
		imageText: (
			<>
				<Flex gap={5} align='center' w='100%' justify='center'>
					<Image
						src={firstImageSrc}
						w='90%'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(-1.5deg)' }}
					/>
				</Flex>
				<CustomText textAudio={titleAudio} textProps={titleProps} text={props.title} />
			</>
		),
		imageOnly: (
			<>
				<Image
					src={firstImageSrc}
					w='100%'
					h='100%'
					fit='contain'
					rounded='5px'
					fallbackSrc='no-image.png'
					transition='all 200ms'
					_hover={{ transform: 'rotate(-1.5deg)' }}
				/>
			</>
		),
		twoImages: (
			<>
				<Flex gap={5} align='center' w='100%' justify='center'>
					<Image
						src={firstImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(-2deg)' }}
					/>
					<Image
						src={secondImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(2deg)' }}
					/>
				</Flex>
			</>
		),
		leftTextRightImage: (
			<>
				<Flex gap={5} align='center' w='100%' justify='center'>
					<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
					<Image
						src={firstImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(2deg)' }}
					/>
				</Flex>
			</>
		),
		leftImageRightText: (
			<>
				<Flex gap={5} align='center' w='100%' justify='center'>
					<Image
						src={firstImageSrc}
						w='50%'
						h='100%'
						fit='contain'
						rounded='5px'
						fallbackSrc='no-image.png'
						transition='all 200ms'
						_hover={{ transform: 'rotate(-2deg)' }}
					/>
					<CustomText textAudio={subtitleAudio} textProps={subtitleProps} text={props.subtitle} />
				</Flex>
			</>
		),
	};

	return (
		<Flex
			ref={ref}
			data-density='soft'
			bgColor={props.bgColor}
			rounded={5}
			boxShadow='inset 0 0 30px 0 rgba(36, 10, 3, .4), 0 0 20px 5px rgba(36, 10, 3, .3);'
			border='1px solid rgba(36, 10, 3, .3)'
		>
			<Flex h='100%' w='100%' justify='center' align='center'>
				<Flex
					h='100%'
					w='100%'
					direction='column'
					gap={[2, 4, 6, 8, 10, 12]}
					align='center'
					justify='space-evenly'
					p={[5, 8, 10, 12, 14, 16]}
					color={textColor}
				>
					{templates[props.template]}
				</Flex>
			</Flex>
		</Flex>
	);
});

export default Page;
