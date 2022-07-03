// const API_BASE_URL = 'http://localhost:8050';
const API_BASE_URL = 'https://spring-auth-server-yigit.herokuapp.com'
const ACCESS_TOKEN = 'accessToken';

const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

module.exports = {
    GOOGLE_AUTH_URL,
    FACEBOOK_AUTH_URL,
    API_BASE_URL
}
