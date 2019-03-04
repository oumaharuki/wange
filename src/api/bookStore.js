import axios from "axios"

const OK="OK"

export const Get=(url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("hotRecommend get erro"))
    })
  })
}
