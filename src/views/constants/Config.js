import * as constants from './Constants'

export const DEV = true;

export const GetServerAddress = () => {
  return DEV ? constants.DEV_SERVER : constants.PROD_SERVER;
}