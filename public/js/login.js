const loginFormHandler = async (event) => {
  event.preventDefault();

  //  stuff from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(function () {
      document.location.replace("/dashboard/");
    })
    .catch((err) => console.log(err));

  // if (email && password) {
  //   const response = await fetch("/api/users/login", {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   // if works, redirect to profile page
  //   if (response.ok) {
  //     document.location.replace("/dashboard/");
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then(function () {
      document.location.replace("/dashboard/");
    })
    .catch((err) => console.log(err));

  // if (username && email && password) {
  //   const response = await fetch("../../controllers/userRoutes", {
  //     method: "POST",
  //     body: JSON.stringify({ username, email, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   // check response status
  //   if (response.ok) {
  //     document.location.replace("/dashboard/");
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
