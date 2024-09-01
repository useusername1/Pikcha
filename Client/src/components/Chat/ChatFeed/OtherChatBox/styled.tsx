import styled from "styled-components";

const UsernameDiv = styled.div`
  font-size: var(--font-xs);
  color: var(--black-800);
  height: 30%;
  font-weight: var(--fw-medium);
  margin-bottom: 2px;
`;

const ChatProfileWrapper = styled.div<{ showProfile: boolean }>`
  width: 35px;
  height: ${(props) => (props.showProfile ? "100%" : "0")};
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export { UsernameDiv, ChatProfileWrapper };
