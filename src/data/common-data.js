const {Menus, Routers} = require('../constants/config')

class CommonData {

  async getMenus() {
    return Menus;
  }

  async getRouters() {
    return Routers;
  }
}

module.exports = new CommonData();