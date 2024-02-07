import { useNavigate } from 'react-router-dom';
import { Button, Container, Paragraph, Box } from '../styles/styledComponents';
import useStore from '../store/store';

const ResultsZustand = () => {
  const navigation = useNavigate();
  const receipt = useStore((state) => state.receipt);
  // console.log('receipt', receipt);
  return (
    <>
      <Container>
        <Box>
          {receipt !== null ? (
            <>
              <Paragraph>Receipt details</Paragraph>
              <Paragraph>Value : {receipt.value}</Paragraph>
              <Paragraph>Name : {receipt.companyName}</Paragraph>
              <Paragraph>Address : {receipt.address}</Paragraph>
              <Paragraph>Vat : {receipt.vat}</Paragraph>
              <Paragraph>Status : {receipt.statusReceipt}</Paragraph>
              <Button onClick={() => navigation('/reportZustand')}>
                Report
              </Button>
              <Button onClick={() => navigation('/')}>Check again</Button>
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default ResultsZustand;
