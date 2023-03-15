/* =============
  VARIBALES
=============== */
const card = document.querySelector('.card')
const score = card.querySelector('.user-score')
const scoreValue = parseInt(score.getAttribute('data-max'))

/* =============
  FUNCTIONS
=============== */

/**
 * Fetches data form .json file and uses them to display category list
 */
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
      <h3 id="${id}" class="category">${item.category}</h3>
      <p><span class="score" data-max="${item.score}">${item.score}</span> / 100</p>
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
      })
    })
}

/**
 * Sets 'data-value' attribute to 'max' (to indicate the animation ended)
 * @param {HTMLElement} element HTML element for which the attribute is to be set
 */
function setAttribute (element) {
  element.setAttribute('data-value', 'max')
}

/**
 * Increases the number until max value is reached, which triggers animation through setting an attribute
 * @param {Number} currentValue Initial value displayed as content of the HTML element
 * @param {Number} maxValue Maximum value to be displayed as content of the HTML element, retrieved from .json file
 * @param {HTMLElement} element HTML element for which the number (its content) is to be increased
 */
function animateNumber (currentValue, maxValue, element) {
  if (currentValue <= maxValue) {
    element.textContent = currentValue
    setTimeout(_ => {
      animateNumber(currentValue + 1, maxValue, element)
    }, 20)
  }

  if (currentValue === maxValue) {
    setAttribute(card)
  }
}

/**
 * Increases the number until max value is reached
 * @param {Number} currentValue Initial value displayed as content of the HTML element
 * @param {Number} maxValue Maximum value to be displayed as content of the HTML element, retrieved from .json file
 * @param {HTMLElement} element HTML element for which the number (its content) is to be increased
 */
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
