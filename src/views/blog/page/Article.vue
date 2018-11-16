<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div slot="header" class="clearfix">
      <div class="article-header">
        <div class="article-title-box">
          <span class="article-type type-1 float-left">原</span>
          <h1 class="title-article">{{article.article_title}}</h1>
        </div>
        <div class="article-info-box">
          <div class="article-bar-top">
            <span class="classify" v-if="article.ClassifyArticle">{{article.ClassifyArticle.classify_name}}</span>
            <span class="time">{{article.createdAt | formatDate}}</span>
            <span class="read-count">阅读数：{{article.article_read}}</span>
            <span class="comment-count" v-if="article.ArticleComment">评论数：{{article.ArticleComment.length}}</span>
          </div>
          <div class="operating" v-if="article.article_no">
            <router-link :to="{name: 'UpDate', params: { articleno:article.article_no}}" class="edit" v-if="landUser.user_id">编辑</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="article-content htmledit_views">
      <article v-html="article.article_html" class="markdown_views"></article>
    </div>
    <div class="comment-box">
      <!-- 未登陆 -->
      <div class="unlogin-box text-center" v-if="!landUser.user_id">
        <span>想对作者说点什么？</span>
        <router-link :to="{name: 'land'}" class="btn btn-sm btn-red">我来说一句</router-link>
      </div>
      <div class="comment-write" v-else>
        <div class="comment-title">您当前正在评论</div>
        <div class="comment-input clearfix">
          <div class="comment-write-img">
            <router-link :to="{ name: 'ArticleList', params: { userid: landUser.user_id } }" target="_blank" class="fl">
              <img :src="landUser.user_image_url" :alt="landUser.user_name" class="avatar" v-if="landUser.user_image_type=='1'">
              <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1409037549,3978854282&fm=202&mola=new&crop=v1" :alt="landUser.user_name" class="avatar" v-else-if="landUser.user_image_type=='2'">
              <img src="../../../assets/img/user_img.jpg" :alt="landUser.user_name" class="avatar" v-else>
            </router-link>
          </div>
          <div class="comment-write-right-box ">
            <el-input class="textarea" type="textarea" :maxlength=1000 :rows="4" placeholder="严禁讨论涉及中国军政的话题或内容，违者禁言封号！" v-model="commentContent"></el-input>
          </div>
        </div>
        <div class="comment-inf clearfix">
          <span class="fl">输入{{commentContentLength}} / 1000个字</span>
          <el-button type="primary" class="fr" size="mini">评论</el-button>
        </div>
      </div>
      <div class="comment-list-container">
        <div class="comment-list-box" style="max-height: none;">
          <ul class="comment-list" v-for="(comment,index) in article.ArticleComment" :key="index">
            <li class="comment-line-box d-flex">
              <router-link to="#" target="_blank">
                <img :src="comment.UserComment.user_image_url" :alt="comment.UserComment.user_name" class="avatar">
              </router-link>
              <div class="right-box ">
                <div class="info-box">
                  <router-link to="#" target="_blank">
                    <span class="name ">{{comment.UserComment.user_name}}</span>
                  </router-link>
                  <span class="date">{{formatDate(comment.createdAt,"yyyy-MM-dd hh:mm:ss")}}</span>
                  <span class="floor-num">#{{index+1}}楼</span>
                  <span class="opt-box fr">
                    <a class="btn btn-link-blue btn-reply" data-type="reply">回复</a>
                    <a class="btn btn-link-blue btn-report" data-type="report" v-if="comment.CommentReply.length">展开{{comment.CommentReply.length}}
                      <i class="el-icon-arrow-down"></i>
                    </a>
                  </span>
                </div>
                <p class="comment">{{comment.comment_content}}</p>
                <div class="replay-list-box">
                  <ul class="reply-list" v-for="(reply,index) in comment.CommentReply" :key="index">
                    <li class="comment-line-box d-flex">
                      <router-link to="#" target="_blank">
                        <img :src="reply.UserReply.user_image_url" :alt="reply.UserReply.user_name" class="avatar">
                      </router-link>
                      <div class="right-box ">
                        <div class="info-box">
                          <router-link to="#" target="_blank">
                            <span class="name ">{{reply.UserReply.user_name}}</span>
                          </router-link>
                          <span class="date">{{formatDate(reply.createdAt,"yyyy-MM-dd hh:mm:ss")}}</span>
                          <span class="floor-num">回复#({{comment.UserComment.user_name}})</span>
                        </div>
                        <p class="comment">{{reply.reply_content}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination-box">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { formatDate } from "@/assets/js/formatDate.js";
import { getArticle } from "@/api/getdata.js";
export default {
  data() {
    return {
      landUser: this.$store.getters.getLandUser,
      pageSize: 5,
      currentPage: 1,
      total: 15,
      userId: this.$route.params.userid,
      articleno: this.$route.params.articleno,
      article: {},
      commentContent: "",
      commentContentLength: 0
    };
  },
  watch: {
    commentContent: function(curVal, oldVal) {
      this.commentContentLength = curVal.length;
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
    }
  },
  methods: {
    formatDate(date, str) {
      return formatDate(date, str);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getData() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getArticle({
          size: this.pageSize,
          pageno: this.currentPage,
          userid: this.userId,
          articleno: this.articleno
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              this.article = backData[1];
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
    this.getData();
  },
  computed: {}
};
</script>
<style scoped>
@import url(../../../assets/css/article.css);
@import url(../../../assets/css/markdown.css);
span.article-type {
  display: inline-block;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 50%;
}
span.article-type.type-1 {
  color: #ca0c16;
  border: 1px solid #f4ced0;
}
.article-header div.article-title-box span.article-type {
  margin-right: 8px;
  margin-top: 4px;
}
.article-header div.article-title-box .title-article {
  font-size: 24px;
  word-break: break-all;
}
.article-header div.article-info-box {
  position: relative;
}
.article-header div.article-info-box div.article-bar-top {
  color: #858585;
  width: 88%;
  height: 24px;
  overflow: hidden;
}
.article-header div.article-info-box .operating {
  position: absolute;
  top: 0;
  right: 0;
}
.article-header div.article-info-box div.article-bar-top span {
  margin-right: 14px;
}
.article-content {
  padding: 20px;
}
.comment-box {
  margin-top: 1px;
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.comment-box .unlogin-box {
  padding: 8px 0;
  background-color: #eaeaea;
  color: #3d3d3d;
}
.text-center {
  text-align: center;
}
.comment-box .comment-list-container .comment-list-box {
  padding: 0 24px;
  overflow: hidden;
}
.comment-box .comment-list-container .replay-list-box {
  margin-top: 5px;
  padding: 0 24px;
  overflow: hidden;
}
.comment-box .comment-list-container .comment-list-box ul.comment-list {
  margin-top: 8px;
  border-bottom: 1px dashed #e0e0e0;
}
.comment-box .comment-list-container .comment-list-box ul.reply-list {
  margin-top: 8px;
}
.comment-box .comment-list-container .comment-list-box ul:last-child {
  border-bottom: none;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box {
  position: relative;
  margin-bottom: 8px;
}
.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  img.avatar {
  display: block;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box {
  width: 96%;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box {
  line-height: 22px;
  margin-bottom: 4px;
  word-wrap: break-word;
  word-break: normal;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box
  .comment {
  color: #4d4d4d;
  font-size: 14px;
  margin-left: 0;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box
  .date,
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box
  .floor-num {
  font-size: 12px;
  color: #999;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box
  span {
  margin-left: 16px;
  font-size: 12px;
  color: #6b6b6b;
}
.comment-box
  .comment-list-container
  .comment-list-box
  ul.comment-list
  li.comment-line-box
  div.right-box
  div.info-box
  .opt-box
  a.btn {
  margin: 0;
  min-width: auto;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
.comment-write {
  padding: 20px 24px 15px 20px;
}
.comment-title {
  text-align: center;
  padding: 5px 0;
  font-size: 15px;
}
.comment-write img.avatar {
  display: block;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.comment-write div.right-box {
  width: 96%;
}
.comment-write-right-box .textarea {
  box-sizing: border-box;
  width: 96%;
  resize: vertical;
  min-height: 80px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 21px;
}
.comment-inf {
  margin-top: 8px;
  padding-left: 32px;
}
.pagination-box {
  text-align: center;
  padding: 5px 0 10px 0;
}
.edit {
  color: #79a5e5;
}
</style>

