import View from "../view";

// GET - READ - 200 OK
const getPosts = async (limit = 3) => {
	try {
		// SUCCESS (Promise: fulfilled)
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
		);
		const data = await response.json();

		const postsWithIsEdited = data.map((p) => ({ ...p, isEdited: false }));

		const newPosts = JSON.stringify(postsWithIsEdited);
		localStorage.setItem("posts", newPosts);

		View.viewUsers();
	} catch (error) {
		// ERROR (Promise: rejected)
		console.log(error);
	}
};

// POST - CREATE - 201 CREATED
const addPost = async (newPost = {}) => {
	const options = {
		method: "POST",
		body: JSON.stringify(newPost), // TODO: try..catch
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	};

	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts",
			options,
		);
		const data = await response.json();

		// Data update
		const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
		const newPosts = JSON.stringify([...oldPosts, data]);
		localStorage.setItem("posts", newPosts);

		// View/UI/DOM update
		View.viewUsers();
	} catch (error) {
		console.log(error);
	}
};

// PATCH - UPDATE - 200 OK
const editPost = async (postId, postData) => {
	const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

	const options = {
		method: "PATCH",
		body: JSON.stringify(postData),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);

		// Data update
		const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
		const newPosts = JSON.stringify(
			oldPosts.map((p) =>
				p.id === data.id
					? {
							...p,
							title: data.title,
							body: data.body,
							isEdited: false,
					  }
					: p,
			),
		);
		localStorage.setItem("posts", newPosts);

		// View/UI/DOM update
		View.viewUsers();
	} catch (error) {
		console.log(error);
	}
};

// DELETE - DELETE - 200 OK
const deletePost = async (postId) => {
	try {
		// SUCCESS (Promise: fulfilled)
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
			{
				method: "DELETE",
			},
		);
		if (!response.status === 200) {
			// TODO: show user "Post not delete. Try again later."
			return;
		}

		// Data update
		const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
		const newPosts = JSON.stringify(oldPosts.filter((p) => p.id !== postId));
		localStorage.setItem("posts", newPosts);

		// View/UI/DOM update
		View.viewUsers();
	} catch (error) {
		// ERROR (Promise: rejected)
		console.log(error);
	}
};

// CRUD
// get, getAll, add, update, delete
const ApiPosts = { getPosts, addPost, editPost, deletePost };

export default ApiPosts;
