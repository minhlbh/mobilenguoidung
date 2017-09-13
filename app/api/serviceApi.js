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
    },
    uploadImg(){
        var data = new FormData();
        data.append('picture', {uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg'});

        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
         },
         body: data,
        }

        fetch(apiUrl.uploadImg, config)
         .then((response) => response.json()).catch((e) => {
            alert(e)
        })
    }
}

export default serviceApi ;