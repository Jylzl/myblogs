import request from '@/utils/request'

// 文章列表
export function getList(query) {
  return request({
    url: '/getdata/list',
    method: 'get',
    params: query
  })
}
// 文章分类
export function getClassify(query) {
  return request({
    url: '/getdata/classify',
    method: 'get',
    params: query
  })
}
// 用户信息
export function getUser(query) {
  return request({
    url: '/getdata/userinf',
    method: 'get',
    params: query
  })
}
// 最新文章
export function getRecent(query) {
  return request({
    url: '/getdata/recent',
    method: 'get',
    params: query
  })
}
// 热门文章
export function getHostArticle(query) {
  return request({
    url: '/getdata/hostarticle',
    method: 'get',
    params: query
  })
}
// 热门文章
export function getArticle(query) {
  return request({
    url: '/getdata/article',
    method: 'get',
    params: query
  })
}
// 分类统计
export function classifyCount(query) {
  return request({
    url: '/getdata/classifycount',
    method: 'get',
    params: query
  })
}
