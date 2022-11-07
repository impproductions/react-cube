import Stage from './components/cube/Stage';

import './App.css';
import styled from 'styled-components';

const StyledMain = styled.main`
display: flex;
height: 100vh;
width: 100vw;
align-items: center;
justify-content: center;
background-color: white;
`

function App() {
  return (
    <StyledMain>
      <Stage></Stage>
    </StyledMain>
  );
}

export default App;
