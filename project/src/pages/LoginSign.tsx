import styled from 'styled-components';
import Login from '../components/Login';
// import GoogleLogIn from '../components/GoogleLogin';


const Header = styled.div`
  width: 100%;
  background-color: pink;
  height: 157px;
`;

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
`;

const Footer = styled.div`
  width: 100%;
  background-color: skyblue;
  height: 157px;
`;



function LoginSign() {


  
  return (
    <>
    <Header>header헤더</Header>
    <Body> 
      <Login />
    </Body>
    <Footer>footer</Footer>
    </>
  );
}

export default LoginSign;
