import axios from "axios"
const OK="OK"
/*
* 分类获取
*
* */
export const cats=(url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("cats get erro"))
    })
  })
}