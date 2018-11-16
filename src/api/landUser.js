import request from '@/utils/request'

export function landUserInf(data) {
  return request({
    url: '/landuser/landuserinf',
    method: 'post',
    data
  })
}
export function checkPassword(data) {
  return request({
    url: '/landuser/checkpassword',
    method: 'post',
    data
  })
}
export function updatePassword(data) {
  return request({
    url: '/landuser/updatepassword',
    method: 'post',
    data
  })
}
export function updateUserInf(data) {
  return request({
    url: '/landuser/updateuserinf',
    method: 'post',
    data
  })
}
