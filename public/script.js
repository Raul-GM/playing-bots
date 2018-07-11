const textInput = document.getElementById('textInput')
const chat = document.getElementById('chat')

let context = {}

const chatMessageTemplate = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
`

const InsertTemplateInChat = template => {
  const div = document.createElement('div')
  div.innerHTML = template
  chat.appendChild(div)
}

const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = `http://localhost:3000/conversation/`

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json()

  context = response.context

  const template = chatMessageTemplate(response.output.text, 'watson')
  InsertTemplateInChat(template)
}

textInput.addEventListener('keydown', event => {
  if (event.keyCode === 13 && textInput.value) {
    getWatsonMessageAndInsertTemplate(textInput.value)

    const template = chatMessageTemplate(textInput.value, 'user')
    InsertTemplateInChat(template)

    textInput.value = ''
  }
})

getWatsonMessageAndInsertTemplate()
