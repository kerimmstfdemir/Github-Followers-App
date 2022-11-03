let searchInput = document.querySelector("#searchText");
let searchBtn = document.getElementById("button");
let mainDiv = document.getElementById("cards");

const createElem = (item) => {
  const { avatar_url, login, html_url } = item;

  mainDiv.className = "row row-cols-1 row-cols-md-3 g-4";

  let cardCol = document.createElement("div");
  cardCol.className = "col";
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  let cardImg = document.createElement("img");
  cardImg.src = avatar_url;
  cardImg.className = "card-img-top";
  cardImg.alt = login;
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = login;
  let cardBtn = document.createElement("a");
  cardBtn.className = "btn btn-dark";
  cardBtn.innerText = "View Profile";
  cardBtn.target = "_blank";
  cardBtn.setAttribute("href", html_url);

  cardCol.appendChild(cardDiv);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardBtn);

  mainDiv.appendChild(cardCol);
};

const queryResult = async () => {
    let url = `https://api.github.com/users/${searchInput.value}/followers?per_page=100`;
  mainDiv.innerHTML = "";
  if (searchInput) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let myData = await response.json();
        myData.map((item) => createElem(item));
      } else {
        let message = "User not found...";
        mainDiv.className = "text-center";
        mainDiv.innerHTML = `<h3 class="text-align text-danger">📢 ${message}</h3>`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

searchBtn.addEventListener("click", queryResult);
searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        queryResult();
    }
})