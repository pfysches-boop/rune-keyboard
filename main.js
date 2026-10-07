
const input_element  = document.getElementById('ascii-input')
const output_element = document.getElementById('rune-output')


const main_map = [
  [ 'f', 'ᚠ' ],
  [ 'v', 'ᚡ' ],
  [ 'u', 'ᚢ' ],
  [ 'y', 'ᚣ' ],
  [ 'u\\', 'ᚤ' ],
  [ 'y\\', 'ᚥ' ],
  [ 'T', 'ᚦ' ],
  [ 'D', 'ᚧ' ],
  [ 'A', 'ᚨ' ],
  [ 'A\\', 'ᚫ' ],
  [ 'o', 'ᚩ' ],
  [ 'a', 'ᚪ' ],
  [ 'r', 'ᚱ' ],
  [ 'c\\', 'ᚲ' ],
  [ 'c', 'ᚳ' ],
  [ 'G', 'ᚷ' ],
  [ 'g', 'ᚸ' ],
  [ 'w', 'ᚹ' ],
  [ 'h', 'ᚻ' ],
  [ 'h\\', 'ᚺ' ],
  [ 'n', 'ᚾ' ],
  [ 'i', 'ᛁ' ],
  [ 'i\\', 'ᛡ' ],
  [ 'j\\', 'ᛃ' ],
  [ 'j', 'ᛄ' ],
  [ 'e\\', 'ᛇ' ],
  [ 'p', 'ᛈ' ],
  [ 'z', 'ᛉ' ],
  [ 's', 'ᛋ' ],
  [ 's\\', 'ᛊ' ],
  [ 't', 'ᛏ' ],
  [ 'b', 'ᛒ' ],
  [ 'B', 'ᛔ' ],
  [ 'e', 'ᛖ' ],
  [ 'm', 'ᛗ' ],
  [ 'l', 'ᛚ' ],
  [ 'N', 'ᛝ' ],
  [ 'N\\', 'ᛜ' ],
  [ 'd', 'ᛞ' ],
  [ 'O', 'ᛟ' ],
  [ 'a\\', 'ᛠ' ],
  [ 'q', 'ᛢ' ],
  [ 'k', 'ᛣ' ],
  [ 'k\\', 'ᛤ' ],
  [ '.', '᛫' ],
  [ ':', '᛬' ],
  [ '+', '᛭' ],
]
const alias_map = [
  [ 'f\\', 'ᚡ' ],
  [ 'w\\', 'ᚥ' ],
  [ 'T\\', 'ᚧ' ],
  [ 'c\\', 'ᚲ' ],
  [ 'g\\', 'ᚷ' ],
  [ 'x', 'ᛉ' ],
]

const after_map = [

]

const letter_map = [...alias_map, ...main_map].sort(
  (a, b) => (b[0].length - a[0].length)
)

for(const button of document.getElementById('buttons').getElementsByTagName('td')) {
  if(button.innerHTML === '') { continue }
  button.style.border = '3px solid black'
  button.style.borderRadius = '6px'
  button.style.cursor = 'pointer'
  if(!button.className) button.style.backgroundColor = 'white'

  const character = button.accessKey || (button.innerHTML[button.innerHTML.length > 1 ? 1 : 0])

  button.onclick = () => {
    for(const [ key, value ] of main_map) {
      if(value === character) {
        input_element.value += key
        return update()
      }
    }
    
    input_element.value += character
    return update()
  }
}

const update = () => {
  let output = input_element.value

  for(const [ key, value ] of letter_map) {
    output = output.replaceAll(key, value)
  }
  for(const [ key, value ] of after_map) {
    output = output.replaceAll(key, value)
  }

  output_element.value = output
}

input_element.addEventListener('keydown',  update)
input_element.addEventListener('keyup',    update)
input_element.addEventListener('onchange', update)


const copy_indicator = document.getElementById('copy-indicator')
const copy = () => {
  navigator.clipboard.writeText(output_element.value)

  copy_indicator.className = 'fadeinout'
  setTimeout(() => { copy_indicator.className = '' }, 2000)
}

const keys = []
document.addEventListener('keydown', evt => {
  keys[evt.key] = true

  if(keys['Control'] && keys['Shift'] && keys[' ']) copy()

  if(evt.key === 'Escape') aboutMenu.style.visibility = 'hidden'
})
document.addEventListener('keyup', evt => {
  keys[evt.key] = false
})

document.getElementById('copy-button').onclick = copy

document.getElementById('clear-button').onclick = function(evt) {
  input_element.value = ''
  output_element.value = ''
}

