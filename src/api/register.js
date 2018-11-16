import request from '@/utils/request'
const api = process.env.API_ROOT;
// 获取密保问题
export function getSecurity(query) {
  return request({
    url: '/register/security',
    method: 'get',
    params: query
  })
}
// 用户注册接口
export function register(data) {
  return request({
    url: '/register/register',
    method: 'post',
    data
  })
}
// 用户名检测
export function checkName(data) {
  return request({
    url: '/register/checkname',
    method: 'post',
    data
  })
}
// 邮箱检测
export function checkEmail(data) {
  return request({
    url: '/register/checkemail',
    method: 'post',
    data
  })
}
// 手机号检测
export function checkPhone(data) {
  return request({
    url: '/register/checkphone',
    method: 'post',
    data
  })
}
// 头像上传
export function uploadHeadImage() {
  return api + '/upload/headImage'
}
