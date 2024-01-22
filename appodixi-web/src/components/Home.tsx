import { useNavigate } from 'react-router-dom';
import AadeImg from '../assets/AadeGR.png';
import {
  Container,
  Header,
  HeaderImage,
  Box,
  Paragraph,
  Input,
  Button,
} from './styles/styledComponents';

const Home = () => {
  return (
    <>
      <Container>
        <Header>
          <HeaderImage src={AadeImg} alt="Aade header image" />
        </Header>
        <Box>
          <Paragraph>Enter the receipt URL!</Paragraph>
          <Input />
          <Button>check!</Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
