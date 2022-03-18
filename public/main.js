

// Validation for username
const unameInput = document.getElementById('name');
unameInput.addEventListener('keyup', showUnameWarning);
function showUnameWarning () {
    let input = unameInput.value;
    if (input.includes('@')) {
        document.getElementById('unameWarning').innerText = 'Gebruikersnaam mag geen @ gebruiken!';
    }
    else {
        document.getElementById('unameWarning').innerText = '';
    }
}

//Validation for password
const pswInput = document.getElementById('psw');
pswInput.addEventListener('keyup', showPswWarning);
function showPswWarning() {
    let input = pswInput.value;
    if (input.length <= 6 && input.length > 0) {
        document.getElementById('pswWarning').innerText = 'Wachtwoord is te kort, gebruik minimaal 6 tekens';
    }
    else {
        document.getElementById('pswWarning').innerText = '';
    }
}


//connect api 
function myFunction() {
  document.getElementById("login-form").classList.toggle("show");
}
let newRandomCocktail = document.querySelector(".generateCocktail");

async function getRandomCocktail() {
  const res = await fetch( "https://www.thecocktaildb.com/api/json/v1/1/random.php");
  const cocktail = await res.json();
  showCocktail(cocktail)
}

//insert random cocktail in text field
function showCocktail(cocktail) {
  let cocktailTextField = document.querySelector(".cocktailTextField");

  let cocktailName = cocktail.drinks[0].strDrink;
  cocktailTextField.value = cocktailName
}

// show login hide register
function showLogin() {
  document.getElementById("loginForm").style.display="block";
  document.getElementById("registerForm").style.display="none";
}

// show register hide login
function showRegister() {
  document.getElementById("loginForm").style.display="none";
  document.getElementById("registerForm").style.display="block";
}