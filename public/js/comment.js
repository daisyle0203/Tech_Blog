async function commentFormHandler(event) {
  event.preventDefault()

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim()

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ]
// check if there is a comment, preventing from users submitting empty comments
  if (comment_text) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
}

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler)
