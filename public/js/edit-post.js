async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name=post-title"]').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const respond = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (respond.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(respond.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
