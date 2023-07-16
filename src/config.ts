import { IConfig } from './interfaces/Config';

const config: IConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  limit: 10,
};

export { config };
