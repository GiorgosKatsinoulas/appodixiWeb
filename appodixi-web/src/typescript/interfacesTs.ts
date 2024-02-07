export interface FinalReceiptData {
  value: number;
  address: string;
  companyName: string;
  statusReceipt: number;
  vat: string;
}

export interface EseEsiEx {
  GTotal: number;
  daily: number;
  docId: number;
  docId_Desc: string;
  docNr: number;
  eafdss: string;
  eafdss_Address: string;
  eponymia: string;
  fdateTime: string;
  finalSum: number;
  hexSign: string;
  hmera: string;
  issuer_Afm: string;
  kwd_Fuel: string;
  lastUpdate: string;
  litra_Fuel: number;
  netSum: number;
  netValA: number;
  netValB: number;
  netValC: number;
  netValD: number;
  netValE: number;
  progressive: number;
  seira: string;
  statusReceipt: number;
  vatSum: number;
  vatValA: number;
  vatValB: number;
  vatValC: number;
  vatValD: number;
  znr: number;
}

export interface EseEsiExTmp {
  // Define properties as needed based on the actual structure.
}

export interface ReceiptData {
  Ese_Esi_Ex: EseEsiEx[];
  Ese_Esi_Ex_Tmp: EseEsiExTmp[];
  is_Eafdss_Active_Today: number;
  request_Date: string;
  request_Eafdss: string;
  request_HEX40: string;
  request_Progressive: string;
}

export interface FormData {
  reason: string;
  comments: string;
  vat: string;
  street: string;
  city: string;
  region: string;
  image: string;
  [key: string]: string; // Index signature allowing indexing with a string
}

export class ReceiptURLData {
  codeFHM: string;
  receiptAA: string;
  digitalSign: string;

  constructor(FHM: string, AA: string, Sign: string) {
    this.codeFHM = FHM;
    this.receiptAA = AA;
    this.digitalSign = Sign;
  }
}
