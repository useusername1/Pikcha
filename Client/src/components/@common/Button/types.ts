export interface ButtonProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  fontsize?: string;
  hoverBackgroundColor?: string;
  hovercolor?: string;
  text?: string;
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
}
