import request from '@/config/axios'

interface PartVO {
  id: number
  reparationId: number
  partName: string
  partUnitId: number
  partUnitPirce: number
  partQuantity: number
  partTotal: number
  processInstanceId: string
}
interface FaultVO {
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
export interface ReparationPartVO {
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
  processInstanceId: string
  totalPrice: number
  parts: PartVO[]
  faults: FaultVO[]
}

// 查询电梯报修申请列表
export const getReparationPartPage = async (params) => {
  return await request.get({ url: '/insurance/reparationpart/page', params })
}

// 查询电梯报修申请详情
export const getReparationPart = async (id: number) => {
  return await request.get({ url: '/insurance/reparationpart/get?id=' + id })
}

// 新增电梯报修申请
export const createReparationPart = async (data: ReparationPartVO) => {
  return await request.post({ url: '/insurance/reparationpart/create', data })
}

// 修改电梯报修申请
export const updateReparationPart = async (data: ReparationPartVO) => {
  return await request.put({ url: '/insurance/reparationpart/update', data })
}

// 删除电梯报修申请
export const deleteReparationPart = async (id: number) => {
  return await request.delete({ url: '/insurance/reparationpart/delete?id=' + id })
}

// // 导出电梯报修申请 Excel
// export const exportReparationPartApi = async (params) => {
//   return await request.download({ url: '/insurance/reparationpart/export-excel', params })
// }
