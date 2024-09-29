import request from '@/utils/request'

// 查询图书信息列表
export function listBooks(query) {
  return request({
    url: '/system/books/list',
    method: 'get',
    params: query
  })
}

// 查询图书信息详细
export function getBooks(id) {
  return request({
    url: '/system/books/' + id,
    method: 'get'
  })
}

// 新增图书信息
export function addBooks(data) {
  return request({
    url: '/system/books',
    method: 'post',
    data: data
  })
}

// 修改图书信息
export function updateBooks(data) {
  return request({
    url: '/system/books',
    method: 'put',
    data: data
  })
}

// 删除图书信息
export function delBooks(id) {
  return request({
    url: '/system/books/' + id,
    method: 'delete'
  })
}
