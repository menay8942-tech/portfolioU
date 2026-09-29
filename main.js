document.querySelector(".control-buttons h6").onclick = function () {
  let yourName = prompt("Whats Your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = `Unknown`;
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(document.querySelectorAll('.game-block')); // ظبطناها هنا
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener('click', function () {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add('is-flipped');
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match'); // بقى قبل ما يشوف خلصتي ولا لأ
    document.getElementById('success').play();
    checkIfFinished();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration);
    document.getElementById('fail').play();
  }
}

function checkIfFinished() {
  let allMatched = blocks.every(block => block.classList.contains('has-match'));
  if (allMatched) {
    setTimeout(() => {
      let name = document.querySelector('.name span').innerHTML;
      let tries = document.querySelector('.tries span').innerHTML;
      let popup = document.getElementById('congrats-popup');
      let text = document.getElementById('congrats-text');
      text.innerHTML = `يا <b>${name}</b> خلصتيهم كلهم<br>بـ <b>${tries}</b> محاولة غلط بس! 👏`;
      popup.classList.add('show');
    }, 700);
  }
}

document.getElementById('play-again').onclick = function(){
  location.reload();
};