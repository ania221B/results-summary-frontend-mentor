const card = document.querySelector('.card')

function createCategoryItems () {
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
      <p>${item.score}<span> / 100</span></p>
      `
        fragment.appendChild(listItem)
      })

      categoryList.appendChild(fragment)
    })
}

createCategoryItems()
