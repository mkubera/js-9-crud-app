import "./style.css";
import ApiPosts from "./js/api/posts";
import Dom from "./js/utils/dom";

const addPostForm = Dom.qs("#addPostForm");

// Fetch data when App starts
ApiPosts.getPosts();

// EVENTS
addPostForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const { title, body } = e.currentTarget.elements;

	const newPost = {
		title: title.value,
		body: body.value,
		userId: 1,
		isEdited: false,
	};

	ApiPosts.addPost(newPost);
});
