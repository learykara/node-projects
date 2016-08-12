const { MongoClient } = require('mongodb')

const handleDbError = (command, name, db) => {
  console.error(`Could not ${command} snippet`, name)
  db.close()
}

MongoClient.connect('mongodb://localhost/', (err, db) => {
  if (err) {
    console.error(err)
    db.close()
    return
  }

  const collection = db.collection('snippets')

  const create = (name, content) => {
    let snippet = { name, content }

    collection.insert(snippet, (err, result) => {
      if (err) {
        return handleDbError('create', name, db)
      }
      console.log('Created snippet', name)
      db.close()
    })
  }

  const read = (name) => {
    let query = { name }

    collection.findOne(query, (err, snippet) => {
      if (!snippet || err) {
        return handleDbError('read', name, db)
      }
      console.log('Read snippet', snippet.name)
      console.log(snippet.content)
      db.close()
    })
  }

  const update = (name, content) => {
    let query = { name }
    let update = { $set: { content: content } }

    collection.findAndModify(query, null ,update, (err, result) => {
      let snippet = result.value
      if (!snippet || err) {
        return handleDbError('update', name, db)
      }
      console.log('Updated snippet', snippet.name)
      db.close()
    })
  }

  const del = (name) => {
    let query = { name }

    collection.findAndRemove(query, (err, result) => {
      let snippet = result.value
      if (!snippet || err) {
        return handleDbError('delete', name, db)
      }
      console.log('Deleted snippet', snippet.name)
      db.close()
    })
  }

  const main = () => {
    const command = process.argv[2]
    const name = process.argv[3]
    const content = process.argv[4]

    switch (command) {
      case 'create':
        create(name, content)
        break
      case 'read':
        read(name)
        break
      case 'update':
        update(name, content)
        break
      case 'delete':
        del(name)
        break
      default:
        console.error('Command not recognized')
        db.close()
    }
  }

  main()
})
