import styled from 'styled-components';

import RotationDisplay from './components/RotationDisplay';
import Cube from './components/Cube';
import './App.css';

const StyledMain = styled.main`
display: flex;
height: 100vh;
width: 100vw;
align-items: center;
justify-content: center;
background-color: white;
`

function App() {
  const cubeSize = 300;
  return (
    <StyledMain>
      <RotationDisplay>
        {/* <RotationDisplay size={[cubeSize * 1.8, cubeSize * 1.8]}> */}
        <Cube
          side={cubeSize}
          faces={[
            (<div>front</div>),
            (<div>back</div>),
            (<div>left</div>),
            (<div>right</div>),
            (<div>top</div>),
            (<div>bottom</div>),
          ]}
        />
      </RotationDisplay>
    </StyledMain>
  );
}

export default App;
