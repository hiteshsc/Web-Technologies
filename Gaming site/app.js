const signup = document.querySelector("#signup");
const signupForm = document.querySelector("#signup form");

const login = document.querySelector("#login");
const loginForm = document.querySelector("#login form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

const loginusername = document.querySelector("#loginusername");
const loginpassword = document.querySelector("#loginpassword");

const loginLink = document.querySelector("#loginLink");

let validUsername = false;
let validPassword = false;
let isLoggedin = false;

username.addEventListener("change", validateEmail);
function validateEmail() {
  var checkEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  validUsername = false;
  if (!username.value.match(checkEmail)) {
    username.nextElementSibling.innerText = "Enter valid email";
  } else {
    username.nextElementSibling.innerText = "";
    validUsername = true;
  }
}

password.addEventListener("change", validatePassword);

function validatePassword() {
  validPassword = false;

  let checkPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (!password.value.match(checkPassword)) {
    password.nextElementSibling.innerText =
      "password must contain atleast 8 characters combination of uppercase lowercase number and special symbol";
  } else {
    password.nextElementSibling.innerText = "";
    validPassword = true;
  }
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  validatePassword();
  validateEmail();
  if (validUsername && validPassword) {
    const body = {
      username: username.value,
      password: password.value,
    };
    await axios.post("http://localhost:4000/newUser", body);
    console.log("submitted");
    // console.log(body);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    username: loginusername.value,
    password: loginpassword.value,
  };
  const list = await axios.post("http://localhost:4000/login", body);
  if (list.data.length === 0) {
    loginpassword.nextElementSibling.innerText = `Invalid username or password`;
  } else {
    // alert(`Welcome ${list.data[0].username}`);

    login.innerHTML = `<div class="display-6">Logged in Successfully</div>
    <div class="display-3">Welcome ${list.data[0].username}</div>`;
    isLoggedin = true;
    // console.log(list.data);
  }
});

loginLink.addEventListener("click", () => {
  signup.classList.toggle("d-none");
});

loginLink.addEventListener("mouseover", function () {
  this.style.cursor = "pointer";
});
