import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormImageContainer,
  Input,
  Paragraph,
  ResponsiveImage,
} from '../styles/styledComponents';
import Select from 'react-select';
import { COLORS } from '../styles/colors';
import useStore from '../store/store';
import { useRequest } from '../hooks/useRequest';
import { FormData as FormInterface } from '../typescript/interfacesTs';
import { postFrom } from '../request/http';
import { useNavigate } from 'react-router-dom';

const ReportPageZustand = () => {
  const navigation = useNavigate();
  const processedReceipt = useStore((state) => state.receipt);
  const [file, setFile] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [didEdit, setDidEdit] = useState({
    reason: false,
    comments: false,
    vat: processedReceipt?.vat ? true : false,
    street: false,
    city: false,
    region: false,
    image: false,
  });
  const [formDataEmptyFields, setFormDataEmptyFields] = useState(false);
  const [fetchData, setFetchData] = useState(false); // Track if data fetching should occur
  let formValues: FormInterface = {
    reason: '',
    comments: '',
    vat: '',
    street: '',
    city: '',
    region: '',
    image: '',
  };
  const { requestData: postResponse, isRequesting: isLoading } = useRequest(
    postFrom,
    formValues,
    fetchData // Pass fetchData to the hook dependency array
  );
  const reasonOptions = [
    { value: 'date', label: 'date' },
    { value: 'number receipt', label: 'number' },
    { value: 'value receipt', label: 'value' },
    { value: 'address company', label: 'address' },
  ];

  //@ts-ignore
  function handleChangeImage(e) {
    const selectedFile = e.target.files[0];

    // Perform validation if needed
    if (selectedFile) {
      // For example, you can check the file type
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Create a FileReader object
      const reader = new FileReader();

      // Set up the FileReader onload event
      reader.onload = () => {
        // Access the base64 representation of the image
        const base64Image = reader.result;
        // Do something with the base64Image, for example, set it to state
        if (base64Image) {
          setImageBase64(base64Image.toString());
        }
      };
      reader.readAsDataURL(selectedFile);

      // Set the file to state
      setFile(URL.createObjectURL(selectedFile));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formIsFilled =
      !file ||
      !formValues.reason ||
      !formValues.comments ||
      !formValues.street ||
      !formValues.city ||
      !formValues.region ||
      !imageBase64;

    if (formIsFilled) {
      // Update didEdit state to indicate that these fields have been edited
      setDidEdit({
        ...didEdit,
        reason: true,
        comments: true,
        street: true,
        city: true,
        region: true,
        image: true,
      });

      // Update formDataEmptyFields state to indicate that these fields are empty
      setFormDataEmptyFields((prev) => !prev);
      // Return to prevent form submission
      alert('Please fill in all fields before submitting.');
      return;
    }

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formValues = {
      reason: formData.get('reason') as string,
      comments: formData.get('comments') as string,
      vat: (formData.get('vat') ?? processedReceipt?.vat) as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      region: formData.get('region') as string,
      image: imageBase64,
    };

    // Optionally, you can access individual form values like this:
    // console.log('User reason:', formValues.reason);
    // etc..
    setFetchData((prev) => !prev);
    formRef.current.reset();
  };

  useEffect(() => {
    if (postResponse?.status === 200 && !isLoading) {
      setFetchData((prev) => !prev);
      navigation('/');
    }
  }, [postResponse, navigation, isLoading]);

  return (
    <>
      <Container>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box>
            <Paragraph>Report Form</Paragraph>
            <FormImageContainer>
              <Paragraph>Image:</Paragraph>
              {file && <ResponsiveImage src={file} alt="Selected" />}
              <Input
                emptied={false}
                style={{ border: 1 }}
                name="file"
                type="file"
                onChange={handleChangeImage}
                accept="image/*"
              />
            </FormImageContainer>
            <Paragraph>Reason:</Paragraph>
            <Select
              menuPosition="fixed"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: '36vh',
                  marginBottom: 20,
                  borderColor:
                    didEdit.reason && formDataEmptyFields
                      ? COLORS.AADE_RED
                      : COLORS.AADE_DARK_BLUE,
                  borderRadius: 12,
                }),
              }}
              name="reason"
              placeholder={'Select reason'}
              options={reasonOptions}
            />
            <Input
              style={{ height: '08vh' }}
              type="text"
              name="comments"
              emptied={didEdit.comments && formDataEmptyFields}
              placeholder="Comments"
            />
            <Input
              type="text"
              name="vat"
              emptied={didEdit.vat && formDataEmptyFields}
              value={processedReceipt?.vat ?? ''}
              disabled={processedReceipt?.vat !== undefined}
              placeholder="VAT"
            />
            <Paragraph>Address:</Paragraph>
            <Input
              type="text"
              name="street"
              emptied={didEdit.street && formDataEmptyFields}
              placeholder="Street"
            />
            <Input
              type="text"
              name="city"
              emptied={didEdit.city && formDataEmptyFields}
              placeholder="City"
            />
            <Input
              type="text"
              name="region"
              emptied={didEdit.region && formDataEmptyFields}
              placeholder="Region"
            />
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ReportPageZustand;
