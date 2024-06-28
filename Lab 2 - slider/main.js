let slides = document.querySelector(".box").children;
let nextSlide = document.querySelector(".right-slide");
let prevSlide = document.querySelector(".left-slide");
let totalSlides = slides.length;
let index = 0;

nextSlide.onclick = function () {
  next("next");
};
prevSlide.onclick = function () {
  next("prev");
};

function next(direction) {
  if (direction == "next") {
    index++;
    if (index == totalSlides) {
      index = 0;
    }
  } else {
    if (index == 0) {
      index = totalSlides - 1;
    } else {
      index--;
    }
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
}

const show = (number) => {
  index = number;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
};

const autoSlide = () => {
  setInterval(() => {
    next("next");
  }, 5000);
};

autoSlide();

// const box = document.querySelector('.box')

// setTimeout(() => {
//   box.style.transform = 'translateX(200px)'
// }, 2_000)
// let position = 0
// const anim = () => {
//   box.style.transform = `translateX(${position}px)`
//   position++
//   setTimeout(anim, 16)
// }
// const animInterval = setInterval(anim, 16)

// anim()

// setTimeout(() => {
//   clearInterval(animInterval)
// }, 2_000)
