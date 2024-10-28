import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import CustomText from "./CustomText";
import invertColor from "../../utils/colorUtils";

const Cover = React.forwardRef(function Cover(props, ref) {
  const invertedTextColor = invertColor(props.bgColor, true);
  const titleProps = {
    whiteSpace: "pre-line",
    fontFamily: "playpen",
    fontWeight: "black",
    fontSize: 'clamp(1rem, 2.5cqw, 3rem)',
    textAlign: "center",
  };
  const subtitleProps = {
    whiteSpace: "pre-line",
    fontFamily: "playpen",
    fontWeight: "regular",
    fontSize: 'clamp(0.75rem, 1.5cqw, 2.5rem)',
    textAlign: "left",
  };

  const titleAudio = props.audios ? props.audios.title : null;
  const subtitleAudio = props.audios ? props.audios.subtitle : null;
  return (
    <Flex
      ref={ref}
      data-density="hard"
      align="center"
      w="100%"
      h="100%"
      border="solid 20px"
      borderColor={props.bgColor}
      roundedEnd={8}
      boxShadow="10px 10px 20px 10px rgba(0,0,0,0.2)"
    >
      <Flex
        align="center"
        w="100%"
        h="100%"
        bg={props.bgColor}
        boxShadow="inset 10px 10px 5px 0 rgba(0,0,0,0.2), inset -10px -10px 5px 0 rgba(0,0,0,0.2)"
        p={[8, 10, 10, 12, 12, 14]}
      >
        <Flex
          rounded="20px"
          px={[8, 10, 10, 12, 12, 14]}
          border={
            invertedTextColor === "#FFFFFF"
              ? "3px solid #FFD700"
              : "3px solid rgba(0,0,0,0.5)"
          }
          w="100%"
          h="100%"
          direction="column"
          align="center"
          justify="space-evenly"
          textAlign="center"
          textColor={invertedTextColor}
        >
          <CustomText
            textAudio={titleAudio}
            textProps={titleProps}
            text={props.title}
          />

          {props.image && (
            <Image
              rounded="10px"
              src={props.image}
              w="60%"
              fallbackSrc="no-image.png"
            />
          )}
          <CustomText
            textAudio={subtitleAudio}
            textProps={subtitleProps}
            text={props.subtitle}
          />

          {props.children}
        </Flex>
      </Flex>
    </Flex>
  );
});

export default Cover;
