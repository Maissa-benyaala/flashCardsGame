const cards = document.querySelectorAll('.flash-card');
  
  let flipped = false;
  let card1, card2;
  let locked = false;
  
  function flip() {
    if(locked) return;
    if(this === card1) return;

    this.classList.add('flip');

    if (!flipped) {
      flipped = true;
      card1 = this;
      return;
    }
    card2 = this;
    locked = true;
    match();
  }
  
  function match() {
    if (card1.dataset.name === card2.dataset.name) {
      disable();
      return;
    }
    unflip();
  }
  
  function disable() {
    card1.removeEventListener('click', flip);
    card2.removeEventListener('click', flip);
    reset();
  }

  function unflip() {
 setTimeout(() => {
   card1.classList.remove('flip');
   card2.classList.remove('flip');
   reset();
  }, 1000);
}

reset = ()=> {
  [flipped, locked] = [false, false];
  [card1, card2] = [null, null];
}

function randomPosition() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}
randomPosition();

cards.forEach(card => card.addEventListener('click', flip));

