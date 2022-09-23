export type RowData = {
    key: number
    name: string
    age: string
    address: string
}

export type Sample = {
    word: string,
    cn: string,
    desc: string
}

export type Mean = {
    meaning: string,
    samples: Sample[]
}

export type Etymon = {
    type: number,
    key: number,
    label: string,
    etymons: string[],
    base: string,
    synonym: string,
    means: Mean[]
}

export type EtymonLite = {
    type: number,
    label: string,
    base: string,
    etymons: string[]
}