<template>
  <el-card class="box-card" :body-style="{ padding: '20px 20px 0 20px' }">
    <div slot="header" class="clearfix">
      <h3 class="aside-title">最新文章</h3>
    </div>
    <div class="aside-content">
      <ul class="inf_list clearfix csdn-tracking-statistics tracking-click" data-mod="popu_382">
        <li class="clearfix" v-for="article in articles" :key="article.article_no">
          <router-link :to="{ name: 'Article', params: { userid: userId,articleno: article.article_no} }" class="text-truncate">{{article.article_title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="more">
      <el-button type="text" @click="getMore()">{{more}}</el-button>
    </div>
  </el-card>
</template>
<script>
import { getRecent } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      articles: [],
      more: "展开"
    };
  },
  methods: {
    getData(first, total) {
      const _self = this;
      return new Promise((resolve, reject) => {
        getRecent({
          userid: this.userId,
          size: total,
          pageno: first
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              const total = backData[1].total;
              const list = backData[2].list;
              this.articles = list;
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getMore() {
      if (this.more == "展开") {
        this.getData(1, 10);
        this.more = "收起";
      } else {
        this.getData(1, 5);
        this.more = "展开";
      }
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
.more {
  text-align: center;
}
</style>

