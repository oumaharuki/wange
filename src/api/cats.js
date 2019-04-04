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
    }).catch(err => {
      console.log(err, 'err')
    })
  })
}
/*
* 有参get
* */
export const get=(url,data)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url,{params:data}).then((res)=>{
      res.status==200&&res.statusText==OK?resolve(res.data):
        reject(new Error("cats get erro"))
    }).catch(err => {
      console.log(err, 'err')
    })
  })
}
