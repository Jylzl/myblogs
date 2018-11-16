<template>
  <div>
    <el-table :data="classifys" stripe style="width: 100%">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+(currentPage-1)*pageSize+1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="classify_name" label="类别"></el-table-column>
      <el-table-column prop="classify_no" label="编号" width="100"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button type="text" style="color: #f00;" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ArticleClassify.length" label="文章数" width="120"></el-table-column>
    </el-table>
    <div style="text-align:right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-row :gutter="10" class="m-t-20">
      <el-col :span="8">
        <el-form ref="form" label-width="100px">
          <el-form-item label="添加分类：">
            <el-input placeholder="请输入新分类" v-model="inputclassify" maxlength="8" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="addClassify" circle></el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  addClassify,
  delClassify,
  updateClassify,
  getClassify
} from "@/api/manage.js";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: null,
      userId: this.$store.getters.getLandUserId,
      inputclassify: "",
      classifys: []
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    handleEdit(index, row) {
      this.$prompt("", "请输入修改内容", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5a-zA-Z]{2,8}$/,
        inputErrorMessage: "请输入2~8个汉字或英文"
      })
        .then(({ value }) => {
          this.updateClassify(row.classify_no, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleDelete(index, row) {
      if (!row.ArticleClassify.length) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.delClassify(row.classify_no);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message:
            "当前分类下，拥有" +
            row.ArticleClassify.length +
            "篇文章，无法删除",
          type: "warning"
        });
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getClassify();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getClassify();
    },
    addClassify() {
      if (this.inputclassify.length == 0) {
        this.$message({
          message: "请先输入分类名",
          type: "warning"
        });
        return;
      } else {
        const _self = this;
        return new Promise((resolve, reject) => {
          addClassify({
            userId: this.userId,
            classifyName: this.inputclassify
          })
            .then(response => {
              const backData = JSON.parse(response.data);
              const msg = backData[0].msg;
              if (msg == 1) {
                this.getClassify();
                this.inputclassify = "";
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              } else {
                this.$message.error("添加失败");
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      }
    },
    delClassify(no) {
      const _self = this;
      return new Promise((resolve, reject) => {
        delClassify({
          no: no
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 1) {
              this.getClassify();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    updateClassify(no, name) {
      const _self = this;
      return new Promise((resolve, reject) => {
        updateClassify({
          userId: this.userId,
          no: no,
          name: name
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 1) {
              this.getClassify();
              this.$message({
                message: "修改成功",
                type: "success"
              });
            } else if (msg == 2) {
              this.getClassify();
              this.$message({
                message: "添加成功",
                type: "success"
              });
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getClassify() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getClassify({
          userId: this.userId,
          pageno: this.currentPage,
          size: this.pageSize
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 0) {
            } else if (msg == 1) {
              this.classifys = backData[1].rows;
              this.total = backData[1].count;
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
.m-t-20 {
  margin-top: 20px;
}
</style>
