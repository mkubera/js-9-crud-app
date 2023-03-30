const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

const postsDOM = qs("#posts");

// DOM functions
const viewUsers = () => {
	const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
	postsDOM.innerHTML = oldPosts
  .map(
			(p) => `
      <li class="post">
      <h2 class="post__title">(id:${p.id}) ${p.title}</h2>
      <p class="post__body">${p.body}</p>
      <button class="btn--delete" data-id="${p.id}">Delete</button>
    </li>`,
		)
		.join("");

	// console.log(qsa("button[data-id]"));

	// DELETE - DELETE - 200 OK
	const deleteBtns = qsa("button[data-id]");
  
	deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const postId = Number(e.target.dataset.id);
      
			fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
				method: "DELETE",
			})
				.then(() => {
					// Data update
          const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
          const newPosts = JSON.stringify(oldPosts.filter((p) => p.id !== postId));
          localStorage.setItem("posts", newPosts);

					// View/UI/DOM update
					viewUsers();
				})
				.catch((error) => console.log("Error:", error));
		});
	});
};

const View = { viewUsers };

export default View;
