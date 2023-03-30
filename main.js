import "./style.css";
import ApiPosts from "./apiPosts";
import View from "./view";

const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

const addPostBtn = qs("#addPost");
// const postsDOM = qs("#posts");
let posts = [];

const deletePost = async (postId) => {
	try {
		// SUCCESS (Promise: fulfilled)
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
			{
				method: "DELETE",
			},
		);
		// Data update
		posts = posts.filter((p) => p.id !== postId);
		// View/UI/DOM update
		viewUsers();
	} catch (error) {
		// ERROR (Promise: rejected)
		console.log(error);
	}
};

// const fetchUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// };

// const doStuff = async () => {
//   try {
//     const users = await fetchUsers();
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// doStuff();

ApiPosts.getPosts();


// CREATE
addPostBtn.addEventListener("click", (e) => {
	const newPost = {
		title: "Mango",
		body: "CRUD is awesome",
		userId: 1,
	};

	ApiPosts.addPost(newPost);
});
