
export interface IAPiKeyUsage {
  date: string;
  count: number
}


export interface IApiKeyUser {
  _id: number;
  apiKey: string;
  username: string;
  usage: IAPiKeyUsage[];
  maxRequest: number;
};
