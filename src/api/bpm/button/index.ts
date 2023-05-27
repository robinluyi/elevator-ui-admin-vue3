import request from '@/config/axios'

export type ButtonVO = {
  id: number
}

export const get = async (id) => {
  return await request.get({
    url: '/bpm/button/get?id=' + id
  })
}
