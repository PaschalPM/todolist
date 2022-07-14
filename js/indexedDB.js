let requestIndexedDB = () => {
    const dbName = "todolistDB",
        storeName = "todolistStore",
        indexName = "taskIdx",
        version = 1.1

    return new Promise((res, rej) => {
        let request, db, tx, store, index

        request = indexedDB.open(dbName, version)
        request.addEventListener("upgradeneeded", ({
            target
        }) => {
            db = target.result
            store = db.createObjectStore(storeName, {
                keyPath:"createdAt"
            })
            index = store.createIndex(indexName, indexName, {
                unique: false
            })
        })


        request.addEventListener("success", ({
            target
        }) => {
            db = target.result
            tx = db.transaction(storeName, "readwrite")
            store = tx.objectStore(storeName)
            index = store.index(indexName)
            res({
                db,
                tx,
                store,
                index
            })
        })
    })
}

let putData = async (dataObj, cb) => {
    let {
        db,
        tx,
        store
    } = await requestIndexedDB()
    let storedData = store.put(dataObj)
    storedData.onsuccess = () => {
        cb()
    }
    tx.oncomplete = () => {
        db.close()
    }
}

let getAllData = async (cb) => {
    let {
        db,
        tx,
        store
    } = await requestIndexedDB()
    let allData = store.getAll()
    allData.onsuccess = ({
        target: {
            result
        }
    }) => {
        cb(result)
    }
    tx.oncomplete = () => {
        db.close()
    }
}

let deleteData = async (id, cb) => {
    let {
        db,
        tx,
        store
    } = await requestIndexedDB()
    
    let deletedDataObj = store.delete(id)

    deletedDataObj.onsuccess = () => {
        cb()
    }
    tx.oncomplete = () => {
        db.close()
    }
}

let clearData = async (cb) => {
    let {
        db,
        tx,
        store
    } = await requestIndexedDB()
    let clearStoredData = store.clear()
    clearStoredData.onsuccess = () => {
        cb()
    }
    tx.oncomplete = () => {
        db.close()
    }
}
