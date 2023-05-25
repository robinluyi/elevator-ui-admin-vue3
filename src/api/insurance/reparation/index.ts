import request from '@/config/axios'

export interface ReparationVO {
  id: number
  userId: number
  userDeptId: number
  userNickname: string
  userMobile: string
  endusageDeptId: number
  endusageDeptName: string
  endusageDeptManagerId: number
  elevtrId: number
  elevtrNumber: string
  maintainDeptId: number
  maintainDeptName: string
  registrationId: string
  totalPrice: number
  partName: string
  partUnitId: byte
  partUnitPirce: number
  partQuantity: number
  partTotal: byte
  communityPic: string
  unitPic: string
  elevtrPic: string
  faultPic: string
  faultPic2: string
  processInstanceId: string
}

// 查询电梯报修申请列表
export const getReparationPage = async (params) => {
  return await request.get({ url: `/insurance/reparation/page`, params })
}

// 查询电梯报修申请详情
export const getReparation = async (id: number) => {
  return await request.get({ url: `/insurance/reparation/get?id=` + id })
}

// 新增电梯报修申请
export const createReparation = async (data: ReparationVO) => {
  return await request.post({ url: `/insurance/reparation/create`, data })
}

// 修改电梯报修申请
export const updateReparation = async (data: ReparationVO) => {
  return await request.put({ url: `/insurance/reparation/update`, data })
}

// 删除电梯报修申请
export const deleteReparation = async (id: number) => {
  return await request.delete({ url: `/insurance/reparation/delete?id=` + id })
}

// 导出电梯报修申请 Excel
export const exportReparation = async (params) => {
  return await request.download({ url: `/insurance/reparation/export-excel`, params })
}
