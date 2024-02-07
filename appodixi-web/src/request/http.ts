import axios from 'axios';
import { ReceiptURLData } from '../typescript/interfacesTs';

const headers = {
  Accept: 'application/json',
};

function generateApiUrl({ codeFHM, receiptAA, digitalSign }: ReceiptURLData) {
  // Use the appropriate base URL based on the environment (e.g., development, production).
  // Example: For development, use 'http://localhost:3000/getData', for production, use the AADE URL.
  const baseUrl = 'http://localhost:3000/getData';
  return `${baseUrl}/${codeFHM}/${receiptAA}/${digitalSign}`;
}

export async function fetchReceiptData({
  signal,
  receiptURL,
}: {
  signal: AbortSignal;
  receiptURL: ReceiptURLData;
}) {
  const { codeFHM, receiptAA, digitalSign } = receiptURL;
  let url = generateApiUrl({ codeFHM, receiptAA, digitalSign });
  // let url = `http://localhost:3000/getData/${codeFHM}/${receiptAA}/${digitalSign}`;
  // let url = `https://appodixi.aade.gr/appodixiapps/QrCodesService/webresources/qrcode/ese_esi/${codeFHM}/${receiptAA}/${digitalSign}`;

  const response = await axios
    .get(url, { signal, headers: headers })
    .then((res) => {
      console.log('Results fetched from aade endpoint :', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log('error from aade:', error);
      return error;
    });

  return response;
}
