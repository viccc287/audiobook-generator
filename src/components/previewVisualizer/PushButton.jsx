import { Circle, Flex, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import tinycolor from "tinycolor2";

export default function PushButton({
  nColor,
  onClick,
  icon,
  size = 75,
  props,
  displayPlate = true,
  bindedKey
}) {
  const angle = 30;
  const plateColor = "#D3D3D3";
  const plateDarkColor = tinycolor(plateColor).darken(35).toRgbString();

  const parsedColor = tinycolor(nColor);

  const rgbColor = parsedColor.toRgbString();
  const shadowColor = parsedColor.darken(1).toRgbString();
  const detailColor = parsedColor.brighten(14).toRgbString();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === bindedKey && onClick) {
        onClick();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [bindedKey, onClick]);

  const hoverActive = {
    boxShadow: `0px 5px ${shadowColor}`,
    transform: `translateY(5px) rotateX(${angle}deg)`,
    borderColor: nColor,
  };

  return (
    <Flex as="span" position="relative">
      <IconButton
        zIndex="10"
        variant="unstyled"
        boxSize={`${size}px`}
        rounded="full"
        icon={icon}
        bg={`linear-gradient(180deg, ${parsedColor.brighten(
          15
        )} 0%, ${rgbColor} 100%)`}
        color="white"
        boxShadow={`0px 10px ${shadowColor}`}
        borderBottom="5px solid"
        borderEnd="3px solid"
        borderColor={detailColor}
        transition="all 150ms"
        transform={`rotateX(${angle}deg)`}
        _hover={{
          boxShadow: `0px 12px ${shadowColor}`,
          transform: `translateY(-2px) rotateX(${angle}deg)`,
          _active: hoverActive,
        }}
        onClick={onClick}
        {...props}
      />
      {displayPlate && (
        <Circle
          pos="absolute"
          zIndex="9"
          boxSize={`${size + 10}px`}
          bgColor={plateColor}
          left="-5px"
          bottom={`-${size * 0.2}px`}
          transform={`rotateX(${angle}deg)`}
          boxShadow={`0px 10px ${plateDarkColor}, 0 -2px ${plateDarkColor} `}
        />
      )}
    </Flex>
  );
}
