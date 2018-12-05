import ApiManager from '../ApiManager';

const apiManager = ApiManager.getApiHost(serverApiConfig.resource, 'v1', {
    headers: {
        'Ocp-Apim-Subscription-Key': 'ad91c2f95eab4af7aa1efe4adb9a6e60',
    },
});

export default class ResourceApi {
    static createOneResource = (param, options) => apiManager.post('/', param, options);

    static commitOneResouce = (uid, param, options) => apiManager.post(`/${uid}`, param, options);

    static putResource = (path, param, options) => apiManager.put(`/${path}`, param, options);

    static putLabels = (uid, param, options) => apiManager.put(`/${uid}/labels`, param, options);

    static getResourceDetail = (uid, options) => apiManager.get(`/${uid}`, '', options);

    static queryResourceByKey = (path, param, options) => apiManager.get(`/query/${path}`, param, options);

    static queryResourceContent = (uid, dataName, param, options) =>
        apiManager.get(`/${uid}/${dataName}`, param, options);

    static deleteResource = (uid, options) => apiManager.delete(`/${uid}`, '', options);
    static deleteDataName = (uid, dataName, param, options) => apiManager.delete(`/${uid}/${dataName}`, param, options);
    static getKey = (param, options) => apiManager.get(`/keys${param}`, '', options);

    static setKey = (param, options) => apiManager.post('/keys', param, options);

    static fetchDownloadFileUrl = (uid, dataName) => `${serverApiConfig.resource}/v1/${uid}/${dataName}`;

    static downloadFile = (uid, dataName) => apiManager.get(`/${uid}/${dataName}`, {}, { responseType: 'blob', fileName: dataName });
}
