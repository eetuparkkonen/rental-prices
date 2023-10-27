import { api } from '@/services/api'
import { BasicQuery, InputTypes, Root } from '@/types/rentals'

export const getRentalPricesBySqM = async (params: InputTypes): Promise<Root> => {
    const { data } = await api.post('https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/asvu/statfin_asvu_pxt_13eb.px', 
    {
        "query": [
          {
            "code": "Vuosineljännes",
            "selection": {
              "filter": "item",
              "values": [
                params.quarter
              ]
            }
          },
          {
            "code": "Postinumero",
            "selection": {
              "filter": "item",
              "values": [
                params.postal
              ]
            }
          },
          {
            "code": "Huoneluku",
            "selection": {
              "filter": "item",
              "values": [
                params.rooms
              ]
            }
          },
          {
            "code": "Tiedot",
            "selection": {
              "filter": "item",
              "values": [
                "keskivuokra"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      })
    
    return data
}