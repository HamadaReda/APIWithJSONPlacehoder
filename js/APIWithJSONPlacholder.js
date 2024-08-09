let allUsers = document.getElementById("all-users");
let userData = document.getElementById("user-data");
let filteredPosts = document.getElementById("filtered-posts");

function getAllUsers() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let users = request.response;
      allUsers.innerHTML = "";
      for (let user of users) {
        let li = document.createElement("li");
        li.setAttribute("data-user-id", user.id);
        li.innerHTML = `
          <span>${user.name}</span>
          <p>${user.email}</p>
        `;

        li.addEventListener("click", function () {
          let userId = this.getAttribute("data-user-id");
          getPostsForUser(userId);
          let liSidebar = document.querySelectorAll("#all-users li");
          liSidebar.forEach((ele) => {
            ele.classList.remove("active");
          });
          this.classList.add("active");
          setDataOfUserInHeader(userId);
          toggleSidebar(false);
        });
        allUsers.appendChild(li);
        clickOnFirstUser();
      }
    }
  };
}

function clickOnFirstUser() {
  let firstLi = document.querySelector("#all-users li");

  if (firstLi) {
    firstLi.click(); // Simulates a click on the first <li> element
  }
}

function getPostsForUser(userId) {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let posts = request.response;
      filteredPosts.innerHTML = "";
      for (let post of posts) {
        filteredPosts.innerHTML += `
          <div class="col">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
                <p class="card-text">
                  ${post.body}
                </p>
              </div>
            </div>
          </div>
        `;
      }
    }
  };
}

function setDataOfUserInHeader(userId) {
  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/users/${userId}`);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let user = request.response;
      userData.innerHTML = `
        <li>${user.name}</li>
      `;
    }
  };
}

getAllUsers();
