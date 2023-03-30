import View from "./view";

// GET - READ - 200 OK
const getPosts = async (limit = 3) => {
	try {
		// SUCCESS (Promise: fulfilled)
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
		);
		const data = await response.json();

		const newPosts = JSON.stringify(data);
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

const ApiPosts = { getPosts, addPost };

export default ApiPosts;
