//编辑文章
const state = {
    //设置属性
    article:{}
  }
  const getters = {
    //获取属性的状态
    getArticle: state => state.article
  }
  const mutations = {
    //改变属性的状态
    updateArticle(state, data) {
      state.article = data;
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
  