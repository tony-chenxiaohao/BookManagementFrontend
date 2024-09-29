import request from '@/utils/request'

// 查询权限列表
export function listPrivilege(query) {
  return request({
    url: '/privilege/privilege/list',
    method: 'get',
    params: query
  })
}

// 查询权限详细
export function getPrivilege(id) {
  return request({
    url: '/privilege/privilege/' + id,
    method: 'get'
  })
}

// 新增权限
export function addPrivilege(data) {
  return request({
    url: '/privilege/privilege',
    method: 'post',
    data: data
  })
}

// 修改权限
export function updatePrivilege(data) {
  return request({
    url: '/privilege/privilege',
    method: 'put',
    data: data
  })
}

// 删除权限
export function delPrivilege(id) {
  return request({
    url: '/privilege/privilege/' + id,
    method: 'delete'
  })
}
