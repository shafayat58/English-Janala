const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => DisplayLesson(json.data)
  )
}

const DisplayLesson = (lesson) => {

  const levelContainer = document.getElementById("lesson-container")
  levelContainer.innerText = '';
  lesson.forEach((lesson) => {
    const Btndiv = document.createElement("div")
    Btndiv.innerHTML =
    
    `
     <button  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
    `
    levelContainer.appendChild(Btndiv)
  })
  
}

loadLesson()
