/* =============
  VARIBALES
=============== */
const card = document.querySelector('.card')
const score = card.querySelector('.user-score')
const scoreValue = parseInt(score.getAttribute('data-max'))

/* =============
  FUNCTIONS
=============== */
function displayCategoryItems () {
  const url = 'js/data.json'
  fetch(url)
    .then(response => response.json())
    .then(items => {
      const categoryList = card.querySelector('.summary__categories')
      const fragment = document.createDocumentFragment()

      items.forEach(item => {
        const listItem = document.createElement('li')
        const id = item.category.toLowerCase()
        listItem.innerHTML = `
      <img src="${item.icon}" alt="">
      <p id="${id}" class="category">Reaction</p>
      <p><span class="score" data-max="${item.score}">${item.score}</span><span> / 100</span></p>
      `
        fragment.appendChild(listItem)
      })

      categoryList.appendChild(fragment)
    })
    .then(items => {
      const listItems = [...card.querySelector('.summary__categories').children]

      listItems.forEach(listItem => {
        const result = listItem.querySelector('.score')
        const max = result.getAttribute('data-max')

        increaseNumber(0, max, result)

        console.log(max)
        console.log(result)
      })
    })
}

function setAttribute (element) {
  element.setAttribute('data-value', 'max')
}

function animateNumber (tempValue, maxValue, element) {
  if (tempValue <= maxValue) {
    element.textContent = tempValue
    setTimeout(_ => {
      animateNumber(tempValue + 1, maxValue, element)
    }, 20)
  }

  if (tempValue === maxValue) {
    setAttribute(card)
  }
}

function increaseNumber (currentValue, maxValue, element) {
  if (currentValue <= maxValue) {
    element.textContent = currentValue

    setTimeout(() => {
      increaseNumber(currentValue + 1, maxValue, element)
    }, 20)
  }
}

/* =============
  EXECUTION
=============== */

animateNumber(0, scoreValue, score)
displayCategoryItems()
