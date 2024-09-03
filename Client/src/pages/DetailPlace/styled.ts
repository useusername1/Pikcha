import styled from "styled-components";

export const ImageBox = styled.div`
  width: 100%;
  height: 300px;
  > img {
    max-height: 300px;
    width: 100%;
    object-fit: cover;
  }
  &:after {
    height: 300px;
    position: absolute;
    left: 0;
    top: 100px;
    right: 0;
    bottom: 0;
    content: "";
    mix-blend-mode: normal;
    opacity: 0.2;
  }
`;
export const Container = styled.div`
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
  margin: 0 auto;
  color: var(--black-900);
  > hr {
    width: 300px;
    background: var(--purple-400);
    height: 100px;
    transition: left 0.3s ease;
  }
  > h2 {
    font-size: 26px;
    margin: 77px auto 30px;
    display: block;
    text-align: center;
    letter-spacing: 0.05rem;
  }
  > p {
    width: 60%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 15px;
    letter-spacing: 0.05rem;
    line-height: 1.4rem;
    word-spacing: 0.05rem;
  }
  > h3 {
    margin: 50px 0 0 0;
    text-align: center;
    font-size: 22px;
  }
  .mark-icon {
    margin: 1px 5px 0 0;
    fill: var(--purple-300);
    opacity: 0.8;
    width: 15px;
    height: 15px;
  }
`;
export const NavBar = styled.div`
  display: flex;
  padding: 0 25%;
  height: 120px;
  background-color: white;
  .active {
    color: var(--purple-400);
    font-weight: bold;
    border-bottom: 1px solid var(--purple-400);
  }
  > button {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex: 1 1 auto;
    background-color: white;
    width: 300px;
    padding-bottom: 23px;
    border: none;
    font-size: var(--font-base);
    font-weight: var(--fw-bold);
    letter-spacing: 0.05rem;
    color: var(--black-680);
    border-bottom: 1px solid var(--black-275);
    transition: all 0.2s ease;
    cursor: pointer;
    :hover {
      color: var(--purple-300);
    }
  }
`;

export const Post = styled.div`
  background: #f8f9fa;
  width: 85%;
  margin: 0 auto;
  padding: 100px 0 60px 0;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin: 0 auto;
  width: 85%;
  > h2 {
    width: 300px;
    font-size: var(--font-xl);
    white-space: nowrap;
    color: var(--black-800);
    /* margin-right: 5%; */
  }
  > button {
    margin-left: 60%;
    border-radius: var(--br-m);
    font-size: var(--font-sm);
    border: none;
    font-weight: var(--fw-bold);
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
    color: var(--black-800);
    opacity: 0.7;
    transition: all 0.3s ease;
    :hover {
      background-color: #9f9f9f;
      color: white;
    }
  }
`;

export const LocationInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
  letter-spacing: 0.03rem;
  * {
    box-sizing: content-box !important;
  }
  h3 {
    display: flex;
    justify-content: center;
    font-size: var(--font-lg);
    padding-top: 30px;
  }
  p {
    display: flex;
    justify-content: center;
    margin: 20px 0 30px 0;
    color: var(--black-800);
    word-spacing: 0.05rem;
    font-size: 15px;
  }
`;

export const PostCardListWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const PostWrapper = styled.div`
  width: 100%;
  background-color: #f8f9fa;
`;
