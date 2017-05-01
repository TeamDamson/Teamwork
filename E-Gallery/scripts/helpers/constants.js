const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_r1MLNB66l";
const appSecret = "3666160cc45b4b23b3d7f50e46903ae4";
const masterKey = '7ed2cd833b9e427db7b508c949b30e2b';
const authHeaders = {
    "Authorization": "Basic " + btoa(appKey + ":" + appSecret)
};
const contentType =  'application/json';

let kinveyUrls = {
    baseUrl,
    appKey,
    appSecret,
    authHeaders,
    contentType,
    masterKey
};

export { kinveyUrls };



