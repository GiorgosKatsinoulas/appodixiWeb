import { StateCreator } from 'zustand';
import { FinalReceiptData } from '../typescript/interfacesTs';

export interface ReceiptSlice {
  receipt: FinalReceiptData;
  addReceiptData: (receipt: FinalReceiptData) => void;
}

export const createReceiptSlice: StateCreator<ReceiptSlice, [], []> = (
  set,
  get
) => ({
  receipt: {
    value: 0,
    address: '',
    companyName: '',
    statusReceipt: 0,
    vat: '',
  },
  addReceiptData: (receipt: FinalReceiptData) =>
    set({
      receipt: {
        value: receipt.value,
        address: receipt.address,
        companyName: receipt.companyName,
        statusReceipt: receipt.statusReceipt,
        vat: receipt.vat,
      },
    }),
});
