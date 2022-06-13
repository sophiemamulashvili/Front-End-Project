
//Email Validation Check

function emailcheck(){
  var emailval = document.getElementById("email").value;
  var emaildiv = document.getElementById("email-check-div");
  s = "@.";
  len = emailval.length -1;
  index = emailval.indexOf(s) +1;
  if(emailval !=""){
    if(emailval.includes(s)){
      if((len-index)<2){
      emaildiv.innerHTML="<br><div id='emailcheck'></div>";
      var emailcheck = document.getElementById("emailcheck");
      emailcheck.classList.add("weak");
      emailcheck.innerText="The Email Format Is Invalid!";
      } else{
        emaildiv.innerHTML="";
      }
    } else {
      emaildiv.innerHTML="<br><div id='emailcheck'></div>";
      var emailcheck = document.getElementById("emailcheck");
      emailcheck.classList.add("weak");
      emailcheck.innerText="The Email Format Is Invalid!";
    }
  }else{
    emaildiv.innerHTML="";
  }
}

// Password Strength Level Check

function passcheck() {
  var mydiv1 = document.getElementById('pass-check-div-1');
  var passval = document.getElementById('pass').value;
  if(passval !=""){
    mydiv1.innerHTML="<br><div id='passcheck'></div>";
    var passcheck = document.getElementById('passcheck');
    var lowerCaseLetters = /[a-z]/g;
    if(passval.match(lowerCaseLetters)) {
      passcheck.classList.add("weak");
      passcheck.innerText="The Password Is Weak!";
    } else{
      passcheck.classList.remove("weak");
    }

    var numbers = /[0-9]/g;
    if(passval.match(lowerCaseLetters) && passval.match(numbers)) {
      passcheck.classList.add("medium");
      passcheck.innerText="The Password Is Medium!";
    } else if( !(passval.match(lowerCaseLetters)) ||  !(passval.match(numbers))) {
      passcheck.classList.remove("medium");
    }


    var upperCaseLetters = /[A-Z]/g;
    if(passval.match(lowerCaseLetters) &&passval.match(numbers) && passval.match(upperCaseLetters)) {
      passcheck.classList.add("strong");
      passcheck.innerText="The Password Is Strong!";
    } else if( !(passval.match(lowerCaseLetters)) ||  !(passval.match(numbers)) || !(passval.match(upperCaseLetters))) {
      passcheck.classList.remove("strong");
    }
    var specsymbols = /[!@#$%^&*]/g;
    if(passval.match(lowerCaseLetters) && passval.match(numbers) && passval.match(upperCaseLetters) &&  passval.match(specsymbols) ){
      passcheck.classList.add("very-strong");
      passcheck.innerText="The Password Is Very Strong!";
    } else if( !(passval.match(lowerCaseLetters)) ||  !(passval.match(numbers)) || !(passval.match(upperCaseLetters)) ||!(passval.match(specsymbols) )) {
      passcheck.classList.remove("very-strong");
    }

  } else {
      mydiv1.innerHTML="";
  }

}

//Passwords Confirm

function confirm(){
  var mydiv2 = document.getElementById("pass-check-div-2");
  var confinput = document.getElementById("conf").value;
  var passval = document.getElementById('pass').value;
  if(confinput != "" && passval !=""){
    mydiv2.innerHTML="<br><div id='confirmmsg'></div>";
    var msg = document.getElementById("confirmmsg");
    if (confinput != passval){
        msg.innerText = "The Passwords Don't Match!";
        msg.classList.add("weak");
    } else{
      msg.innerText = "The Passwords Match!";
      msg.classList.add("very-strong");
    }

  } else if (confinput == "" && passval ==""){
    mydiv2.innerHTML="";
  } else {
    mydiv2.innerHTML="<br><div id='confirmmsg'></div>";
    var msg = document.getElementById("confirmmsg");
    msg.innerText = "The Passwords Don't Match!";
    msg.classList.add("weak");
  }
  
}

//Google Translate API

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'},"translt");
}


//SLIDER

var timer;
var index = 1;

window.addEventListener("load",function() {
    slideShow(index);
    timer = setInterval(function(){plusSlides(1)},2000);
})

function plusSlides(n){
  clearInterval(timer);
  if (n < 0){
    slideShow(index -= 1);
  } else {
    slideShow(index += 1); 
  }
  
  if (n === -1){
    timer = setInterval(function(){plusSlides(n + 2)},3000);
  } else {
    timer = setInterval(function(){plusSlides(n + 1)},3000);
  }
}

function currentSlide(n){
  clearInterval(timer);
  timer = setInterval(function(){plusSlides(n + 1)},3000);
  slideShow(index = n);
}

function slideShow(n){
  var i;
  var slides = document.getElementsByClassName("myslide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {index = 1}
  if (n < 1) {index = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index-1].style.display = "block";
  dots[index-1].className += " active";
}



// API, რისი მეშვეობითაც, მომხმარებელი ჩაწერს ინგრედიენტს და ამოუგდებს კერძების იდეებს, რომლებიც ამ ინგრედიენტით კეთდება.

function getdishlist(){
    var dishlist = document.getElementById('dish');
    var searchinput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinput}`)
    .then(response=> response.json())
    .then(data => {
        let content = "";
        if(data.meals){
            data.meals.forEach(meal => {
                content += `
                    <div class = "dish-item" >
                        <div class = "img">
                            <img  src = "${meal.strMealThumb}" class="dish-img" alt = "food">
                        </div>
                        <div class = "dish-name">
                            <h3 class="name">${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            dishlist.classList.remove('notFound');
        } else{
            content = "Sorry, we can't find any dish!";
            dishlist.classList.add('notFound');
        }

        dishlist.innerHTML = content;
    });
}



