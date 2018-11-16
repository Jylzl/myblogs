import Vue from 'vue'
import Vuex from 'vuex'

import landUser from "./module/landUser"
import user from "./module/user"
Vue.use(Vuex)
export const store = new Vuex.Store({

  modules: {
    landUser,
    user
  }

})
