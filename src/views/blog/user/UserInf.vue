<template>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix">
            <h3 class="aside-title">个人资料</h3>
            <div class="profile-intro d-flex">
                <div class="avatar-box d-flex justify-content-center flex-column">
                    <router-link :to="{ name: 'ArticleList', params: { userid: user.user_id } }">
                        <img :src="user.user_image_url" alt="" class="avatar_pic" v-if="user.user_image_type=='1'">
                        <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1409037549,3978854282&fm=202&mola=new&crop=v1" alt="" class="avatar_pic" v-else-if="user.user_image_type=='2'">
                        <img src="../../../assets/img/user_img.jpg" alt="" class="avatar_pic" v-else>
                    </router-link>
                </div>
                <div class="user-info d-flex justify-content-center flex-column">
                    <p class="name csdn-tracking-statistics tracking-click" data-mod="popu_379">
                        <router-link :to="{ name: 'ArticleList', params: { userid: user.user_id } }" class="text-truncate">{{user.user_blog_title}}</router-link>
                    </p>
                </div>
            </div>
        </div>
        <div class="data-info d-flex item-tiling">
            <dl class="text-center" title="1213">
                <dt>
                    <a href="#">原创</a>
                </dt>
                <dd>
                    <a href="#">
                        <span class="count">1213</span>
                    </a>
                </dd>
            </dl>
            <dl class="text-center" title="390">
                <dt>粉丝</dt>
                <dd>
                    <span class="count" id="fan">390</span>
                </dd>
            </dl>
            <dl class="text-center" title="116">
                <dt>喜欢</dt>
                <dd>
                    <span class="count">116</span>
                </dd>
            </dl>
            <dl class="text-center">
                <dt>GitHub</dt>
                <dd>
                    <a :href="user.user_github" target="_blank" v-if="user.user_github" :title="user.user_github">
                        <span class="count_github">开通</span>
                    </a>
                    <span class="count" v-else>未开通</span>
                </dd>
            </dl>
        </div>
        <div class="grade-box clearfix">
            <dl>
                <dt>等级：</dt>
                <dd>
                    <i :class="['icon-rank','icon-rank-'+user.user_rank]"></i>
                </dd>
            </dl>
            <dl>
                <dt>访问：</dt>
                <dd :title="user.user_view">{{user.user_view}}</dd>
            </dl>
            <dl>
                <dt>积分：</dt>
                <dd :title="user.user_mark">{{user.user_mark}}</dd>
            </dl>
            <dl title="32118">
                <dt>排名：</dt>
                <dd>3万+</dd>
            </dl>
        </div>
    </el-card>
</template>
<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  mounted: function() {
    this.user = this.$store.getters.getUser;
  },
  created: function() {},
  computed: {
    // user() {
    //   return this.$store.getters.getUser;
    // }
  },
  methods: {}
};
</script>

<style scoped>
@import url(../../../assets/css/icon_rank.css);
.box-card {
  border-radius: 0;
  margin-bottom: 8px;
}
h3.aside-title {
  /* padding: 16px 16px 0; */
  font-size: 14px;
  color: #333;
}
h3.aside-title::before {
  display: inline-block;
  margin-right: 8px;
  content: "";
  width: 4px;
  height: 22px;
  vertical-align: -6px;
  background-color: #ca0c16;
}
.data-info {
  padding: 16px 10px;
  border-bottom: 1px solid #e3e3e3;
}
.data-info.item-tiling a {
  color: inherit;
}
.data-info .count {
  font-weight: 700;
}
.data-info .count_github {
  font-weight: 700;
  color: #409eff;
}
.grade-box {
  margin-top: -8px;
  padding: 16px;
}
.grade-box dl {
  margin-top: 8px;
  float: left;
  width: 50%;
}
.grade-box dl dt {
  display: inline;
}
.grade-box dl dd {
  display: inline;
}
div.aside-box a {
  color: #333;
  cursor: pointer;
}
.icon-rank {
  display: inline-block;
  width: 48px;
  height: 16px;
  background-repeat: no-repeat;
}
.profile-intro {
  padding-top: 16px;
}
.profile-intro .user-info {
  margin-left: 8px;
  width: 138px;
}
.profile-intro .user-info p.name a {
  display: inline-block;
  color: #3d3d3d;
  font-weight: 700;
  max-width: 100px;
}
.avatar-box img.avatar_pic {
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>

