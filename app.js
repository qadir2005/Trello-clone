// //---------------- add tasks ----------------
// let addTask = document.querySelector(".card");
// //card container
// let cardContainer = document.querySelector("#card-container");
// // new card
// let newCard = document.querySelector(".new-card-form");
// let newCardInput = document.querySelector("#new-card-input");

// // task form
// let taskForm = document.querySelector(".taskform"); // abhi input tag html se get krha hun baad mein dom se hi bna loga
// let taskinput = document.querySelector(".taskinput");

// // Save to LocalStorage function
// const saveToLocalStorage = () => {
//   const cards = [];
//   document.querySelectorAll('.card').forEach(card => {
//     const heading = card.querySelector('h2').textContent;
//     const tasks = [];
//     card.querySelectorAll('.para').forEach(para => {
//       tasks.push(para.textContent.trim());
//     });
//     cards.push({ heading, tasks });
//   });
//   localStorage.setItem('cards', JSON.stringify(cards));
// };

// // Create Card Function
// const createCard = (heading = newCardInput.value, tasks = []) => {
//   let cardDiv = document.createElement("div");
//   cardDiv.setAttribute("class", "card");

//   let h2 = document.createElement("h2");
//   let textOfH2 = document.createTextNode(heading);
//   h2.appendChild(textOfH2);

//   let form = document.createElement("form");
//   form.setAttribute("class", "taskForm");

//   let input = document.createElement("input");

//   input.setAttribute("class", "taskinput");
//   input.setAttribute("type", "text");
//   input.setAttribute("draggable", "true")

//   input.setAttribute("placeholder", "Add Task");

//   let button = document.createElement("button");
//   button.setAttribute("type", "submit");
//   let btnText = document.createTextNode("Add +");
//   button.appendChild(btnText);
  
//   form.appendChild(input);
//   form.appendChild(button);
  
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     if (input.value.trim() !== "") {
//       let para = document.createElement("p");
//       para.setAttribute("class", "para");
//       para.setAttribute("draggable", "true")
//       let paraText = document.createTextNode(input.value);
      
//       para.appendChild(paraText);
//       para.appendChild(document.createElement("br"));
//       cardDiv.appendChild(para);
//       cardDiv.insertBefore(para, form);
//       form.reset();
//       saveToLocalStorage(); // Save to localStorage after adding task
//     }
//   });
  
//   cardDiv.appendChild(h2);
//   cardDiv.appendChild(form);
//   let para;
//   tasks.forEach(task => {
//      para = document.createElement("p");
//     para.setAttribute("class", "para");
//     para.setAttribute("draggable", "true");
    
//     let paraText = document.createTextNode(task);
//     para.appendChild(paraText);
//     para.appendChild(document.createElement("br"));
//     cardDiv.appendChild(para);
//     cardDiv.insertBefore(para, form);

//   // drag and drop functionality
  
 
//   });
//   cardDiv.addEventListener("dragover",(event)=>{
//     event.preventDefault();
//     console.log(event);
//   })
//   cardDiv.addEventListener("drop",(event)=>{
//     console.log(para);
//     let element = event.target;
//     cardDiv.appendChild(element);
//     event.dataTransfer.dropEffect="move"
//   })
//   return cardDiv;
// };

// // Function for task adding
// newCard.addEventListener("submit", (event) => {
//   event.preventDefault();
//   if (newCardInput.value.trim() !== "") {
//     let cardTask = createCard();
//     cardContainer.insertBefore(cardTask, newCard);
//     newCard.reset();
//     saveToLocalStorage();
//   }
// });

// // Load cards from localStorage on page load
// document.addEventListener("DOMContentLoaded", () => {
//   const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
//   storedCards.forEach(card => {
//     const { heading, tasks } = card;
//     const cardTask = createCard(heading, tasks);
//     cardContainer.insertBefore(cardTask, newCard);
//   });
// });


//---------------- add tasks ----------------
let addTask = document.querySelector(".card");
// card container
let cardContainer = document.querySelector("#card-container");
// new card
let newCard = document.querySelector(".new-card-form");
let newCardInput = document.querySelector("#new-card-input");

// task form
let taskForm = document.querySelector(".taskform");
let taskinput = document.querySelector(".taskinput");

// Save to LocalStorage function
const saveToLocalStorage = () => {
  const cards = [];
  document.querySelectorAll('.card').forEach(card => {
    const heading = card.querySelector('h2').textContent;
    const tasks = [];
    card.querySelectorAll('.para').forEach(para => {
      tasks.push(para.textContent.trim());
    });
    cards.push({ heading, tasks });
  });
  localStorage.setItem('cards', JSON.stringify(cards));
};

// Drag and Drop Handlers
const handleDragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dropEffect = "move";
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const handleDrop = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target.closest('.card');
  const taskBelow = event.target.closest('.para');

  if (dropzone) {
    if (taskBelow && taskBelow !== draggableElement) {
      dropzone.insertBefore(draggableElement, taskBelow.nextSibling);
    } else {
      dropzone.insertBefore(draggableElement, dropzone.querySelector('form'));
    }
    saveToLocalStorage();
  }
};

// Create Card Function
const createCard = (heading = newCardInput.value, tasks = []) => {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");
  cardDiv.addEventListener('dragover', handleDragOver);
  cardDiv.addEventListener('drop', handleDrop);

  let h2 = document.createElement("h2");
  let textOfH2 = document.createTextNode(heading);
  h2.appendChild(textOfH2);

  let form = document.createElement("form");
  form.setAttribute("class", "taskForm");

  let input = document.createElement("input");
  input.setAttribute("class", "taskinput");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add Task");

  let button = document.createElement("button");
  button.setAttribute("type", "submit");
  let btnText = document.createTextNode("Add +");
  button.appendChild(btnText);

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() !== "") {
      let para = document.createElement("p");
      para.setAttribute("class", "para");
      para.setAttribute("draggable", "true");
      para.setAttribute("id", 'task-' + Date.now());
      para.addEventListener('dragstart', handleDragStart);

      let paraText = document.createTextNode(input.value);
      para.appendChild(paraText);
      para.appendChild(document.createElement("br"));

      cardDiv.appendChild(para);
      cardDiv.insertBefore(para, form);
      form.reset();
      saveToLocalStorage(); // Save to localStorage after adding task
    }
  });

  cardDiv.appendChild(h2);
  cardDiv.appendChild(form);

  tasks.forEach(task => {
    let para = document.createElement("p");
    para.setAttribute("class", "para");
    para.setAttribute("draggable", "true");
    para.setAttribute("id", 'task-' + Date.now());
    para.addEventListener('dragstart', handleDragStart);

    let paraText = document.createTextNode(task);
    para.appendChild(paraText);
    para.appendChild(document.createElement("br"));
    cardDiv.appendChild(para);
    cardDiv.insertBefore(para, form);
  });

// Drag and drop Function
// para.addEventListener("dragstart")

  return cardDiv;
};

// Function for task adding
newCard.addEventListener("submit", (event) => {
  event.preventDefault();
  if (newCardInput.value.trim() !== "") {
    let cardTask = createCard();
    cardContainer.insertBefore(cardTask, newCard);
    newCard.reset();
    saveToLocalStorage();
  }
});

// Load cards from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
  storedCards.forEach(card => {
    const { heading, tasks } = card;
    const cardTask = createCard(heading, tasks);
    cardContainer.insertBefore(cardTask, newCard);
  });
});
