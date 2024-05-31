import { api } from '@/services/api'
import { BasicQuery, InputTypes, Root } from '@/types/rentals'

export const getAllRentalPricesBySqM = async (params: InputTypes): Promise<Root[]> => {
  const quarterItems = [
    '2015Q4', '2016Q1', '2016Q2', '2016Q3', '2016Q4',
    '2017Q1', '2017Q2', '2017Q3', '2017Q4',
    '2018Q1', '2018Q2', '2018Q3', '2018Q4',
    '2019Q1', '2019Q2', '2019Q3', '2019Q4',
    '2020Q1', '2020Q2', '2020Q3', '2020Q4',
    '2021Q1', '2021Q2', '2021Q3', '2021Q4',
    '2022Q1', '2022Q2', '2022Q3', '2022Q4',
    '2023Q1', '2023Q2'
  ]

  let returnData: any[] = []

  for (const quarter of quarterItems) {
    const { data } = await api.post('https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/asvu/statfin_asvu_pxt_13eb.px', 
    {
        "query": [
          {
            "code": "Vuosineljännes",
            "selection": {
              "filter": "item",
              "values": [
                quarter
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
    
    returnData.push(data)
  }

  
  
  return returnData
}

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