import apiUrl from '../config/api';
import postFormBody from './postFormBody';

var homeApi = {
    getListDichVu() {
        var url = `${apiUrl.listDichVu}`;
        return fetch(url).then(res => res.json());
    },
}

export default homeApi;