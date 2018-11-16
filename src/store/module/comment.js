//评论信息
const state = {
    //设置属性
    comments:{}
  }
  const getters = {
    //获取属性的状态
    getComment: state => state.comments
  }
  const mutations = {
    //改变属性的状态
    setComment(state, data) {
      state.comments = data;
    }
  }
  const actions = {
    //应用mutaions
  }
  export default {
    state,
    getters,
    mutations,
    actions
  }
  