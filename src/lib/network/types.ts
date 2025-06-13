export type CommonResponse<T = unknown> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type POST_ADMIN_ADD_REQUEST_TYPE = {
  id: string;
  identification: string;
  name: string;
  team: string;
  email: string;
};

export type POST_ADMIN_PASSWORD_CHANGE_REQUEST_TYPE = {
  pw: string;
  newPw: string;
  newPwCheck: string;
};

export type GET_DATA_SEND_REQUEST_TYPE = {
  startDate: string;
  endDate: string;
  addCycle: string;
  addState: string;
  searchType: string;
  searchKeyword: string;
};

export type GET_DATA_SEND_DETAIL_REQUEST_TYPE = {
  dataName: string;
  addCycle: string;
  service: string;
  fileList: string[];
};

export type GET_DATA_NAME_REQUEST_TYPE = {
  dataName: string;
};
