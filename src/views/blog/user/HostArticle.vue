<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3 class="aside-title">热门文章</h3>
    </div>
    <div class="aside-content">
      <ul class="hotArticle-list csdn-tracking-statistics tracking-click" data-mod="popu_521">
        <li v-for="article in articles" :key="article.article_no">
          <router-link :to="{ name: 'Article', params: { userid: userId,articleno: article.article_no} }" class="text-truncate">{{article.article_title}}</router-link>
          <p class="read">阅读量：
            <span>{{article.article_read}}</span>
          </p>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
import { getHostArticle } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      articles: []
    };
  },

  mounted() {
    this.getData(1, 5);
  },
  methods: {
    getData(first, total) {
      const _self = this;
      return new Promise((resolve, reject) => {
        getHostArticle({
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
    }
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

.aside-content ul.hotArticle-list li p.read {
  font-size: 12px;
  color: #858585;
  line-height: 20px;
}
</style>

