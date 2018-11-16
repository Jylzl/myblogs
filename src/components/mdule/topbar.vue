<template>
  <div class="clearfix toolbar" :key="Date.parse(new Date())">
    <div class="left-menu">
      <ul class="ul-row">
        <li>
          <router-link :to="{ name: 'ArticleList', params: { userid: '1' } }">
            <span class="logo">
              <span>My-blog</span>
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ArticleList', params: { userid: '1' } }">首页</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ArticleList', params: { userid: '1' } }">博客</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ArticleList', params: { userid: '1' } }">学院</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ArticleList', params: { userid: '1' } }">简介</router-link>
        </li>
      </ul>
    </div>
    <div class="right-menu">
      <ul class="ul-row">
        <li>
          <el-form ref="form" :model="searchForm" :inline="true" style="margin:0 30px 0 5px;">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchForm.content" size="small"></el-input>
          </el-form>
        </li>
        <li>
          <router-link :to="{ name: 'Write'}" v-if="landUser.user_id"><i class="icon iconfont icon-survey1" style="color:#e74040; margin-right:4px;"></i>写博客</router-link>
          <router-link :to="{name: 'Land'}" v-else><i class="icon iconfont icon-survey1" style="color:#e74040; margin-right:4px;"></i>写博客</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'BlogManage'}" v-if="landUser.user_id"><i class="icon iconfont icon-set " style="color:#F59701; margin-right:4px;"></i>管理博客</router-link>
          <router-link :to="{name: 'Land'}" v-else><i class="icon iconfont icon-set " style="color:#F59701; margin-right:4px;"></i>管理博客</router-link>
        </li>
        <li v-if="!landUser.user_id">
          <router-link :to="{name:'Land'}">登陆</router-link>
        </li>
        <li v-if="!landUser.user_id">
          <router-link :to="{name:'Register'}">注册</router-link>
        </li>
        <li v-if="landUser.user_id">
          <router-link :to="{ name: 'ArticleList', params: { userid: landUser.user_id } }">{{landUser.user_name}}</router-link>
        </li>
        <li v-if="landUser.user_id">
          <el-dropdown>
            <el-badge is-dot class="el-dropdown-link">
              <img :src="landUser.user_image_url" alt="" class="user-header-img" v-if="landUser.user_image_type=='1'">
              <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1409037549,3978854282&fm=202&mola=new&crop=v1" alt="" class="user-header-img" v-else-if="landUser.user_image_type=='2'">
              <img src="../../assets/img/user_img.jpg" alt="" class="user-header-img" v-else>
            </el-badge>
            <el-dropdown-menu slot="dropdown" style="width:130px;">
              <el-dropdown-item>个人博客</el-dropdown-item>
              <el-dropdown-item class="clearfix">
                未读消息
                <el-badge class="mark" :value="12" />
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="userSet()" style="color:#606266;">用户设置</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button type="text" @click="landOut()">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { landUserInf } from "@/api/landUser.js";
export default {
  data() {
    return {
      landUser: "",
      userId: this.$route.params.userid,
      searchForm: {
        content: ""
      }
    };
  },
  methods: {
    userSet() {
      this.$router.push({
        name: "UserSet",
        params: {
          userid: this.landUser.user_id
        }
      });
    },
    // 清除cookies并退出
    landOut() {
      this.$store.dispatch("loginOut").then(() => {
        // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        this.$router.push({
          name: "Land"
        });
      });
    },
    getLandUser() {
      this.$store
        .dispatch("getLandUserInfo")
        .then(() => {
          this.landUser = this.$store.getters.getLandUser;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.getLandUser();
  },
  mounted() {
    this.getLandUser();
  }
};
</script>
<style scoped>
.toolbar {
  font-family: "PingFang SC", "Microsoft YaHei", SimHei, Arial, SimSun;
  font-size: 0.75em;
  color: #333;
  line-height: 1.5em;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  min-width: 1216px;
  width: 100%;
  height: 50px;
  padding: 0 24px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.toolbar .left-menu {
  float: left;
}
.toolbar .right-menu {
  float: right;
}
.toolbar .left-menu > ul > li,
.toolbar .right-menu > ul > li {
  height: 50px;
  line-height: 50px;
}
.toolbar .left-menu > ul > li > a,
.toolbar .right-menu > ul > li > a {
  padding-left: 12px;
  padding-right: 12px;
  text-align: center;
  font-size: 14px;
  color: #3f3f3f;
}
.toolbar .left-menu > ul > li > a:hover,
.toolbar .right-menu > ul > li > a:hover {
  color: #c92027;
}
.logo {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Arial Bold";
  color: #3f3f3f;
}
.el-dropdown-link {
  display: block;
  height: 36px;
  width: 36px;
  margin: 7px 10px;
  cursor: pointer;
}
.user-header-img {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
</style>

