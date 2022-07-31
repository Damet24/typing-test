import './style.css'

function charActive (char) {
  return `<span class="char-active">${char}</span>`
}

function charInactive (char) {
  return `<span >${char}</span>`
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
const ignoredKeys = ['Control', 'Shift', 'CapsLock', 'Escape', 'Alt']
const texto = 'La mecanografía es el proceso de introducir texto o caracteres alfanuméricos en un dispositivo por medio de un teclado como los que poseen las máquinas de escribir, los ordenadores y las calculadoras.'
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

function check (event) {
  if (!ignoredKeys.includes(event.key) && index <= texto.length - 1) {
    if (texto[index] === event.key) {
      textoInfo[index].state = CHAR_STATES.TRUE
    } else textoInfo[index].state = CHAR_STATES.FALSE
    index++
    if (index <= texto.length - 1) textoInfo[index].state = CHAR_STATES.ACTIVE
  }
}

init(texto)
render(textoInfo)

document.addEventListener('keyup', event => {
  check(event)
  render(textoInfo)
})
