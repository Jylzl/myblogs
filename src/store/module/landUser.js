import Cookies from "js-cookie";
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  login,
  loginOut
} from "@/api/login.js";
import {
  landUserInf
} from "@/api/landUser.js";
//展示的用户信息
const state = {
  //设置属性
  landUserId: Cookies.get("user_id"),
  token: getToken(),
  landUser: {}
}
const getters = {
  //获取属性的状态
  getLandUserId: state => state.landUserId,
  getLandUser: state => state.landUser,
  getToken: state => state.token
}
const mutations = {
  //改变属性的状态
  setLandUserId(state, data) {
    state.landUserId = data;
  },
  setLandUser(state, data) {
    state.landUser = data;
  },
  setToken(state, data) {
    state.token = data;
  }
}
const actions = {
  //应用mutaions
  // 用户登录
  userLand({
    commit
  }, data) {
    var _this = data._this;
    var landInf = data.loginForm;
    return new Promise((resolve, reject) => {
      login(landInf)
        .then(response => {
          const backData = JSON.parse(response.data);
          const msg = backData[0].msg;
          if (msg == 1) {
            var user = backData[1];
            _this.$message({
              message: "登陆成功",
              type: "success"
            });

            setToken(backData[0].token)
            commit("setToken", backData[0].token)
            commit("setLandUserId", user.user_id);

            resolve();
          } else if (msg == 0) {
            _this.refreshCode();
            _this.$message.error("密码错误或用户不存在！！");
            setTimeout(() => {
              _this.loading = false;
              return false;
            }, 1000);
          } else if (msg == 2) {
            setTimeout(() => {
              _this.loading = false;
              _this.$message.error(
                "您的账户已经在其他地方登陆，请先下线后再登陆"
              );
              return false;
            }, 1000);
          } else {
            setTimeout(() => {
              _this.loading = false;
              _this.$message.error("系统异常，请稍后再试");
              return false;
            }, 1000);
          }
        })
        .catch(err => {
          reject(false);
        });
    });
  },

  // 获取用户信息
  getLandUserInfo({
    commit,
    state
  }) {
    if (state.landUserId) {
      return new Promise((resolve, reject) => {
        landUserInf({
            landUserId: state.landUserId
          })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {} else if (msg == 1) {
              commit("setLandUser", backData[1]);
              resolve();
            }
          })
          .catch(err => {
            reject(false);
          });
      });
    }
  },
  // 退出登陆
  loginOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      loginOut({
        userId: state.landUserId
      }).then((response) => {
        const backData = JSON.parse(response.data);
        const msg = backData[0].msg;
        if (msg == 1) {
          commit("setToken", null);
          commit("setLandUserId", null);
          commit("setLandUser", null);
          removeToken();
          Cookies.remove("user_id")
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

}
export default {
  state,
  getters,
  mutations,
  actions
}
