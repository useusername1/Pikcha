import {
  CustomButton,
  GrayButton,
  NoneButton,
  VioletButton,
  WhiteButton,
} from "./styled";
import { ButtonProps } from "./types";

const Button = ({
  width,
  height,
  fontsize,
  hovercolor,
  text,
  type,
  onClick,
  margin,
  backgroundColor,
  hoverBackgroundColor,
  borderRadius,
  border,
  color,
}: ButtonProps) => {
  return (
    <>
      {type === "violet" ? (
        <VioletButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          borderRadius={borderRadius}
        >
          {text}
        </VioletButton>
      ) : (
        <></>
      )}
      {type === "white" ? (
        <WhiteButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          border={border}
        >
          {text}
        </WhiteButton>
      ) : (
        <></>
      )}
      {type === "gray" ? (
        <GrayButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          disabled
        >
          {text}
        </GrayButton>
      ) : (
        <></>
      )}
      {type === "none" ? (
        <NoneButton
          width={width}
          height={height}
          fontsize={fontsize}
          onClick={onClick}
          margin={margin}
        >
          {text}
        </NoneButton>
      ) : (
        <></>
      )}
      {type === "enabledGray" ? (
        <GrayButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
        >
          {text}
        </GrayButton>
      ) : (
        <></>
      )}
      {type === "custom" ? (
        <CustomButton
          width={width}
          height={height}
          fontsize={fontsize}
          color={color}
          hovercolor={hovercolor}
          backgroundColor={backgroundColor}
          onClick={onClick}
          margin={margin}
          hoverBackgroundColor={hoverBackgroundColor}
          borderRadius={borderRadius}
        >
          {text}
        </CustomButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Button;
