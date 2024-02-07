import { useQuery } from '@tanstack/react-query';
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
import { fetchReceiptData } from '../request/http';
import { ParsedAadeUrl, parseAadeUrl } from '../functions/parseURL';
import { isValidURL } from '../functions/validation';
import { useNavigate } from 'react-router-dom';
import { ReceiptURLData } from '../typescript/interfacesTs';

const Home: React.FC = () => {
  const navigation = useNavigate();
  const [receiptURL, setReceiptURL] = useState<ReceiptURLData>({
    codeFHM: '',
    receiptAA: '',
    digitalSign: '',
  });
  const [userUrl, setUserUrl] = useState<string>('');
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const isUrlValid = isValidURL(userUrl);
  const urlValidation = !isUrlValid && userUrl.length > 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['receipt', { search: receiptURL }],
    queryFn: ({ signal }) => fetchReceiptData({ signal, receiptURL }),
    enabled: isFetchingData,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle input changes and update state
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
      setIsFetchingData((prevValue) => !prevValue);
    } else {
      console.error('Failed to parse URL');
    }
  }

  useEffect(() => {
    if (data) {
      // console.log('data', data);
      navigation('/results', { state: data });
    }
  }, [data, navigation]);

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

export default Home;
