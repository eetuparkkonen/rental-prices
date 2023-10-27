export interface BasicQuery {
    query: BasicQueryParams[]
    response: {
        format: string
    }
}

export interface BasicQueryParams {
    code: string
    selection: Selection
}

export interface Selection {
    filter: string
    values: string[]
}

export interface Root {
    class: string
    label: string
    source: string
    updated: string
    id: string[]
    size: number[]
    dimension: Dimension
    value: number[]
    role: Role
    version: string
    extension: Extension8
  }
  
  export interface Dimension {
    Vuosineljännes: Vuosineljnnes
    Postinumero: Postinumero
    Huoneluku: Huoneluku
    Tiedot: Tiedot
  }
  
  export interface Vuosineljnnes {
    extension: Extension
    label: string
    category: Category
    link: Link
  }
  
  export interface Extension {
    show: string
  }
  
  export interface Category {
    index: Index
    label: Label
  }
  
  export interface Index {
    "2023Q2": number
  }
  
  export interface Label {
    "2023Q2": string
  }
  
  export interface Link {
    describedby: Describedby[]
  }
  
  export interface Describedby {
    extension: Extension2
  }
  
  export interface Extension2 {
    Vuosineljännes: string
  }
  
  export interface Postinumero {
    extension: Extension3
    label: string
    category: Category2
    link: Link2
  }
  
  export interface Extension3 {
    show: string
  }
  
  export interface Category2 {
    index: Index2
    label: Label2
  }
  
  export interface Index2 {
    "00350": number
  }
  
  export interface Label2 {
    "00350": string
  }
  
  export interface Link2 {
    describedby: Describedby2[]
  }
  
  export interface Describedby2 {
    extension: Extension4
  }
  
  export interface Extension4 {
    Postinumero: string
  }
  
  export interface Huoneluku {
    extension: Extension5
    label: string
    category: Category3
    link: Link3
  }
  
  export interface Extension5 {
    show: string
  }
  
  export interface Category3 {
    index: Index3
    label: Label3
  }
  
  export interface Index3 {
    "02": number
  }
  
  export interface Label3 {
    "02": string
  }
  
  export interface Link3 {
    describedby: Describedby3[]
  }
  
  export interface Describedby3 {
    extension: Extension6
  }
  
  export interface Extension6 {
    Huoneluku: string
  }
  
  export interface Tiedot {
    extension: Extension7
    label: string
    category: Category4
  }
  
  export interface Extension7 {
    show: string
  }
  
  export interface Category4 {
    index: Index4
    label: Label4
    unit: Unit
  }
  
  export interface Index4 {
    lkm_ptno: number
  }
  
  export interface Label4 {
    lkm_ptno: string
  }
  
  export interface Unit {
    lkm_ptno: LkmPtno
  }
  
  export interface LkmPtno {
    base: string
    decimals: number
  }
  
  export interface Role {
    time: string[]
    metric: string[]
    geo: string[]
  }
  
  export interface Extension8 {
    px: Px
  }
  
  export interface Px {
    tableid: string
    decimals: number
  }
