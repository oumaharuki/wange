// 打开或者创建数据库
export function openDB (version) {
  console.log(version, 'version')
  return new Promise((resolve, reject) => {
  	let db
    let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
  	if (!indexedDB) {
  	  reject('您的设备不支持该功能')
  	}

  	let openDBRequest = indexedDB.open('zssq', version)
  	openDBRequest.onsuccess = (e) => {
  	  db = e.target.result
  	  resolve(db)
  	}

  	openDBRequest.onerror = (e) => {
  	  reject(e.currentTarget.error.message)
  	}

  	openDBRequest.onupgradeneeded = (e) => {
  	  db = e.target.result
  	  console.log('cccc')
  	  if (!db.objectStoreNames.contains('bookcontent')) {
  	  	let objectStore = db.createObjectStore('bookcontent', {keyPath: 'link', unique: false})
  	  }

  	  if (!db.objectStoreNames.contains('bookcase')) {
  	  	let objectStore = db.createObjectStore('bookcase', {keyPath: '_id', unique: false})
  	  }

      if (!db.objectStoreNames.contains('readyrecord')) {
        let objectStore = db.createObjectStore('readyrecord', {keyPath: 'id', unique: false})
      }

      if (!db.objectStoreNames.contains('cache')) {
        let objectStore = db.createObjectStore('cache', {keyPath: 'id', unique: false})
      }
  	  // resolve(db)
  	}
  })
}

// 关闭数据库
export function closeDB (db) {
  if (!db) {
  	return
  }
  db.close()
  console.log('数据库已关闭')
}

// 给指定表添加数据
export function addData (params) {
  let {db, table, tableSon, keyPath} = params
  if (!db) {
  	return
  }
  return new Promise((resolve, reject) => {
  	let transaction = db.transaction(table, 'readwrite')
  	let store = transaction.objectStore(table)

  	let addTableSon = store.add(tableSon)
  	addTableSon.onsuccess = () => {
  	  resolve()
  	}

  	addTableSon.onerror = (e) => {
  	  reject(e.target.error)
  	}
  })
}

// 给指定表删除数据
export function delData (db, keyPath, table) {
  if (!db || !keyPath) {
  	return
  }
  return new Promise((resolve, reject) => {
  	let transaction = db.transaction(table, 'readwrite')
  	let store = transaction.objectStore(table)

  	let delTableSon = store.delete(keyPath)

  	delTableSon.onsuccess = () => {
  	  resolve()
  	}

  	delTableSon.onerror = (e) => {
  	  reject(e.target.error)
  	}
  })
}

// 查询指定表的指定数据
export function getDataBySome (db, table, keyPath) {
  if (!db || !table || !keyPath) {
  	return
  }
  return new Promise((resolve, reject) => {
    let data = {}
  	let transaction = db.transaction(table, 'readwrite')
  	let store = transaction.objectStore(table)

  	let dataRequest = store.get(keyPath)
  	dataRequest.onsuccess = (e) => {
      const result = e.target.result
      if (result && result !== null) {
        data = result
        resolve(data)
      } else {
        resolve(data)
      }
  	}

  	dataRequest.onerror = (e) => {
  	  reject(e.target.error.message)
  	}
  })
}

// 查询指定表的所有数据
export function getDataAll (db, table) {
  if (!db || !table) {
  	return
  }
  return new Promise((resolve, reject) => {
  	let transaction = db.transaction(table, 'readwrite')
  	let store = transaction.objectStore(table)

  	let dataRequest = store.openCursor()
  	let data = []
  	dataRequest.onsuccess = (e) => {
  	  let result = e.target.result
  	  if (result && result !== null) {
  	  	data.push(result.value)
  	  	result.continue()
  	  } else {
  	  	resolve(data)
  	  }
  	}

  	dataRequest.onerror = (e) => {
  	  reject(e.target.error.message)
  	}
  })
}

// 修改数据
export function upData (db, table, data) {
  // data = {key: val, key: val, ……}
  if (!db || !table || !data) {
    return
  }
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(table, 'readwrite')
    let store = transaction.objectStore(table)

    let upRequest = store.put(data)
    upRequest.onsuccess = () => {
      resolve()
    }
    upRequest.onerror = () => {
      reject()
    }
  })
}
