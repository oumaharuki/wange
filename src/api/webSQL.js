export function function_name() {
  if (window.openDatabase) {
        let db = window.openDatabase('zssq', '1.0', '书架', null)
        db.transaction((tx) => {
          tx.executeSql(`create table if not exists bookcase(bookId,cover,title)`)
          tx.executeSql(`create table if not exists bookcontent(bookId,title,link,content)`)
        })

        db.transaction((tx) => {
          tx.executeSql(`select * from bookcase`, [], (tx1, res) => {
            const list = res.rows
            let filterItem = []
            for (let i = 0; i < list.length; i++) {
              if (list.item(i).bookId === this.des._id) {
                filterItem.push(list.item(i))
              }
            }
            if (filterItem.length === 0) {
              tx.executeSql(`insert into bookcase(bookId,cover,title) values(?,?,?)`,['this.des._id', 'this.des.cover', 'this.des.title'])
            }
          })
        })

        db.transaction((tx) => {
          this.chapters.map(item => {
            tx.executeSql(`select * from bookcontent`, [], (tx2, res) => {
              const list = res.rows
              let filters = []
              for (let i = 0; i < list.length; i++) {
                if (list.item(i).link === item.link) {
                  filters.push(list.item(i))
                }
              }

              if (filters.length === 0) {

                db.transaction((ctx) => {
                  this.getContent(item.link).then((res) => {
                    console.log(res, 'res')
                    console.log(ctx, 'ctx')
                    ctx.executeSql(`insert into bookcontent(bookId,title,link,content) values(?,?,?,?)`, ['this.des._id', 'item.title', 'item.link', 'res.body'], (tx4, result) => {
                      console.log('插入成功')
                    }, (tx3, error) => {
                      window.alert(error.message)
                    })
                  })
                })
                
              }
            })
          })
        })
      } else {
        this.$Message.error('dataBase error')
      }
}