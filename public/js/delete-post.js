async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const respond = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (respond.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(respond.statusText);
  }
}

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
