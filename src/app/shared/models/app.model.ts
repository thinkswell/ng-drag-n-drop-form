export interface FORM_FIELD {
  type: string;
  placeholder: string;
  label: string;
  value?: string | number;
}

export interface FORM_CONFIG_HISTORY {
  count: number;
  current: number;
  formConfigs: Array<FORM_CONFIG>;
}

export interface FORM_CONFIG {
  createdAt: string;
  elements: Array<FORM_FIELD>;
}

export enum FORM_FIELD_TYPES {
  EMAIL = 'email',
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
}
