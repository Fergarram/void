

{ // Open New Scope
////////////////////


let button = document.getElementById('the-cards-button')
let field = document.getElementById('the-card-textinput')

button.addEventListener('click', (e) => {
    // getRandomSketchName().then( (phrase) => {
    //     field.value = phrase
    // })
})


async function getRandomSketchName() {
  try {
    const response = await axios.get(`${location.href}/threewordthingy.txt`)
    let text = response.data
    let phrases = text.split('\n')
    let randomIndex = Math.floor(Math.random()*phrases.length)
    return phrases[randomIndex]

  } catch (error) {
    console.error(error)
  }
}

////////////////////
} // Close New Scope