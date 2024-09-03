import styled from "styled-components";

export const UsernameDiv = styled.div`
  font-size: var(--font-xs);
  color: var(--black-800);
  height: 30%;
  font-weight: var(--fw-medium);
  margin-bottom: 2px;
`;

export const ChatProfileWrapper = styled.div<{ showProfile: boolean }>`
  width: 35px;
  height: ${(props) => (props.showProfile ? "100%" : "0")};
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
