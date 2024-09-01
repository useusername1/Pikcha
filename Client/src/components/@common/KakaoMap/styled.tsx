import styled from "styled-components";

const MyPosition = styled.div`
  width: 109px;
  height: 40px;
  background-color: var(--purple-400);
  z-index: 2;
  position: absolute;
  margin: 45px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 10px;
  color: white;
  border-radius: var(--br-m);
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: rgb(77, 20, 126);
    cursor: pointer;
  }
`;

const TrafficInfo = styled.div`
  width: 109px;
  height: 40px;
  background-color: rgb(42, 41, 40);
  z-index: 2;
  position: absolute;
  margin: 90px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 10px;
  color: #f2f2f2;
  border-radius: var(--br-m);
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;
export { MyPosition, TrafficInfo };
