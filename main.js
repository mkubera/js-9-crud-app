import "./style.css";

const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

const addPostBtn = qs("#addPost");
const postsDOM = qs("#posts");
let posts = [];

// Fetch functions
const JSONtoJS = (response) => response.json();

// DOM functions
const viewUsers = () => {
	postsDOM.innerHTML = posts
		.map(
			(p) => `
      <li class="post">
      <h2 class="post__title">(id:${p.id}) ${p.title}</h2>
      <p class="post__body">${p.body}</p>
      <button class="btn--delete" data-id="${p.id}">Delete</button>
    </li>`,
		)
		.join("");

	console.log(qsa("button[data-id]"));

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
					posts = posts.filter((p) => p.id !== postId);
					// View/UI/DOM update
					viewUsers();
				})
				.catch((error) => console.log("Error:", error));
		});
	});
};

// GET - READ - 200 OK
fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
	.then(JSONtoJS)
	.then((postsFetched) => {
		posts = postsFetched;
		viewUsers();
	})
	.catch((error) => console.log(error));

// POST - CREATE - 201 CREATED
addPostBtn.addEventListener("click", (e) => {
	const newPost = {
		title: "Mango",
		body: "CRUD is awesome",
		userId: 1,
	};

	const options = {
		method: "POST",
		body: JSON.stringify(newPost),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	};

	fetch("https://jsonplaceholder.typicode.com/posts", options)
		.then(JSONtoJS)
		.then((p) => {
			// Data update
			posts = [...posts, p];
			// View/UI/DOM update
			viewUsers();
		})
		.catch((error) => console.log(error));
});
