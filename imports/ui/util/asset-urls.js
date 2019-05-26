import { isBrowser } from './environment-detection';

const env = isBrowser ? window.__ENV : process.env.NODE_ENV;
const rootAssetUrl = isBrowser ? window.__ROOT_ASSET_URL : process.env.ROOT_ASSET_URL;

export const generateAssetUrl = (filename, path, asset) =>
  `${rootAssetUrl}${asset ? 'assets' : env}${path ? `/${path}/` : ''}${filename}`
