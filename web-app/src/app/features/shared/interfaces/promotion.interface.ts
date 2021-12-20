export enum types {
  'STATUS_TYPE' = 'Ativo',
}

export interface Promotion {
  id?: number;
  name: string;
  status: string;
  start: string;
  end: string;
}
