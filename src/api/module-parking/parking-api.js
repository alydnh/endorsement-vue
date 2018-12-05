import _ from 'lodash';
import ApiManager from '../ApiManager';

const apiManager = ApiManager.getApiHost(serverApiConfig.parking, 'v1', {
    headers: {
        'Ocp-Apim-Subscription-Key': '95dbf455e50b40bdb64dbbc0401aee57',
    },
});

export default class CarInfoApi {
    static asyncOperationLots = async (expression, operation) =>
        apiManager.post('/lots', {
            expression,
            operation,
        });

    static asyncGetLots = async expression => {
        const params = {};

        if (!_.isEmpty(expression)) {
            params.expression = expression;
        }

        return apiManager.get('/lots', params);
    };

    static asyncBindParkingPosition = async (
        VID,
        lots,
        previousVID,
        previousLots,
    ) =>
        apiManager.post(
            '/lots/bind',
            {
                VID,
                lots,
            },
            {
                params: {
                    previousVID,
                    previousLots,
                },
            },
        );

    static asyncFetchCarsList = async (status, vIds) => {
        const vIdQueryString = _.reduce(
            vIds,
            (result, value) => `${result}&vids=${value}`,
            '',
        );

        return apiManager.get(`/cars?status=${status}${vIdQueryString}`);
    };
}
