import { ReactNode } from "react";

export type TableDownload = {
  /**
   * @default "export"
   */
  fileName?: string;
  /**
   * @default "엑셀 다운로드"
   */
  buttonLabel?: string;
  /**
   * @default "data 객체 리스트"
   */
  data?: unknown[];

  customOnClick?: () => void;
};

export type BtnAreaType = {
  primary?: ReactNode;
  secondary?: ReactNode;
};
