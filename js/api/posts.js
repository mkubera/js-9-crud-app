import View from "./../view";
import Store from "./../store";

// GET - READ - 200 OK
const getPosts = async (limit = 3) => {
	try {
		// SUCCESS (Promise: fulfilled)
		const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`;
		const response = await fetch(url);
		// data: Array of Posts{id,title,body,userId}
		const data = await response.json();

		// Data update
		Store.initPosts(data);

		// View/UI/DOM update
		View.viewUsers();
	} catch (error) {
		// ERROR (Promise: rejected)
		console.log(error);
	}
};

// POST - CREATE - 201 CREATED
const addPost = async (newPost = {}) => {
	try {
		const url = "https://jsonplaceholder.typicode.com/posts";

		const options = {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		};

		const response = await fetch(url, options);
		// expected data shape:
		// {id,title,body,userId}
		const data = await response.json();

		// Data update
		Store.addPost(data);

		// View/UI/DOM update
		View.viewUsers();
	} catch (error) {
		console.log(error);
	}
};

// PATCH - UPDATE - 200 OK
const editPost = async (postId, postData) => {
	try {
		const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

		const options = {
			method: "PATCH",
			body: JSON.stringify(postData),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		};

		const response = await fetch(url, options);
		// expected data shape:
		// {id,title,body,userId}
		const data = await response.json();

		// Data update
		Store.editPost(data);

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
		const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
		const options = { method: "DELETE" };
		const response = await fetch(url, options);

		if (!response.status === 200) {
			// TODO: show user "Post not delete. Try again later."
			return;
		}

		// Data update
		Store.deletePost(postId);

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
