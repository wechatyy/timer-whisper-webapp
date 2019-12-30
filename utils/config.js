const API_ENVIRONMENT = ({
    env: 'https://www.vhjkdcv.cn/api',
    prod: 'https://www.vhjkdcv.cn/api',
})['env'] || '';

const API = {
    API_HOST: API_ENVIRONMENT,
    API_LOGIN:`/login`
};

module.exports = API
