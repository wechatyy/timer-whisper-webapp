const API_ENVIRONMENT = ({
  env: '',
  prod: '',
  mock: '',
})['env'] || '';

const API = {
  API_HOST: API_ENVIRONMENT,
  API_GET_TOKEN:`getToken`
};

module.exports = API