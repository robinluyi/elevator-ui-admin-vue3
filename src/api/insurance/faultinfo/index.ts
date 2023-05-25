import request from '@/config/axios'

export interface FaultinfoVO {
  id: number
  reparationId: number
  communityPic: string
  unitPic: string
  elevtrPic: string
  faultPic: string
  faultPic2: string
  faultPic3: string
  faultPic4: string
  processInstanceId: string
}

// 查询故障信息子表列表
export const getFaultinfoPage = async (params) => {
  return await request.get({ url: '/insurance/faultinfo/page', params })
}

// 查询故障信息子表详情
export const getFaultinfo = async (id: number) => {
  return await request.get({ url: '/insurance/faultinfo/get?id=' + id })
}

// 新增故障信息子表
export const createFaultinfo = async (data: FaultinfoVO) => {
  return await request.post({ url: '/insurance/faultinfo/create', data })
}

// 修改故障信息子表
export const updateFaultinfo = async (data: FaultinfoVO) => {
  return await request.put({ url: '/insurance/faultinfo/update', data })
}

// 删除故障信息子表
export const deleteFaultinfo = async (id: number) => {
  return await request.delete({ url: '/insurance/faultinfo/delete?id=' + id })
}

// 导出故障信息子表 Excel
export const exportFaultinfoApi = async (params) => {
  return await request.download({ url: '/insurance/faultinfo/export-excel', params })
}
