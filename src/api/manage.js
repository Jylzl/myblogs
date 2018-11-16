import request from '@/utils/request'

// 文章列表
export function getManageList(query) {
  return request({
    url: '/manage/list',
    method: 'get',
    params: query
  })
}
// 文章发布
export function writeArticle(data) {
  return request({
    url: '/manage/write',
    method: 'post',
    data
  })
}
// 文章删除
export function delArticle(query) {
  return request({
    url: '/manage/delarticle',
    method: 'delete',
    params: query
  })
}
// 分类添加
export function addClassify(data) {
  return request({
    url: '/manage/addclassify',
    method: 'post',
    data
  })
}
// 分类删除
export function delClassify(query) {
  return request({
    url: '/manage/delclassify',
    method: 'delete',
    params: query
  })
}
// 分类修改
export function updateClassify(data) {
  return request({
    url: '/manage/updateclassify',
    method: 'post',
    data
  })
}
// 分类删除
export function getClassify(query) {
  return request({
    url: '/manage/getclassify',
    method: 'get',
    params: query
  })
}
// 文章分类
export function getManageClassify(query) {
  return request({
    url: '/manage/getclassify',
    method: 'get',
    params: query
  })
}
