import _ from 'lodash';
import ApiManager from '../ApiManager';

const apiManager = ApiManager.getApiHost(serverApiConfig.cars, '', {
    headers: {
        'Ocp-Apim-Subscription-Key': '95dbf455e50b40bdb64dbbc0401aee57',
    },
});

export default class CarInfoApi {
    static fetchCars = cars => {
        const path = `cars?${_.reduce(
            cars,
            (m, v) => `${m}&code=${v}`,
            '',
        ).substring(1)}`;

        return apiManager.get(path, '');
    };

    static saveCars = (cars, note) =>
        apiManager.post('cars', {
            cars,
            note,
        });

    static deleteCars = cars =>
        apiManager.delete('cars', {
            code: cars,
        });
    static getCarsAndReceiptList = (keyword, returnType, types) =>
        apiManager.get('cars/list', {
            keyword,
            returnType,
            types,
        });

    static fetchCarsForLots = status => apiManager.get('cars/lots', { status });
}
