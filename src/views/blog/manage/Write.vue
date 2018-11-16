<template>
  <el-form>
    <el-row class="padding-15">
      <el-col :span="4">
        <el-select v-model="article.classify" placeholder="请选择分类" clearable>
          <el-option v-for="item in classifys" :key="item.value" :label="item.classify_name" :value="item.classify_no"></el-option>
        </el-select>
      </el-col>
      <el-col :span="19" :offset="1">
        <el-input v-model="article.title" placeholder="请输入文章标题" :maxlength=256 clearable></el-input>
      </el-col>
    </el-row>
    <el-row class="padding-15">
      <el-col :span="24">
        <editor api-key="udm8u7u1w88b8yqqt0czgf3glqzet1mnbt95at9wv8u6bib3" :init='init' v-model='article.html' :id='tinymceId' @onSelectionChange="handlerFunction"></editor>
        <el-row>
          <el-col :span="24" class="margin-top-15">
            <label>文章标签：</label>
            <el-tag :key="tag" v-for="tag in article.labels" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </el-col>
        </el-row>
        <el-row class="margin-top-15">
          <el-col :span="5">
            <label>文章类型：</label>
            <el-select v-model="article.type" placeholder="请选择" size="mini" style="width:100px;">
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <label>是否置顶：</label>
            <el-checkbox v-model="article.is_top"></el-checkbox>
          </el-col>
          <el-col :span="3" :offset="1">
            <label>仅自己可见：</label>
            <el-checkbox v-model="article.only_self_view"></el-checkbox>
          </el-col>
          <el-col :span="3" :offset="1">
            <label>可否评论：</label>
            <el-checkbox v-model="article.is_comment"></el-checkbox>
          </el-col>
        </el-row>
        <el-row class="margin-top-15">
          <el-col :span="24">
            <el-button type="primary" @click="send" class="el-icon-upload">发表博客</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "../tools/tinymce/tinymce.js";
import { tinymceInit } from "../tools/tinymce/index.js";
import { getClassify } from "@/api/getdata.js";
import { writeArticle } from "@/api/manage.js";
export default {
  name: "Write",
  components: {
    Editor
  },
  data() {
    return {
      //分类
      classifys: [],
      // 文章类型
      types: [
        {
          value: "0",
          label: "原创"
        },
        {
          value: "1",
          label: "转载"
        },
        {
          value: "2",
          label: "翻译"
        }
      ],
      //标签默认配置
      inputVisible: false,
      inputValue: "",

      article: {
        userId: this.$store.getters.getLandUserId,
        //标题
        title: "",
        //HTML代码
        html: "",
        //内容（纯文本）
        content: "",
        // 摘要
        summary: "",
        classify: null,
        //标签
        labels: [],
        type: "0",
        ano: null,
        is_top: false,
        only_self_view: false,
        is_comment: true
      },
      // tinymce配置
      tinymceId: "vue-tinymce-" + Date.now(),
      init: tinymceInit(this)
    };
  },
  computed: {},
  created: function() {
    tinymce.init(this.init);
  },
  mounted() {
    this.getClassifys();
  },
  methods: {
    //HTML转文本
    htmlTotext(str, len) {
      let aa = str.replace(/<[^>]+>/g, ""); //去标签
      let bb = aa.replace(/&nbsp;/gi, ""); //去空格符
      let cc = bb.replace(/\s+/g, ""); //去空格
      let dd = cc.replace(/<\/?.+?>/g, ""); //去回车
      let ee = dd.replace(/[\r\n]/g, ""); //去回车
      if (len === -1) {
        return ee;
      } else {
        return ee.length < len ? ee : ee.substr(0, len) + "...";
      }
    },
    send() {
      this.sendArticle();
    },
    handleClose(tag) {
      this.article.labels.splice(this.article.labels.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.article.labels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // tinymce
    handlerFunction: function() {
      // var html = tinymce.get(this.tinymceId).getContent();
      // var body = tinymce.get(this.tinymceId).getBody();
      // var activeEditor = tinymce.get(this.tinymceId);
      // activeEditor.selection.select(body);
      // var text = tinymce.get(this.tinymceId).getContent({ format: "text" });
      // console.log(html);
      // console.log(body);
      // console.log(text);
    },
    // 获取用户分类
    getClassifys() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getClassify({
          userid: this.article.userId
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
    // 发表文章
    sendArticle() {
      if (
        this.article.title &&
        this.article.summary &&
        this.article.labels.length
      ) {
        const _self = this;
        return new Promise((resolve, reject) => {
          writeArticle(this.article)
            .then(response => {
              const backData = JSON.parse(response.data);
              const msg = backData[0].msg;
              if (msg == 1) {
                const articleNo = backData[1].article_no;
                this.$message({
                  message: "文章发布成功，即将跳转",
                  type: "success"
                });
                setTimeout(
                  function() {
                    this.$router.push(
                      "/blog/" + this.article.userId + "/" + articleNo
                    );
                  }.bind(this),
                  1000
                );
              } else if (msg == 0) {
                this.$message({
                  message: "文章发布失败，请重新发布",
                  type: "warning"
                });
              } else {
                this.$message.error("系统发生未知错误，请稍后再试");
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      } else {
        this.$message({
          message: "请填写博客内容后再次提交",
          type: "warning"
        });
        return;
      }
    }
  },
  computed: {
    timymceHtml() {
      return this.article.html;
    }
  },
  watch: {
    timymceHtml(val, oldVal) {
      this.article.content = this.htmlTotext(val, -1);
      this.article.summary = this.htmlTotext(val, 160);
    }
  }
};
</script>
<style scoped>
.margin-top-20 {
  margin-top: 20px;
}

.padding-20 {
  padding: 20px;
}
.padding-15 {
  padding: 15px;
}
.margin-top-15 {
  margin-top: 15px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
