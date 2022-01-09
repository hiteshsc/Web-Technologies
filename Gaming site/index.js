const searchbox = document.querySelector("#searchBox");
const store = document.querySelector("#store");
const signout = document.querySelector("#signout");

let isLoggedin;

async function checkLoginStatus() {
  const loginState = await axios.get("http://localhost:4000/loginstate");
  isLoggedin = loginState.data;
  console.log(loginState.data);

  signout.innerHTML = isLoggedin
    ? `<a  class="nav-link active text-center" href="#"
              >Sign out</a
            >`
    : `<a  class="nav-link active text-center" href="signup.html"
              >Sign up</a
            >`;
}

checkLoginStatus();

searchbox.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginState = await axios.get("http://localhost:4000/loginstate");
  console.log(loginState);
  if (loginState.data == false) alert("login first");
  else {
    console.log("Successsssssssssssssssssssssssss");
    let searchtext = searchbox.firstElementChild.value;
    let result;

    var options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: { category: searchtext },
      headers: {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": "6a931a3bbamsh330a01c7d6ff46cp12a12cjsnb05466f0ac97",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        result = response.data;
        // console.log(result);
        displayResults(result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

function displayResults(result) {
  console.log(result);
  store.innerHTML = "";
  store.scrollIntoView({ behavior: "smooth" });

  for (let item of result) {
    let newitem = document.createElement("div");
    newitem.innerHTML = `<a href="${item.game_url}" target="_blank" class="image">
       <img src="${item.thumbnail}" alt="" />
     </a>
     <div class="tag">${item.title}</div>`;
    store.append(newitem);
  }
}
