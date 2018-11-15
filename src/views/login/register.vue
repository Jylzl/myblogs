<template>
    <div class="register">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>欢迎注册</span>
                <div style="float: right; padding: 3px 0">
                    <router-link :to="{name:'land'}" style="color:#409EFF;">切换到登陆</router-link>
                </div>
            </div>
            <div>
                <el-steps :active="number" align-center finish-status="success">
                    <el-step title="创建账户" icon="el-icon-edit"></el-step>
                    <el-step title="身份信息" icon="el-icon-setting"></el-step>
                    <el-step title="博客信息" icon="el-icon-upload"></el-step>
                    <el-step title="完成" icon="el-icon-circle-check-outline"></el-step>
                </el-steps>
            </div>
            <div>
                <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px" :status-icon=true class="register-ruleForm">
                    <div v-if="number == 1">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="registerForm.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input type="email" v-model="registerForm.email" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" required>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item prop="areaCode">
                                        <el-select v-model="registerForm.areaCode" placeholder="请选择">
                                            <el-option style="min-width:180px;" v-for="item in areaCodes" :key="item.code" :label="item.code" :value="item.code">
                                                <span class="fl">{{item.code}}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px">{{item.name}}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="15" :offset="1">
                                    <el-form-item prop="telNumber">
                                        <el-input type="tel" v-model="registerForm.telNumber" placeholder="手机号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="验证码" prop="verificationCode">
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="registerForm.verificationCode" placeholder="验证码"></el-input>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-button type="primary" plain style="width:100%;">发送验证码</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </div>
                    <div v-else-if="number == 2">
                        <el-form-item label="设置密码" prop="passWord">
                            <el-input v-model="registerForm.passWord" type="password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="rPassWord">
                            <el-input v-model="registerForm.rPassWord" type="password" placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="密保问题" prop="question">
                            <el-select v-model="registerForm.question" placeholder="请选择密保问题" style="width:100%;">
                                <el-option v-for="(item , index) in questions" :key="item.security_no" :label="item.security_content" :value="item.security_no">
                                    <span class="fl">{{index+1}}.{{item.security_content}}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{item.security_no}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密保答案" prop="answer">
                            <el-input v-model="registerForm.answer" placeholder="请输入密保答案"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else-if="number == 3">
                        <el-row>
                            <el-col :span="17">
                                <el-form-item label="博客名称" prop="blogName">
                                    <el-input v-model="registerForm.blogName" placeholder="请输入博客称呼"></el-input>
                                </el-form-item>
                                <el-form-item label="博客简介" prop="blogTitle">
                                    <el-input v-model="registerForm.blogTitle" placeholder="请输入一段文字描述你的博客"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" :offset="1">
                                <el-upload class="avatar-uploader fr" :action="uploadHeadImageApi" :show-file-list="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" title="点击上传头像" name='userimg'>
                                    <img v-if="registerForm.imageUrl" :src="registerForm.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-col>
                        </el-row>
                        <el-form-item label="选择头像" prop="imgType">
                            <el-radio v-model="registerForm.imgType" label="1">使用我上传的头像</el-radio>
                            <el-radio v-model="registerForm.imgType" label="2">使用gravatar头像</el-radio>
                        </el-form-item>
                        <el-form-item label="GitHub">
                            <el-input v-model="registerForm.github" placeholder="请输入你的GitHub主页地址"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <p class="success-info">恭喜你，注册成功！！以下是您的注册信息</p>
                        <el-form-item label="用户名">
                            <el-input v-model="backDataForm.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="backDataForm.telNumber" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="backDataForm.email" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="密保问题">
                            <el-input v-model="backDataForm.question" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="密保答案">
                            <el-input v-model="backDataForm.answer" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="previous()" v-if="number != 1 && number != 4">上一步</el-button>
                        <el-button type="primary" @click="submitForm('registerForm')" v-if="number != 4">{{btnname}}</el-button>
                        <el-button @click="resetForm('registerForm')" v-if="number != 4">重置</el-button>
                        <el-button type="success" @click="goLand()" v-if="number == 4">我要登陆</el-button>
                        <el-button type="info" @click="downInf()" v-if="number == 4" class="fr">妥善保存到本地
                            <i class="el-icon-download"></i>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import {
  getSecurity,
  register,
  checkName,
  checkEmail,
  checkPhone,
  uploadHeadImage
} from "@/api/register.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.rPassWord !== "") {
          this.$refs.registerForm.validateField("rPassWord");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var phone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!Number.isInteger(Number(value))) {
        callback(new Error("手机号码只能为数字"));
      } else {
        return new Promise((resolve, reject) => {
          checkPhone({
            phone: value
          })
            .then(response => {
              const backData = JSON.parse(response.data);
              const msg = backData.msg;
              if (msg == 1) {
                callback(new Error("手机号已经被注册"));
              } else {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      }
    };
    var validateName = (rule, value, callback) => {
      if (value) {
        return new Promise((resolve, reject) => {
          checkName({
            name: value
          })
            .then(response => {
              const backData = JSON.parse(response.data);
              const msg = backData.msg;
              if (msg == 1) {
                callback(new Error("用户名已经被注册"));
              } else {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value) {
        return new Promise((resolve, reject) => {
          checkEmail({
            email: value
          })
            .then(response => {
              const backData = JSON.parse(response.data);
              const msg = backData.msg;
              if (msg == 1) {
                callback(new Error("邮箱已经被注册"));
              } else {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      } else {
        callback();
      }
    };
    return {
      uploadHeadImageApi: "",
      btnname: "下一步",
      areaCodes: [
        {
          name: "中国大陆",
          code: "0086"
        },
        {
          name: "中国台湾",
          code: "0886"
        },
        {
          name: "美国",
          code: "0001"
        }
      ],
      questions: [],
      number: 1,
      registerForm: {
        name: "", //用户名
        email: "", //用户邮箱
        areaCode: "0086", //国际区号
        telNumber: null, //手机号
        verificationCode: "", //验证码
        passWord: "", //密码
        rPassWord: "", //确认密码
        question: "", //密保问题
        answer: "", //密保答案
        blogName: "", //博客名称
        blogTitle: "", //博客标题
        imgType: "2", //选择头像
        imageUrl: "", //头像地址
        github: "" //github地址
      },
      backDataForm: {
        name: "", //用户名
        email: "", //用户邮箱
        areaCode: "", //国际区号
        telNumber: null, //手机号
        question: "", //密保问题
        answer: "" //密保答案
      },
      registerRules: {
        // 用户名验证
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          },
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        // 邮箱验证
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "change"
          },
          {
            validator: validateEmail,
            trigger: "blur"
          }
        ],
        // 区号验证
        areaCode: {
          required: true,
          message: "请选择区号",
          trigger: "change"
        },
        // 手机号验证
        telNumber: [
          {
            min: 11,
            max: 11,
            message: "手机号格式不正确",
            trigger: "change"
          },
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change"
          },
          {
            validator: phone,
            trigger: "change"
          }
        ],
        // 验证码
        verificationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "change"
          }
        ],
        // 密码验证
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          },
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        // 确认密码验证
        rPassWord: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "change"
          },
          {
            validator: validatePass2,
            trigger: "change"
          }
        ],
        // 密保问题验证
        question: {
          required: true,
          message: "请选择一个密保问题",
          trigger: "change"
        },
        // 密保答案验证
        answer: [
          {
            required: true,
            message: "请输入密保答案",
            trigger: "change"
          },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "change"
          }
        ],
        //博客名称验证
        blogName: [
          {
            required: true,
            message: "请输入博客名称",
            trigger: "change"
          },
          {
            min: 4,
            max: 8,
            message: "长度在 4 到 8 个字符",
            trigger: "change"
          }
        ],
        // 博客标题验证
        blogTitle: [
          {
            required: true,
            message: "请输入博客介绍",
            trigger: "change"
          },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "change"
          }
        ],
        //头像选择验证
        imgType: [
          {
            required: true,
            message: "请选择一个头像方式",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    previous() {
      if (this.number > 0) {
        this.number -= 1;
      } else {
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.number += 1;
          if (this.number == 3) {
            this.btnname = "提交 ";
          } else if (this.number == 4) {
            // axios提交表单
            const _self = this;
            return new Promise((resolve, reject) => {
              register(_self.registerForm)
                .then(response => {
                  const backData = JSON.parse(response.data);
                  const msg = backData[0].msg;
                  if (msg == 1) {
                    this.backDataForm.name = backData[1].name;
                    this.backDataForm.email = backData[1].email;
                    this.backDataForm.telNumber = backData[1].phone;
                    this.backDataForm.question = backData[1].securityNo;
                    this.backDataForm.answer = backData[1].securityAnswer;
                    this.$message({
                      message: "注册成功,请妥善保管您的登陆信息",
                      type: "success"
                    });
                  } else if (msg == 0) {
                    this.$message({
                      message: "注册失败，请重新注册",
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
            return false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.registerForm.imageUrl = res.path;
      this.registerForm.imgType = "1";
      // this.registerForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    goLand() {
      this.$router.push("/login");
    },
    downInf() {
      //下载信息打本地
    },
    security() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getSecurity()
          .then(response => {
            const backData = JSON.parse(response.data);
            const msg = backData[0].msg;
            if (msg == 1) {
              const security = backData[1].security;
              _self.questions = security;
            } else {
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
    this.security();
    this.uploadHeadImageApi = uploadHeadImage();
  }
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}
.register::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(255, 256, 257, 0.7);
}
.box-card {
  width: 720px;
  min-height: 520px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.register-ruleForm {
  width: 500px;
  margin: 30px auto;
}
.avatar-uploader,
.el-upload {
  width: 100px;
  height: 100px;
  padding: 4px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
.success-info {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: #666;
}
</style>

