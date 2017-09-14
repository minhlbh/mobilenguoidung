import apiUrl from '../config/api';
import postFormBody from './postFormBody';
import RNFetchBlob from 'react-native-fetch-blob';

var serviceApi = {
    getProfiles(token) {
        var url = `${apiUrl.listHoSoSucKhoe}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${token}`
            }
        }).then((response) => response.json()).catch((e) => {
            alert(e)
        })
    },
    uploadImg(source) {
        // var data = new FormData();
        // data.append('file', source.data);

        // // Create the config object for the POST
        // // You typically have an OAuth2 token that you use for authentication
        // const config = {
        //     body: data,
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data;',
        //         //'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
        //     },

        // }

        // return fetch(apiUrl.uploadImg, config)
        //     .then((response) => response.json())

        return RNFetchBlob.fetch('POST', apiUrl.uploadImg, {
            //Authorization: "Bearer access-token",
            //otherHeader: "foo",
            // this is required, otherwise it won't be process as a multipart/form-data request
            'Content-Type': 'multipart/form-data',
        }, [
            // append field data from file path
            {
                name: 'file',
                filename: 'avatar.png',
                // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                // Or simply wrap the file path with RNFetchBlob.wrap().
                data: RNFetchBlob.wrap(source.path)
            },
        ]).then((response) => response.json())
    }
}

export default serviceApi;