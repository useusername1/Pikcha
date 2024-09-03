import * as S from "./styled";
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
        <S.VioletButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          borderRadius={borderRadius}
        >
          {text}
        </S.VioletButton>
      ) : (
        <></>
      )}
      {type === "white" ? (
        <S.WhiteButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          border={border}
        >
          {text}
        </S.WhiteButton>
      ) : (
        <></>
      )}
      {type === "gray" ? (
        <S.GrayButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
          disabled
        >
          {text}
        </S.GrayButton>
      ) : (
        <></>
      )}
      {type === "none" ? (
        <S.NoneButton
          width={width}
          height={height}
          fontsize={fontsize}
          onClick={onClick}
          margin={margin}
        >
          {text}
        </S.NoneButton>
      ) : (
        <></>
      )}
      {type === "enabledGray" ? (
        <S.GrayButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
          margin={margin}
        >
          {text}
        </S.GrayButton>
      ) : (
        <></>
      )}
      {type === "custom" ? (
        <S.CustomButton
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
        </S.CustomButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Button;
