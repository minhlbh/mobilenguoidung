import apiUrl from '../config/api';
import postFormBody from './postFormBody';

var serviceApi = {
    getProfiles(token){
        var url = `${apiUrl.listHoSoSucKhoe}`;
        return fetch(url,{
            method: 'POST',
            headers:{
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${token}` 
            }
        }).then((response) => response.json()).catch((e) => {
            alert(e)
        })

    }
}

export default serviceApi ;