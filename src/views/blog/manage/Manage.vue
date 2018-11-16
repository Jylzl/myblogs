<template>
  <div class="container">
    <el-row class="margin-top-40">
      <el-col :span="4">
        <el-menu :router=true :default-active="active" class="el-menu-vertical-demo">
          <el-menu-item index="/blog/manage/write">
            <i class="el-icon-edit"></i>
            <span slot="title">撰写博客</span>
          </el-menu-item>
          <el-menu-item index="/blog/manage/list">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/blog/manage/classify">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/blog/manage/comment"> <i class="el-icon-tickets"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/blog/manage/userset">
            <i class="el-icon-setting"></i>
            <span slot="title">用户设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="padding-20">
        <div class="top-title">
          <h2>{{title}}</h2>
        </div>
        <div style="min-height:400px;">
          <router-view :key="Date.parse(new Date())" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import ToolBar from "../../toolbar/ToolBar";
export default {
  name: "Manage",
  data() {
    return {
      title: "",
      active: ""
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.setActive();
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.setActive();
  },
  methods: {
    setActive() {
      let path = this.$route.name;
      switch (path) {
        case "Write":
          this.title = "撰写博客";
          this.active = "write";
          break;
        case "UpDate":
          this.title = "您正在修改博客";
          this.active = "write";
          break;
        case "BlogManage":
          this.title = "文章管理";
          this.active = "blogmanage";
          break;
        case "Comment":
          this.title = "评论管理";
          this.active = "comment";
          break;
        case "Classify":
          this.title = "分类管理";
          this.active = "classify";
          break;
        case "UserSet":
          this.title = "用户设置";
          this.active = "userset";
          break;
        default:
          break;
      }
    }
  },
  components: {
    // ToolBar
  }
};
</script>

<style scoped>
.container {
  padding: 0;
  background-color: #fff;
}
.top-title {
  border-left: 3px solid #409eff;
  padding: 0 10px;
  margin-bottom: 20px;
  height: 30px;
  line-height: 30px;
}
.top-title h2 {
  font-size: 16px;
}
.margin-top-20 {
  margin-top: 20px;
}
.padding-20 {
  padding: 20px;
}
.padding-15 {
  padding: 15px;
}
</style>


