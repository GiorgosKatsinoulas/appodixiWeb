import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Paragraph, Box } from '../styles/styledComponents';
import { transformReceiptData } from '../functions/transformReceiptData';

const Results = () => {
  const navigation = useNavigate();

  const location = useLocation();
  const receiptData = location.state;

  const processedReceipt = transformReceiptData(receiptData);

  // console.log('processedReceipt', processedReceipt);
  return (
    <>
      <Container>
        <Box>
          {processedReceipt !== null ? (
            <>
              <Paragraph>Receipt details</Paragraph>
              <Paragraph>Value : {processedReceipt.value}</Paragraph>
              <Paragraph>Name : {processedReceipt.companyName}</Paragraph>
              <Paragraph>Address : {processedReceipt.address}</Paragraph>
              <Paragraph>Vat : {processedReceipt.vat}</Paragraph>
              <Paragraph>Status : {processedReceipt.statusReceipt}</Paragraph>
              <Button
                onClick={() =>
                  navigation('/report', { state: processedReceipt })
                }
              >
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

export default Results;
