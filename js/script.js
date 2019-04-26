var one = "#000000",
  two = "#22a6b3",
  three = "#0d78e7",
  four = "#f88f18",
  five = "#bb6774";

$(window).on("scroll touchmove", function() {
  if ($(document).scrollTop() >= $("#one").position().top) {
    $('body').css('background', $("#one").attr("data-color"));

  };
  if ($(document).scrollTop() > $("#two").position().top) {
    $('body').css('background', $("#two").attr("data-color"))
  };
  if ($(document).scrollTop() > $("#three").position().top) {

    $('body').css('background', $("#three").attr("data-color"))
  };
  if ($(document).scrollTop() > $("#four").position().top) {

    $('body').css('background', $("#four").attr("data-color"))
  };
  if ($(document).scrollTop() >= $("#five").position().top) {
    $('body').css('background', $("#five").attr("data-color"))
  };
});

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 190 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 1px solid #FFFFFF }";
  document.body.appendChild(css);
};