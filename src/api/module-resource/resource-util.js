import ResourceApi from './resource-api';

export default class ResourceUtil {
    static createOneResource = param => ResourceApi.createOneResource(param);
    static commitOneResouce = (uid, param, options) => ResourceApi.commitOneResouce(uid, param, options);

    static putResource = (dataName, data, type, uid, operationToken, refreshToken = true) => {
        const formdata = new FormData();

        formdata.append('dataName', dataName);
        formdata.append('data', data);
        formdata.append('refreshToken', refreshToken);
        formdata.append('dataContentType', `application/${type}`);

        return ResourceApi.putResource(uid, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                operationToken,
            },
        });
    };

    static putLabels = (uid, param) => ResourceApi.putLabels(uid, param);

    static getResourceDetail = uid => ResourceApi.getResourceDetail(uid);

    static queryResourceByKey = (dataName, param) => ResourceApi.queryResourceByKey(dataName, param);

    static queryResourceContent = (uid, dataName, param) => ResourceApi.queryResourceContent(uid, dataName, param);

    static deleteResource = (uid, operationToken) =>
        ResourceApi.deleteResource(uid, {
            headers: {
                operationToken,
            },
        });

    static deleteDataName = (uid, dataName, param, operationToken) =>
        ResourceApi.deleteDataName(uid, dataName, param, {
            headers: {
                operationToken,
            },
        });

    static getKey = keys => ResourceApi.getKey(keys);

    static setKey = (keys, value) =>
        ResourceApi.setKey({
            keys,
            value,
        });

    static putJsonResource = (dataName, data, uid, operationToken, refreshToken = true) =>
        ResourceUtil.putResource(dataName, JSON.stringify(data), 'json', uid, operationToken, refreshToken);

    static downloadFile = (uid, dataName) => ResourceApi.downloadFile(uid, dataName);
}
