type TCardHeader = {
  "Content-Type": string;
};

type TCardApi = {
  baseUrl: string;
  headers: TCardHeader;
};

class CardsApi {
  _baseUrl: string;
  _headers: TCardHeader;
  constructor({ baseUrl, headers }: TCardApi) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getInitialCards<T>(): Promise<T> {
    const res = await fetch(`${this._baseUrl}`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }
}

export const cards = new CardsApi({
  baseUrl: "https://t-pay.iqfit.app/subscribe/list-test",
  headers: {
    "Content-Type": "application/json",
  },
});
