import { api } from '@/services/api'
import { BasicQuery, Root } from '@/types/rentals'

export const getRentalPricesBySqM = async (params: BasicQuery): Promise<Root> => {
    const { data } = await api.post('https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/asvu/statfin_asvu_pxt_13eb.px', params)
    
    return data
}