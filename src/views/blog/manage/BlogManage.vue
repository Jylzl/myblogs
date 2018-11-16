<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-select v-model="classify" placeholder="请选择分类" @change="classifyChange" clearable>
          <el-option v-for="classify in classifys" :key="classify.value" :label="classify.classify_name" :value="classify.classify_no"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input placeholder="请输入内容搜索" v-model="search" @change="searchChange" clearable>
        </el-input>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-date-picker @change="timeSelect" v-model="checkTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd HH:mm:s" :default-time="['00:00:00', '23:59:59']" style="width:100%;">
        </el-date-picker>
      </el-col>
    </el-row>
    <template>
      <el-table :data="articleList" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: prop, order: order}" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文章编号:">
                <span>{{ props.row.article_no }}</span>
              </el-form-item>
              <el-form-item label="文章分类:">
                <span>{{ props.row.ClassifyArticle.classify_name}}</span>
              </el-form-item>
              <el-form-item label="文章标签:">
                <span v-for="label in props.row.article_label.split(',')" :key="label" class="label">{{ label }}</span>
              </el-form-item>
              <el-form-item label="发表时间:" prop="createdAt">
                <span>{{formatDate(props.row.createdAt, "yyyy年MM月dd日 hh:mm:ss")}}</span>
              </el-form-item>
              <el-form-item label="可否评论:">
                <span v-if="props.row.article_is_comment">是</span>
                <span v-else>否</span>
              </el-form-item>
              <el-form-item label="是否公开:">
                <span v-if="props.row.article_view">仅自己可看</span>
                <span v-else>公开</span>
              </el-form-item>
              <el-form-item label="评论数量:">
                <span>{{ props.row.ArticleComment.length }}</span>
              </el-form-item>
              <el-form-item label="阅读数量:">
                <span>{{ props.row.article_read }}</span>
              </el-form-item>
              <el-form-item label="文章标题:">
                <span>{{ props.row.article_title }}</span>
              </el-form-item>
              <el-form-item label="文章内容:">
                <span>{{ props.row.article_summary }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="文章编号" prop="article_no" width="100" sortable>
        </el-table-column>
        <el-table-column label="文章分类" prop="ClassifyArticle.classify_name" width="120">
        </el-table-column>
        <el-table-column label="文章标题" prop="article_title" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="阅读量" prop="article_read" width="100" align="center" sortable>
        </el-table-column>
        <el-table-column label="日期" prop="createdAt" @click="all(createdAt)" width="140" sortable>
          <template slot-scope="props">
            <p>{{formatDate(props.row.createdAt, "yyyy年MM月dd")}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="props">
            <el-button type="text" size="mini">
              <router-link :to="{ name: 'Article', params: { userid: userId,articleno: props.row.article_no} }" target="_blank">阅读</router-link>
            </el-button>
            <el-button type="text" size="mini" @click="upDate(props.row.article_no)">编辑</el-button>
            <el-button type="text" style="color: #f00;" size="mini" @click="delArticle(props.row.article_no)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>
    <div class="page-footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { formatDate } from "@/assets/js/formatDate.js";
import { getManageList, delArticle } from "@/api/manage.js";
import { getClassify } from "@/api/getdata.js";
export default {
  data() {
    return {
      userId: this.$store.getters.getLandUserId,
      search: "",
      classifys: [],
      classify: "",
      //表格
      articleList: [],
      //时间选择器
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一整年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      checkTime: "",
      //分页默认设置
      currentPage: 1,
      pageSize: 10,
      //总数
      total: null,
      // 表格默认排序
      prop: "createdAt",
      order: "descending"
    };
  },
  methods: {
    formatDate(date, str) {
      return formatDate(date, str);
    },
    sortChange(val) {
      this.prop = val.prop;
      this.order = val.order;
      this.getData();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = Number(`${val}`);
      this.getData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(`${val}`);
      this.getData();
    },
    timeSelect() {
      this.currentPage = 1;
      this.getData();
    },
    classifyChange() {
      this.currentPage = 1;
      this.getData();
    },
    searchChange() {
      this.getData();
    },
    getData() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getManageList({
          userid: this.$store.getters.getLandUser.user_id,
          size: this.pageSize,
          pageno: this.currentPage,
          classify: this.classify,
          search: this.search,
          time: this.checkTime
            ? this.checkTime
            : [
                "2000-01-01 00:00:00",
                formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
              ],
          prop: this.prop,
          order: this.order == "descending" ? "DESC" : "ASC"
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
              this.total = 0;
            } else if (msg == 1) {
              const total = backData[1].total;
              const articleList = backData[2].list;
              this.total = total;
              this.articleList = articleList;
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    delArticle(ano) {
      this.$confirm(
        "此操作将永久删除编号为" + ano + "的文章, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          const _self = this;
          return new Promise((resolve, reject) => {
            delArticle({
              userid: this.$store.getters.getLandUser.user_id,
              articleno: ano
            })
              .then(response => {
                const backData = JSON.parse(response.data);
                const msg = backData[0].msg;
                if (msg == 1) {
                  this.$message({
                    message: "文章删除成功",
                    type: "success"
                  });
                  this.getData();
                } else {
                  this.$message({
                    message: "文章删除失败",
                    type: "warning"
                  });
                }
              })
              .catch(err => {
                console.log(err);
                reject(false);
              });
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    upDate(ano) {
      let data = {
        aNo: ano,
        uId: this.$store.getters.getLandUser.user_id
      };
      // this.$store.commit("updateArticle", data);
      this.$router.push("/postedit/" + this.userId + "/1");
    },
    getClassifys() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getClassify({
          userid: this.$store.getters.getLandUser.user_id
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
    }
  },
  mounted() {
    this.getData();
  },
  created: function() {
    this.getClassifys();
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item:nth-child(1),
.el-form-item:nth-child(2),
.el-form-item:nth-child(3),
.el-form-item:nth-child(4),
.el-form-item:nth-child(5),
.el-form-item:nth-child(6),
.el-form-item:nth-child(7),
.el-form-item:nth-child(8) {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.demo-table-expand .el-form-item:nth-child(9),
.el-form-item:nth-child(10) {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.label {
  margin-right: 10px;
  color: #66b1ff;
  padding: 3px 5px;
  border: 1px solid #66b1ff;
  border-radius: 4px;
}
.page-footer {
  text-align: center;
  margin-top: 30px;
}

.el-date-editor .el-range-separator {
  width: 20px;
}
</style>