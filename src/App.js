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

  const faces = {
    home: (<Home></Home>),
    contacts: (<Contacts></Contacts>),
    account: (<Account></Account>),
    about: (<AboutUs></AboutUs>),
    blog: (<Blog></Blog>),
    customs: (<Customs></Customs>),
}

  return (
    <StyledMain>
      <RotationDisplay perspective={cubeSize * 2} pages={Object.keys(faces)}>
        <Cube
          side={cubeSize}
          faces={Object.values(faces)}
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
