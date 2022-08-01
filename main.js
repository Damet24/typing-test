import './style.css'

function charActive (char) {
  return `<span class="char-active">${char}</span>`
}

function charInactive (char) {
  return `<span   >${char}</span>`
}

function charTrue (char) {
  return `<span class="char-true">${char}</span>`
}

function charWarning (char) {
  return `<span class="char-warning">${char}</span>`
}

function charError (char) {
  return `<span class="char-error">${char}</span>`
}

const CHAR_STATES = {
  INACTIVE: 0,
  ACTIVE: 1,
  TRUE: 2,
  FALSE: 3,
  WARNING: 4
}

const CHAR_CLASSES = {
  [CHAR_STATES.INACTIVE]: '',
  [CHAR_STATES.ACTIVE]: 'char-active',
  [CHAR_STATES.TRUE]: 'char-true',
  [CHAR_STATES.FALSE]: 'char-error',
  [CHAR_STATES.WARNING]: 'char-warning'
}

const ignoredKeys = ['Control', 'Shift', 'CapsLock', 'Escape', 'Alt']
const texto = 'La mecanografía'
const textoInfo = []
let index = 0

function init (string) {
  for (const char of string) {
    textoInfo.push({
      char,
      state: CHAR_STATES.INACTIVE
    })
  }
  textoInfo[0].state = CHAR_STATES.ACTIVE
}

function render (data) {
  let html = ''
  for (const char of data) {
    switch (char.state) {
      case CHAR_STATES.INACTIVE:
        html += charInactive(char.char)
        break

      case CHAR_STATES.ACTIVE:
        html += charActive(char.char)
        break

      case CHAR_STATES.TRUE:
        html += charTrue(char.char)
        break

      case CHAR_STATES.FALSE:
        html += charError(char.char)
        break

      case CHAR_STATES.WARNING:
        html += charWarning(char.char)
        break
    }
  }

  document.getElementById('text-preview').innerHTML = html
}

function update (index) {
  const textContent = document.getElementById('text-preview')
  textContent.childNodes[index - 1].removeAttribute('class')

  const char = textoInfo[index - 1]
  console.log(char)
  textContent.childNodes[index - 1].classList.add(CHAR_CLASSES[textoInfo[index - 1].state])
  textContent.childNodes[index].classList.add(CHAR_CLASSES[textoInfo[index].state])
}

function check (event) {
  console.log(textoInfo)
  if (index <= texto.length - 1) {
    if (event.key === 'Backspace') {
      textoInfo[index].state = CHAR_STATES.INACTIVE
      if (index > 0)index--
    } else if (!ignoredKeys.includes(event.key)) {
      if (texto[index] === event.key) {
        textoInfo[index].state = CHAR_STATES.TRUE
      } else textoInfo[index].state = CHAR_STATES.FALSE
      index++
      if (index <= texto.length - 1) textoInfo[index].state = CHAR_STATES.ACTIVE
    }
  }
  console.log(textoInfo)
}

init(texto)
render(textoInfo)

document.addEventListener('keyup', event => {
  check(event)
  update(index)
})
