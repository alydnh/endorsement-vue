import ApiManager from './ApiManager';

const api = ApiManager.getApiHost(process.env.ENDPOINTS.i18N, 'v1', {});

export default class i18NApi {
    static async saveKeys(keys) {
        return api.post('key', keys, {});
    }

    static async getSettled() {
        return api.get('query/all/settled');
    }
}
