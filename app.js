const AssistantV1 = require('watson-developer-cloud/assistant/v1')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(express.static('./public'))
const port = 3000

const assistant = new AssistantV1({
  username: '72c3aec2-ba23-4505-b8e1-e769f14dc6e5',
  password: 'qPJJ88pXNyXn',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-07-11',
})

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body

  const params = {
    input: { text },
    workspace_id: '7317f400-11d5-4f2e-93d7-1f0ceec622d6',
    context,
  }

  assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err)

    res.json(response)
  })
})

app.listen(port, () => console.log(`Running on port ${port}`))

// {
//   "url": "https://gateway.watsonplatform.net/assistant/api",
//   "username": "72c3aec2-ba23-4505-b8e1-e769f14dc6e5",
//   "password": "qPJJ88pXNyXn"
// }

// 7317f400-11d5-4f2e-93d7-1f0ceec622d6
