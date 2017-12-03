import * as constants from './Constants'
import baseConfig from '../../constants/config'

export const DEV = true;

export const GetServerAddress = () => {
  return DEV ? constants.DEV_SERVER : constants.PROD_SERVER;
}

export const Menus = baseConfig.Menus;

export const Routers = baseConfig.Routers;