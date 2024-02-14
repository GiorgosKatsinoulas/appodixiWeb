import AadeImg from '../assets/AadeGR.png';
import {
  Container,
  Header,
  HeaderImage,
  Box,
  Paragraph,
  Input,
  Button,
} from '../styles/styledComponents';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchReceiptDataHook } from '../request/http';
import { ParsedAadeUrl, parseAadeUrl } from '../functions/parseURL';
import { isValidURL } from '../functions/validation';
import { useNavigate } from 'react-router-dom';
import { ReceiptURLData } from '../typescript/interfacesTs';
import useStore from '../store/store';
import { transformReceiptData } from '../functions/transformReceiptData';
import { useRequest } from '../hooks/useRequest';

const HomeZustand: React.FC = () => {
  const addReceiptData = useStore((state) => state.addReceiptData);

  const navigation = useNavigate();
  const [receiptURL, setReceiptURL] = useState<ReceiptURLData>({
    codeFHM: '',
    receiptAA: '',
    digitalSign: '',
  });

  const [userUrl, setUserUrl] = useState<string>('');
  const isUrlValid = isValidURL(userUrl);
  const urlValidation = !isUrlValid && userUrl.length > 0;
  const [fetchData, setFetchData] = useState(false); // Track if data fetching should occur

  const { requestData: data, isRequesting: isLoading } = useRequest(
    fetchReceiptDataHook,
    receiptURL,
    fetchData // Pass fetchData to the hook dependency array
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setUserUrl(value);
  };

  function getDataFromUrl() {
    const parsedAadeUrl: ParsedAadeUrl | null = isUrlValid
      ? parseAadeUrl(userUrl)
      : null;

    if (parsedAadeUrl !== null) {
      const { codeFHM, receiptAA, digitalSign } = parsedAadeUrl;
      setReceiptURL({ codeFHM, receiptAA, digitalSign });
      setFetchData((prev) => !prev); // Set fetchData to true when user clicks the button
    } else {
      alert('Wrong URL input! Try again!');
      console.error('Failed to parse URL');
    }
  }

  useEffect(() => {
    if (data) {
      console.log('data', data);
      const processedReceipt = transformReceiptData(data);
      if (processedReceipt) {
        addReceiptData(processedReceipt);
      }
      navigation('/resultsZustand');
    }
  }, [data, navigation, addReceiptData]);

  return (
    <>
      <Container>
        <Header>
          <HeaderImage src={AadeImg} alt="Aade header image" />
        </Header>
        <Box>
          {isLoading ? (
            <Paragraph>Loading....</Paragraph>
          ) : (
            <>
              <Paragraph>Enter the receipt URL!</Paragraph>
              <Input
                emptied={urlValidation}
                type="text"
                name="urlInput"
                placeholder="Enter the receipt url"
                value={userUrl}
                onChange={handleInputChange}
              />
              <Button disabled={urlValidation} onClick={getDataFromUrl}>
                check!
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default HomeZustand;
