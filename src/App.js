import styled from 'styled-components';

import RotationDisplay from './components/RotationDisplay';
import Cube from './components/Cube';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Account from './components/Account';
import AboutUs from './components/AboutUs';
import Blog from './components/Blog';
import Customs from './components/Customs';

import './App.css';

function App() {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const cubeSize = Math.min(window.innerWidth, window.innerHeight) * (isMobile ? 0.7 : 0.6);

  return (
    <StyledMain>
      <RotationDisplay perspective={cubeSize * 2}>
        <Cube
          side={cubeSize}
          faces={[
            (<Home></Home>),
            (<Contacts></Contacts>),
            (<Account></Account>),
            (<AboutUs></AboutUs>),
            (<Blog></Blog>),
            (<Customs></Customs>),
          ]}
        />
      </RotationDisplay>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

export default App;
