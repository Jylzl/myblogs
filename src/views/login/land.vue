<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="logo">My-blog</span>
        <div style="float: right; padding: 3px 0">
          <router-link :to="{name:'register'}" style="color:#409EFF;">注册</router-link>
        </div>
      </div>
      <div>
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
          <el-form-item prop="user">
            <el-input placeholder="用户名/邮箱/手机号" v-model="loginForm.user" auto-complete="on" clearable>
              <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input placeholder="密码" v-model="loginForm.pass" type="password" auto-complete="on" clearable>
              <i slot="prefix" class="el-input__icon el-icon-view"></i>
            </el-input>
          </el-form-item>
          <div class="clearfix">
            <div style="width:140px; float:left;">
              <el-form-item prop="code">
                <el-input placeholder="验证码" v-model="loginForm.code" auto-complete="off" @keyup.enter.native="submitForm('loginForm')" clearable>
                </el-input>
              </el-form-item>
            </div>
            <div style="width:138px; float:right;">
              <div class="code" @click="refreshCode" title="刷新验证码">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </div>
          </div>
          <el-button type="primary" @click.native.prevent="submitForm('loginForm')" style="width:100%;" :loading="loading">登陆</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import SIdentify from "../../components/identify/identify.vue";
export default {
  name: "land",
  components: {
    SIdentify
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (value !== this.identifyCode) {
          callback(new Error("验证码错误!"));
        }
        callback();
      }
    };
    return {
      restClass: "el-icon-refresh",
      loading: false,
      loginForm: {
        user: "",
        pass: "",
        code: ""
      },
      loginRules: {
        user: [
          {
            required: true,
            message: "请输入用户名/邮箱/手机号",
            trigger: "blur"
          },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur"
          }
        ],
        code: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      identifyCodes: "1234567890abcdef",
      identifyCode: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("userLand", {
              _this: this,
              loginForm: this.loginForm
            })
            .then(() => {
              this.loading = false;
              const landUserId = this.$store.getters.getLandUserId;
              setTimeout(() => {
                // 登陆成功后1s跳转到列表页
                this.$router.push({
                  name: "ArticleList",
                  params: {
                    userid: landUserId
                  }
                });
              }, 1000);
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            message: "请先填写正确的登陆信息",
            type: "warning"
          });
          return false;
        }
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>
<style scoped>
.logo {
  font-size: 16px;
}
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}
.login::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(255, 256, 257, 0.7);
}
.box-card {
  width: 320px;
  position: absolute;
  right: 260px;
  top: 50%;
  -webkit-transform: translateY(-60%);
  transform: translateY(-60%);
}
.code {
  padding-left: 28px;
  cursor: pointer;
}
</style>


