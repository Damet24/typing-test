import './style.css'

const CHAR_STATES = {
  INACTIVE: 0,
  ACTIVE: 1,
  TRUE: 2,
  FALSE: 3,
  WARNING: 4
}

const text = 'Este es un texto aleatorio generado por mi, Daniel Mercado UwU'
const textInfo = []
let index = 0

const char = (char) => `<span>${char}</span>`

function init () {
  for (const char of text) {
    const testCharInfo = {
      char,
      state: CHAR_STATES.INACTIVE
    }

    textInfo.push(testCharInfo)
  }
}

function render () {
  textInfo.forEach((item) => {
    document.getElementById('text-preview').innerHTML += char(item.char)
  })
  document.getElementById('text-preview').childNodes[index + 1].classList.add('char-active')
}

window.addEventListener('keypress', event => {
  console.log(event)

  const charElement = document.getElementById('text-preview').childNodes[index + 1]

  if (event.key === textInfo[index].char) {
    charElement.classList.add('char-true')
    if (index <= textInfo.length - 1) index++
  } else {
    charElement.classList.add('char-error')
    if (index <= textInfo.length - 1) index++
  }

  charElement.classList.toggle('char-active')
  document.getElementById('text-preview').childNodes[index + 1].classList.toggle('char-active')
})

window.addEventListener('keyup', event => {
  if (event.code === 'Backspace') {
    document.getElementById('text-preview').childNodes[index + 1].classList.remove('char-active')
    if (index > 0) index--

    document.getElementById('text-preview').childNodes[index + 1].className = ''
    document.getElementById('text-preview').childNodes[index + 1].classList.add('char-active')
  }
})

init()
render()
