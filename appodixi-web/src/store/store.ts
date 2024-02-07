import { create } from 'zustand';
import { ReceiptSlice, createReceiptSlice } from '../slices/receiptSlice';

const useStore = create<ReceiptSlice>()((...a) => ({
  ...createReceiptSlice(...a),
}));

export default useStore;
