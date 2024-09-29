import request from '@/utils/request'

// 查询公告列表
export function listGonggao(query) {
  return request({
    url: '/gonggao/gonggao/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getGonggao(id) {
  return request({
    url: '/gonggao/gonggao/' + id,
    method: 'get'
  })
}

// 新增公告
export function addGonggao(data) {
  return request({
    url: '/gonggao/gonggao',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateGonggao(data) {
  return request({
    url: '/gonggao/gonggao',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delGonggao(id) {
  return request({
    url: '/gonggao/gonggao/' + id,
    method: 'delete'
  })
}
