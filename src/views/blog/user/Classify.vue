<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3 class="aside-title">个人分类</h3>
    </div>
    <div class="aside-content">
      <ul>
        <li v-for="(classify,index) in classifys" :key="index">
          <!-- <router-link :to="{ name: 'article', params: { userid: userId,articleno: article.article_no} }"> -->
          <router-link to="/">
            {{classify.classify_name}}
            <span class="count float-right">{{classify.ArticleClassify.length}}篇</span>
          </router-link>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
import { classifyCount } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      classifys: [],
      totals: null
    };
  },
  methods: {
    getData(first, total) {
      const _self = this;
      return new Promise((resolve, reject) => {
        classifyCount({
          userid: this.userId,
          size: total,
          pageno: first
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              this.totals = backData[1].count;
              this.classifys = backData[1].rows;
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    }
  },
  created: function() {
    this.getData(1, 5);
  }
};
</script>
<style scoped>
.box-card {
  border-radius: 0;
  margin-bottom: 8px;
}
.box-card h3.aside-title {
  font-size: 14px;
  color: #333;
}
.box-card h3.aside-title::before {
  display: inline-block;
  margin-right: 8px;
  content: "";
  width: 4px;
  height: 22px;
  vertical-align: -6px;
  background-color: #ca0c16;
}
.aside-content ul li {
  margin-top: 8px;
}
.aside-content ul li:first-child {
  margin-top: 0;
}
.aside-content ul li a {
  display: block;
  color: #333;
}
.aside-content ul li a span.count {
  font-size: 12px;
  color: #858585;
}
</style>

