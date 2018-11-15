import request from '@/utils/request'

// 用户登陆接口
export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// 退出登陆
export function loginOut(data) {
  return request({
    url: '/login/loginout',
    method: 'post',
    data
  })
}
