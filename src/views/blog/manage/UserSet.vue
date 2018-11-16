<template>
  <div>
    <el-row class="padding-15 margin-top-15">
      <el-col :span="24">
        <el-form :model="userInform" :rules="userInformRules" ref="userInform" label-width="120px" status-icon>
          <el-form-item label="博客标题：" prop="blogtitle">
            <el-input v-model="userInform.blogtitle" placeholder="用户名" title="最大长度8位" clearable></el-input>
          </el-form-item>
          <el-form-item label="博客描述：" prop="introduction">
            <el-input v-model="userInform.introduction" placeholder="输入博客描述" title="最大长度20位" clearable></el-input>
          </el-form-item>
          <el-form-item label="Github地址：" prop="github">
            <el-input type="url" v-model="userInform.github" placeholder="输入Github地址：(请填写完整地址，包括http/https)" title="该地址应包含http/https" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeInform('userInform')">保存</el-button>
            <el-button type="primary" @click="resetForm('userInform')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="top-title">
          <h2>密码修改</h2>
        </div>
        <el-form :model="password" :rules="passwordRules" ref="password" label-width="120px" status-icon>
          <el-form-item label="用户名：">
            <el-input v-model="password.uname" placeholder="用户名" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码：" prop="oldpswd">
            <el-input type="password" v-model="password.oldpswd" placeholder="旧密码" title="最大长度8位" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="pass">
            <el-input type="password" v-model="password.pass" placeholder="新密码" title="最大长度20位" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="password.checkPass" placeholder="确认密码" title="最大长度20位" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePswd('password')">保存</el-button>
            <el-button type="primary" @click="resetForm('password')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { setCookie, getCookie, delCookie } from "../../assets/js/cookie";
import {
  checkPassword,
  updatePassword,
  updateUserInf
} from "@/api/landUser.js";
export default {
  name: "UserSet",
  data() {
    //密码验证规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value === this.password.oldpswd) {
        callback(new Error("请重新设置密码，以区别旧密码"));
      } else {
        if (this.password.checkPass !== "") {
          this.$refs.password.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.password.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var oldpswd = (rele, value, callback) => {
      const _self = this;
      return new Promise((resolve, reject) => {
        checkPassword({
          pswd: value,
          userId: this.$store.getters.getLandUserId
        })
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 1) {
              callback();
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message:
                  '<span>如果忘记密码，请前往<a href="/register" style="color:#409EFF;padding:0 5px;">密码中心</a>重置密码</span>'
              });
              callback(new Error("如果忘记密码，请前往登陆页重置密码"));
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    };
    return {
      userInform: {
        blogtitle: "",
        introduction: "",
        github: ""
      },
      password: {
        uname: "",
        oldpswd: "",
        pass: "",
        checkPass: ""
      },
      //注册表单验证规则
      passwordRules: {
        oldpswd: [
          {
            required: true,
            validator: oldpswd,
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      userInformRules: {
        blogtitle: [
          {
            required: true,
            message: "请输入博客标题",
            trigger: "blur"
          },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur"
          }
        ],
        introduction: [
          {
            required: true,
            message: "请输入博客描述",
            trigger: "blur"
          },
          {
            min: 4,
            max: 32,
            message: "长度在 4 到 32 个字符",
            trigger: "blur"
          }
        ],
        github: [
          {
            required: false,
            message: "请输入GitHub地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {
    var landUserInf = this.$store.getters.getLandUser;
    this.userInform.blogtitle = landUserInf.user_blog_title;
    this.userInform.introduction = landUserInf.user_blog_introduction;
    this.userInform.github = landUserInf.user_github;
    this.password.uname = landUserInf.user_name;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //提交用户信息修改from
    changeInform(formName) {
      this.$refs[formName].validate(valid => {
        let data = {
          userId: this.$store.getters.getLandUserId,
          blogtitle: this.userInform.blogtitle,
          introduction: this.userInform.introduction,
          github: this.userInform.github
        };
        if (valid) {
          const _self = this;
          return new Promise((resolve, reject) => {
            updateUserInf(data)
              .then(response => {
                const backData = JSON.parse(response.data);
                const msg = backData[0].msg;
                if (msg == 1) {
                  this.$message({
                    message: "用户信息设置成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "您未进行任何修改，请先修改后再提交",
                    type: "warning"
                  });
                }
              })
              .catch(err => {
                console.log(err);
                reject(false);
              });
          });
        } else {
          this.$message({
            message: "请检查信息，重新提交",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改密码
    changePswd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _self = this;
          return new Promise((resolve, reject) => {
            updatePassword({
              userId: this.$store.getters.getLandUserId,
              oldPswd: this.password.oldpswd,
              newPswd: this.password.pass
            })
              .then(response => {
                const backData = JSON.parse(response.data);
                const msg = backData[0].msg;
                if (msg == 1) {
                  this.$message({
                    message:
                      "密码修改成功，即将跳转至登陆页面，请使用新密码登陆",
                    type: "success"
                  });
                  setTimeout(() => {
                    //清除登陆信息，跳到登陆页面
                    this.$router.push("/login");
                  }, 1000);
                } else {
                  this.$message.error("密码修改失败");
                }
              })
              .catch(err => {
                console.log(err);
                reject(false);
              });
          });
        } else {
          this.$message.error("请认真填写修改信息");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
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
</style>

