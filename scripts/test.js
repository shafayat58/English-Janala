
const creatElement = (arr) => {
  console.log(arr);
  const htmlElement = arr.map(el => `<span class="btn>${el}</span>`)
  console.log(htmlElement.join(""));
  
  
}

const synonyms = ["hello", "hi", "kill"]
creatElement(synonyms)