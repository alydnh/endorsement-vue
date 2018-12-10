import axios from 'axios';
import _ from 'lodash';

class ApiHost {
    constructor(baseUrl, name, baseOptions) {
        this.name = name;
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            withCredentials: false,
        });
        this.baseUrl = baseUrl;
        this.baseOptions = baseOptions;
    }

    call(path, method, urlParams, bodyParams, options) {
        if (path[0] !== '/') {
            path = `/${path}`;
        }
        let configs = {
            url: `${this.baseUrl}/${this.name}${path}`,
            params: urlParams,
            method,
            data: bodyParams,
        };

        if (!_.isEmpty(options)) {
            configs = _.assign(configs, options);
        }

        configs.headers = _.assign(configs.headers, this.baseOptions.headers);

        return this.axiosInstance
            .request(configs)
            .then(res => {
                if (!_.isEmpty(res.config) && res.config.responseType === 'blob') {
                    this.downloadFile(res.data, res.config.fileName, res.headers['content-type']);
                    return {};
                }

                return res.data;
            })
            .catch(error => {
                const response = _.defaultTo(error.response, {});
                const message = _.defaultTo(response, error.message);
                throw new Error(message);
            });
    }

    get(path, urlParams, options) {
        return this.call(path, 'get', urlParams, null, options);
    }
    delete(path, urlParams, options) {
        return this.call(path, 'delete', urlParams, null, options);
    }

    post(path, bodyParams, options) {
        return this.call(path, 'post', null, bodyParams, options);
    }

    put(path, bodyParams, options) {
        return this.call(path, 'put', null, bodyParams, options);
    }

    patch(path, bodyParams, options) {
        return this.call(path, 'patch', null, bodyParams, options);
    }

    downloadFile(data, fileName, mime) {
        const blob = new Blob([data], {
            type: mime || 'application/octet-stream',
        });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            const blobURL = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobURL;
            tempLink.setAttribute('download', fileName);

            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank');
            }

            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }
    }
}

export default class {
    static getApiHost(baseUrl, name, baseOptions) {
        return new ApiHost(baseUrl, name, baseOptions);
    }
}
