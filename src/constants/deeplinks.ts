const IS_PROD = process.env.API_ENV === 'production';

const BDSERVICE_URL = {
  TOURNAMENT: IS_PROD ? 'https://btd.gg' : 'https://battledog.net',
  WEBZINE: IS_PROD ? 'https://webzine.btd.gg' : 'https://webzine.battledog.net',
  API_UPLOAD: IS_PROD ? 'https://content-api-prod.btd.gg/v1/content/upload' : 'https://content-api-dev.btd.gg/v1/content/upload',
};

const DEEPLINKS = {
  TOURNAMENT: {
    ME: `${BDSERVICE_URL.TOURNAMENT}/me`,
  },
  WEBZINE: {
    POSTS: `${BDSERVICE_URL.TOURNAMENT}/posts`,
  },
  API_UPLOAD: {
    THUMBNAIL: BDSERVICE_URL.API_UPLOAD,
  },
};

export { DEEPLINKS, BDSERVICE_URL };
export default DEEPLINKS;
