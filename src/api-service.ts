import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

type FetchProps = {
  path?: string,
  option?: AxiosRequestConfig,
  cacheLimit?: number,
}
/**
 * https://zenn.dev/morinokami/books/learning-patterns-1/viewer/singleton-pattern
 * ApiServiceクラスはリクエストが進行中かどうかを追跡し、他のコンポーネントが同時にデータを要求した場合でも再リクエストを行わず、同じプロミスを返却します。
 * これにより、複数のコンポーネントが同時にデータを要求しても、APIリクエストは一度だけ行われます。
 * @example
 * import ApiService from '~src/util/api-service';
 * const response = ApiService.fetch({ path: API_PATH, option: { any } })
 * @author Godzilla
*/
class ApiService {
  private static instance: ApiService;
  private static responses: { [key: string]: AxiosResponse } = {};
  private static isFetching: { [key: string]: boolean } = {};
  private static fetchPromises: { [key: string]: Promise<AxiosResponse> } = {};

  // シングルトンパターンを使用して唯一のインスタンスを取得
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = Object.freeze(new ApiService());
    }
    return ApiService.instance;
  }

  /**
   * データを取得するメソッド
   * @param { FetchProps } params リクエストのパスやオプションをセットする
   * @returns { Promise<AxiosResponse> } apiリクエスト先からのレスポンス
  */
  public async fetch(params: FetchProps = {}): Promise<AxiosResponse> {
    const props = Object.assign({ path: '', option: {}, cacheLimit: 999 }, params)
    const { path, option, cacheLimit } = props;
    const cache = path + JSON.stringify(option);

    // キャッシュのリミット超えた場合に、古い順から削除していく
    if (Object.keys(ApiService.responses).length > cacheLimit) {
      const key = Object.keys(ApiService.responses)[0];
      delete ApiService.responses[key];
      delete ApiService.fetchPromises[key];
      delete ApiService.isFetching[key];
    }

    // 既にレスポンスが返却済みであれば、再リクエストせずレスポンスを返す
    if (ApiService.responses[cache]) return ApiService.responses[cache];

    // リクエスト中であれば、待つ
    if (ApiService.isFetching[cache] && await ApiService.fetchPromises[cache]) return ApiService.fetchPromises[cache];

    ApiService.isFetching[cache] = true;
    ApiService.fetchPromises[cache] = axios.get(path, option)
      .then(response => {
        ApiService.responses[cache] = response;
        ApiService.isFetching[cache] = false;
        return response;
      })
      .catch(error => {
        ApiService.isFetching[cache] = false;
        throw new Error('API request failed');
      });

    return ApiService.fetchPromises[cache];
  }
}
export default ApiService.getInstance();