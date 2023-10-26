const lists = document.querySelectorAll('.list');

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