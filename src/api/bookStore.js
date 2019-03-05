import axios from "axios"
import {rankingApi,rankingByRankIdApi} from "api"
const OK="OK"

export const Get=(url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("hotRecommend get erro"))
    })
  })
}
//排行
export const GetRanking=()=>{
  return new Promise((resolve,reject)=>{
    axios.get(rankingApi).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("rankingApi get erro"))
    })
  })
}
//最热
export const GetHot=(url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(rankingByRankIdApi+url).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("GetHot get erro"))
    })
  })
}
