import { Text } from "@chakra-ui/react";
import TextPlayer from "./TextPlayer";



export default function CustomText({ textAudio, textProps, text }) {
    return (
        <>
            {textAudio ? (
                <TextPlayer
                    textProps={textProps}
                    audioUrl={textAudio.url}
                    text={text}
                ></TextPlayer>
            ) : (
                <Text  {...textProps}>{text}</Text>
            )}
        </>
    )
}