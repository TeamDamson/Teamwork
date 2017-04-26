const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_r1MLNB66l";
const appSecret = "3666160cc45b4b23b3d7f50e46903ae4";
const authHeaders = {
    "Authorization": "Basic " + btoa(appKey + ":" + appSecret)
};

let kinveyUrls = {
    baseUrl,
    appKey,
    appSecret,
    authHeaders
};

export { kinveyUrls };