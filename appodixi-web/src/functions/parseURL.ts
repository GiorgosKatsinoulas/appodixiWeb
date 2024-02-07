export interface ParsedAadeUrl {
  codeFHM: string;
  receiptAA: string;
  digitalSign: string;
}
// Sample
// FFG21000174  FHM
// 00023575 AA
// 6D84CEFB230D95EB5689587A02C1B78D9A99E217 digital sign
// https://www1.aade.gr/tameiakes/myweb/q1.php?SIG=FFG21000174000235756D84CEFB230D95EB5689587A02C1B78D9A99E21755.99
export const parseAadeUrl = (url: string): ParsedAadeUrl | null => {
  const regex = /SIG=(.{11})(.{8})(.{40})/;
  const match = url.match(regex);
  if (!match) {
    console.error('Invalid URL format');
    return null;
  }

  const [, codeFHM, receiptAA, digitalSign] = match;

  return {
    codeFHM,
    receiptAA,
    digitalSign,
  };
};
