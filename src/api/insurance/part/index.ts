import request from '@/config/axios'

export interface PartVO {
  id: number
  reparationId: number
  partName: string
  partUnitId: byte
  partUnitPirce: number
  partQuantity: number
  partTotal: number
  processInstanceId: string
}

// 查询报修零件子表列表
export const getPartPage = async (params) => {
  return await request.get({ url: '/insurance/part/page', params })
}

// 查询报修零件子表详情
export const getPart = async (id: number) => {
  return await request.get({ url: '/insurance/part/get?id=' + id })
}

// 新增报修零件子表
export const createPart = async (data: PartVO) => {
  return await request.post({ url: '/insurance/part/create', data })
}

// 修改报修零件子表
export const updatePart = async (data: PartVO) => {
  return await request.put({ url: '/insurance/part/update', data })
}

// 删除报修零件子表
export const deletePart = async (id: number) => {
  return await request.delete({ url: '/insurance/part/delete?id=' + id })
}

// 导出报修零件子表 Excel
export const exportPartApi = async (params) => {
  return await request.download({ url: '/insurance/part/export-excel', params })
}
