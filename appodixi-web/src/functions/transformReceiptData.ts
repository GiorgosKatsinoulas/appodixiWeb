import { ReceiptData, FinalReceiptData } from '../typescript/interfacesTs';

export function transformReceiptData(
  receiptData: ReceiptData
): FinalReceiptData | null {
  const firstEntry = receiptData.Ese_Esi_Ex[0];

  if (firstEntry) {
    return {
      value: firstEntry.finalSum,
      address: firstEntry.eponymia,
      companyName: firstEntry.eafdss_Address,
      statusReceipt: firstEntry.statusReceipt,
      vat: firstEntry.issuer_Afm,
    };
  }

  // Return null or handle the case when there is no entry
  return null;
}
