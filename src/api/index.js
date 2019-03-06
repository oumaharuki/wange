import axios from "axios"

const OK="OK"

const api="api"
const img="img"
export const catsApi=api+"/cats/lv2/statistics"
export const rankingApi=api+"/ranking/gender"
export const hotRecommendApi=api+"/ranking/54d43437d47d13ff21cad58b"
export const rankingByRankIdApi=api+"/ranking/"

export const statics="http://statics.zhuishushenqi.com"
// 获取分类
// export const catsApi = api + '/cats/lv2/statistics'

// 根据分类获取小说列表
export const booksByCategories = api + '/book/by-categories'
