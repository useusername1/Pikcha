import styled from "styled-components";

const DividerLine = styled.hr<{
  width?: string;
  margin?: string;
  color?: string;
}>`
  width: ${(props) => (props.width ? props.width : "98%")};
  margin: ${(props) =>
    props.margin ? `${props.margin} 0 5px 0` : "0 0 var(--sb-padding) 0"};
  border: ${(props) =>
    props.color
      ? `0.5px solid ${props.color}`
      : "0.5px solid var(--black-300)"};
  text-align: center;
  transform: translateX(1%);
`;

export { DividerLine };
