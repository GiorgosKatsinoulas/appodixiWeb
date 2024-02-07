import { Container, Box, Paragraph, Button } from '../styles/styledComponents';

import { useNavigate } from 'react-router-dom';

const FlowChooser: React.FC = () => {
  const navigation = useNavigate();

  function goToHome() {
    navigation('/home');
  }

  function goToZustandHome() {
    navigation('/homeZustand');
  }

  return (
    <>
      <Container>
        <Paragraph></Paragraph>
        <Box>
          <Button onClick={goToHome}>Normal Flow</Button>
          <Button onClick={goToZustandHome}>Zustand Flow</Button>
        </Box>
      </Container>
    </>
  );
};

export default FlowChooser;
