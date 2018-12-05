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
                if (
                    !_.isEmpty(res.config) &&
                    res.config.responseType === 'blob'
                ) {
                    this._downloadFile(
                        res.data,
                        res.config.fileName,
                        res.headers['content-type'],
                    );
                    return {};
                }

                return res.data;
            })
            .catch(error => {
                const message = _.defaultTo(error.response.data, error.message);
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

    _downloadFile(data, fileName, mime) {
        const blob = new Blob([data], {
            type: mime || 'application/octet-stream',
        });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were
            // revoked by closing the blob for which they were created.
            // These URLs will no longer resolve as the data backing
            // the URL has been freed."
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            const blobURL = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobURL;
            tempLink.setAttribute('download', fileName);

            // Safari thinks _blank anchor are pop ups. We only want to set _blank
            // target if the browser does not support the HTML5 download attribute.
            // This allows you to download files in desktop safari if pop up blocking
            // is enabled.
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
