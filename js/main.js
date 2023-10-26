const lists = document.querySelectorAll('.list');
const button = document.querySelector('.button');

function addTask() {
  const btn = document.querySelector('.add__btn');
  const addBtn = document.querySelector('.add__item-btn');
  const cancelBtn = document.querySelector('.cancel__item-btn');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');

  let value;

  btn.addEventListener('click', () => {
    form.style.display = 'block';
    btn.style.display = 'none';
    addBtn.style.display = 'none';

    textarea.addEventListener('input', e => {
      value = e.target.value;

      if(value) {
        addBtn.style.display = 'block';
      } else {
        addBtn.style.display = 'none';
      }
      
    });
  });

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newItem = document.createElement('li');
    newItem.classList.add('list__item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);
    clear();
    dragNdrop();
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clear();    
  });

  function clear() {
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';    
  }
}

addTask();

function addBoard() {
  const boards = document.querySelector('.boards');
  const board = document.createElement('div');
  board.classList.add('boards__item');
  board.innerHTML = `
          <span contenteditable="true" class="title">Enter a title</span>
        <ul class="list"></ul>  
  `;
  boards.append(board);

  changeTitle(); 
  dragNdrop(); 
}

button.addEventListener('click', addBoard);

function changeTitle() {
  const titles = document.querySelectorAll('.title');

  titles.forEach(title => {
    title.addEventListener('click', e => e.target.textContent = '');
  });  
}

changeTitle();

let draggedItem = null;

function dragNdrop() {
  const listItems = document.querySelectorAll('.list__item');
  const lists = document.querySelectorAll('.list');
  
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display ='none';
      }, 0);
    });

    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });

    item.addEventListener('dblclick', () => {
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', e => e.preventDefault());   
      
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0,0,0, .3)';
      });

      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0, 0)';
      });  
      
      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0, 0)';
        this.append(draggedItem);
      });
    }
    
  }
}

dragNdrop();