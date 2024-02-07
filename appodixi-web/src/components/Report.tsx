import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormImageContainer,
  Input,
  Paragraph,
  ResponsiveImage,
} from '../styles/styledComponents';
import { useLocation } from 'react-router-dom';
import { FinalReceiptData } from '../typescript/interfacesTs';
import Select from 'react-select';
import { COLORS } from '../styles/colors';
import { FormData } from '../typescript/interfacesTs';

const ReportPage = () => {
  const location = useLocation();

  const processedReceipt: FinalReceiptData | null = location.state;
  const [file, setFile] = useState('');
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

  const [formData, setFormData] = useState<FormData>({
    reason: '',
    comments: '',
    vat: processedReceipt?.vat ?? '',
    street: '',
    city: '',
    region: '',
    image: '',
  });

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
          setFormData((prevValue) => ({
            ...prevValue,
            image: base64Image.toString(),
          }));
        }
      };
      reader.readAsDataURL(selectedFile);

      // Set the file to state
      setFile(URL.createObjectURL(selectedFile));
    }
  }
  function handleInputChange(identifier: string, value: string) {
    setFormData((prevValues) => ({ ...prevValues, [identifier]: value }));
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  function handleInputBlur(identifier: string) {
    const hasValue = formData[identifier].length > 0;
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: hasValue,
    }));
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field in formData is empty
    const isFormValid = Object.values(formData).every((value) => value !== '');

    if (!isFormValid) {
      setFormDataEmptyFields((prev) => !prev);
      alert('Please fill in all fields before submitting.');
      return;
    } else {
      setFormDataEmptyFields((prev) => !prev);
    }
    // Handle form submission here
    console.log('hiii', formData);
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Box>
            <Paragraph>Report Form</Paragraph>
            <FormImageContainer>
              <Paragraph>Image:</Paragraph>
              {file && <ResponsiveImage src={file} alt="Selected" />}
              <Input
                emptied={false}
                style={{ border: 1 }}
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
                    !didEdit.reason && formDataEmptyFields
                      ? COLORS.AADE_RED
                      : COLORS.AADE_DARK_BLUE,
                  borderRadius: 12,
                }),
              }}
              placeholder={'Select reason'}
              //@ts-ignore
              defaultValue={formData.reason}
              //@ts-ignore
              onChange={(newValue: { value: string; label: string }) => {
                handleInputChange('reason', newValue?.label);
              }}
              onBlur={() => handleInputBlur('reason')}
              //@ts-ignore
              options={reasonOptions}
            />
            <Input
              style={{ height: '08vh' }}
              type="text"
              name="comments"
              emptied={!didEdit.comments && formDataEmptyFields}
              value={formData.comments}
              onChange={(event) =>
                handleInputChange('comments', event.target.value)
              }
              onBlur={() => handleInputBlur('comments')}
              placeholder="Comments"
            />
            <Input
              type="text"
              name="vat"
              emptied={!didEdit.vat && formDataEmptyFields}
              value={processedReceipt?.vat ?? formData.vat}
              disabled={processedReceipt?.vat !== undefined}
              onChange={(event) => handleInputChange('vat', event.target.value)}
              onBlur={() => handleInputBlur('vat')}
              placeholder="VAT"
            />
            <Paragraph>Address:</Paragraph>
            <Input
              type="text"
              name="street"
              emptied={!didEdit.street && formDataEmptyFields}
              value={formData.street}
              onChange={(event) =>
                handleInputChange('street', event.target.value)
              }
              onBlur={() => handleInputBlur('street')}
              placeholder="Street"
            />
            <Input
              type="text"
              name="city"
              emptied={!didEdit.city && formDataEmptyFields}
              value={formData.city}
              onChange={(event) =>
                handleInputChange('city', event.target.value)
              }
              onBlur={() => handleInputBlur('city')}
              placeholder="City"
            />
            <Input
              type="text"
              name="region"
              emptied={!didEdit.region && formDataEmptyFields}
              value={formData.region}
              onChange={(event) =>
                handleInputChange('region', event.target.value)
              }
              onBlur={() => handleInputBlur('region')}
              placeholder="Region"
            />
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ReportPage;
