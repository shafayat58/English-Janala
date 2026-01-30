
const creatElement = (arr) => {
  console.log(arr);
  const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)
  return(htmlElement.join(""));


}


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// Load all lessons
const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => DisplayLesson(json.data))
    .catch(err => console.error(err));
}

// Display lesson buttons
const DisplayLesson = (lessons) => {
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = '';


  lessons.forEach(item => {
    const Btndiv = document.createElement("div");
    Btndiv.innerHTML = `
      <button id="lessson-btn-${item.level_no}" onclick="loadlevelword(${item.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson-${item.level_no}
      </button>
    `;
    levelContainer.appendChild(Btndiv);
  });
}

const removeActive = () => {
  document
    .querySelectorAll(".lesson-btn")
    .forEach(btn => btn.classList.remove("active"));
};
 
const loadWordDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  console.log(url);
  const res = await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data);
  
  
}

const displayWordDetails = (word) => {
  
  const detailsContainer = document.getElementById("details-container")
  detailsContainer.innerHTML =
  `
   <div class="modal-box">
      
<div>
  <h2 class="text-2xl font-bold">Eager (<i class="fa-solid fa-microphone"></i> :${word.word})</h2>
</div>
<div>
  <h2 class=" font-bold">Meaning</h2>
  <p>${word.pronunciation}</p>
</div>
<div>
  <h2 class=" font-bold">Example</h2>
  <p>${word.sentence}</p>
</div>
<div>
  <h2 class=" font-bold">synonym</h2>

  <div class=" ">${creatElement(word.synonyms)}</div>
  
</div>
      </div>
      <div class="modal-action">
        <form method="dialog">
         
        
      </div>
  `
  document.getElementById("world_model").showModal();

  
}

// Load words for a lesson
const loadlevelword = (id) => {
  console.log("Selected lesson:", id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
     removeActive()
      const clickBtn = document.getElementById(`lessson-btn-${id}`)
      // console.log(clickBtn);
      clickBtn.classList.add("active")
      
      Displaylevelword(data.data)
    

    }) 
}

// Display words (declared OUTSIDE of loadlevelword)
const Displaylevelword = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = '';

  if (words.length== 0) {
    wordsContainer.innerHTML =
    `
    <div class="text-center bg-sky-400 col-span-full rounded py-10 space-y-6 font-bangla" >
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-xl font-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
   </div>
    `
  }

  words.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white py-10 px-5">
        <h2 class="text-4xl font-bold">${item.word ? item.word :"শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">${item.pronunciation}</p>
        <div class="text-2xl font-medium">"${item.meaning ? item.meaning :"অর্থ পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button  onclick="loadWordDetails(${item.id})" class="fa-solid fa-circle-info bg-[#1A91FF10]"></button>
          <button onclick="pronounceWord('${item.word}')" class="fa-solid fa-volume-low bg-[#1A91FF10]"></button>
        </div>
      </div>
    `;
    wordsContainer.appendChild(card);
  });
}


loadLesson();


document.getElementById("btn-search").addEventListener("click", () => {
  const inputSearch = document.getElementById("input-search")
  const searchValue = inputSearch.value.trim().toLowerCase();
  console.log(searchValue);
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res=>res.json())
    .then((data) => {
      const allword = data.data;
      // console.log(data);
      console.log(allword);
      const filterWord = allword.filter((word) => {
       return word.word.toLowerCase().includes(searchValue)
      })

      Displaylevelword(filterWord);
      
      
    
  })
})
