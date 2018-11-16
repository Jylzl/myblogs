<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="listForm" :inline="true">
        <el-row>
          <el-col :span="4">
            <el-select v-model="listForm.classify" placeholder="请选择" size="small" @change="classifyChange" clearable>
              <el-option v-for="classify in classifys" :key="classify.classify_no" :label="classify.classify_name" :value="classify.classify_no"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" :offset="12">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="listForm.search" size="small" @change="searchChange" clearable></el-input>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <ul>
      <li class="article-list" v-for="(article,index) in articles" :key="article.createdAt">
        <div class="article-item-box csdn-tracking-statistics" data-articleid="81201467">
          <h4 class="">
            <router-link :to="{ name: 'Article', params: { userid: article.user_id,articleno: article.article_no} }">
              <span class="article-type type-1" v-if="article.article_type==0">原</span>
              <span class="article-type type-2" v-else-if="article.article_type==1">转</span>
              <span class="article-type type-3" v-else>译</span>
              {{article.article_title}}
            </router-link>
          </h4>
          <p class="content">
            <router-link :to="{ name: 'Article', params: { userid: article.user_id,articleno: article.article_no} }">
              {{article.article_summary}}
            </router-link>
          </p>
          <div class="info-box d-flex align-content-center">
            <p>
              <span class="classify">{{article.ClassifyArticle.classify_name}}</span>
            </p>
            <p>
              <span class="date">{{article.createdAt | formatDate}}</span>
            </p>
            <p>
              <span class="read-num">阅读数：{{article.article_read}}</span>
            </p>
            <p>
              <span class="read-num">评论数：{{article.ArticleComment.length}}</span>
            </p>
          </div>
          <!-- <div class="is_top" v-if="article.article_top"></div> -->
          <div class="is_top" v-if="index == 0"></div>
        </div>
      </li>
    </ul>
    <div class="paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2,5,10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </el-card>
</template>
<script>
import { formatDate } from "@/assets/js/formatDate.js";
import { getList, getClassify } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      classifys: [],
      articles: [],
      listForm: {
        search: "",
        classify: ""
      },
      //分页默认设置
      currentPage: 1,
      pageSize: 10,
      //总数
      total: null
    };
  },
  filters: {
    formatDate(date) {
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    classifyChange() {
      this.currentPage = 1;
      this.getLists();
    },
    searchChange() {
      this.getLists();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = Number(`${val}`);
      this.getLists();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(`${val}`);
      this.getLists();
    },
    getClassifys() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getClassify({
          userid: this.userId
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              this.classifys = backData[1].classifys;
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getLists() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getList({
          userid: this.userId,
          size: this.pageSize,
          pageno: this.currentPage,
          classify: this.listForm.classify,
          search: this.listForm.search
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
              this.total = 0;
            } else if (msg == 1) {
              this.total = backData[1].total;
              this.articles = backData[2].list;
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
    this.getClassifys();
    this.getLists();
  }
};
</script>
<style scoped>
a {
  color: #333;
}
.box-card {
  border-radius: 0;
  margin-bottom: 8px;
}
.article-list * {
  word-break: break-all;
}
.article-list .article-item-box {
  position: relative;
  /* margin-bottom: 1px; */
  border-bottom: 1px solid #f4f4f4;
  padding: 16px 24px;
  background-color: #fff;
}
.article-list .article-item-box h4 {
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 28px;
  color: #3d3d3d;
  display: inline-block;
}
span.article-type {
  display: inline-block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 50%;
}
.article-list .article-item-box span.article-type {
  margin-right: 8px;
  margin-top: 0;
  vertical-align: 2px;
}
span.article-type.type-1 {
  color: #ca0c16;
  border: 1px solid #f4ced0;
}
span.article-type.type-2 {
  color: #86ca5e;
  border: 1px solid #e7f4df;
}
span.article-type.type-3 {
  color: #79a5e5;
  border: 1px solid #e4edfa;
}
.article-list .article-item-box p.content {
  white-space: normal;
}
.article-list .article-item-box p.content a {
  font-size: 14px;
  color: #999;
}
.article-list .article-item-box div.info-box {
  padding-top: 8px;
  font-size: 14px;
  color: #6b6b6b;
  float: right;
  position: relative;
}
.article-list .article-item-box div.info-box {
  float: none;
}
.article-list .article-item-box div.info-box p {
  margin-right: 16px;
}
.article-list .article-item-box div.info-box p .type {
  box-sizing: border-box;
  display: inline-block;
  margin-right: 16px;
  height: 22px;
  line-height: 22px;
  /* padding: 0 5px; */
  min-width: 50px;
  /* border: 1px solid #999; */
}
.article-list .article-item-box .is_top {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../../assets/img/is_top_big.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.paging {
  padding: 20px 0 15px 0;
  text-align: center;
}
</style>

