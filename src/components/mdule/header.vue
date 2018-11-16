<template>
  <header>
    <div class="container d-flex clearfix">
      <div class="title-box">
        <h2 class="title-blog">
          <router-link :to="{ name: 'ArticleList', params: { userid: user.user_id } }">
            {{user.user_blog_title}}
          </router-link>
        </h2>
        <p class="description">{{user.user_blog_introduction}}</p>
      </div>
    </div>
  </header>
</template>
<script>
import { getUser } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      user: {}
    };
  },
  created: function() {
    this.user = this.$store.getters.getUser;
  },
  methods: {
    getUser(id) {
      const _self = this;
      return new Promise((resolve, reject) => {
        getUser({
          userid: id
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              const user = backData[1];
              _self.user = user;
              _self.$store.commit("setUser", user);
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    }
  },
  mounted: function() {
    this.getUser(this.$route.params.userid);
  }
};
</script>

<style scoped>
header {
  background: url("../../assets/img/bg-title.png") no-repeat center;
  background-size: 1920px auto;
  height: 100px;
}
header .container {
  padding: 24px 0 0;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
@media screen and (min-width: 1201px) {
  .container,
  .pulllog {
    width: 1216px;
  }
}
header div.title-box {
  overflow: hidden;
  word-break: break-all;
  max-width: 720px;
}

@media screen and (min-width: 1201px) {
  header .title-box {
    width: 960px;
  }
}
@media screen and (min-width: 1201px) {
  header .title-box {
    width: 960px;
  }
}
header div.title-box .title-blog {
  font-size: 24px;
}
header div.title-box .description {
  font-size: 14px;
  color: #b8b8b8;
}
header div.title-box .title-blog a {
  color: #fff !important;
}
</style>
