// Store MODULE

// note: all functions are IMPURE (because they manipulate Local Storage)

// ########################################
// Funkcje prywatne (nie-exportowane)
// ########################################

// UPDATE
const setPosts = (newPosts) => {
	try {
		const json = JSON.stringify(newPosts);
		localStorage.setItem("posts", json);
	} catch (error) {
		console.error(error);
	}
};

// ########################################
// Funkcje publiczne (exportowane)
// ########################################

// READ
const getPosts = () => {
	try {
		return JSON.parse(localStorage.getItem("posts")) || [];
	} catch (error) {
		console.error(error);
	}
};

// CREATE
const initPosts = (posts) => {
	const postsWithIsEdited = posts.map((p) => ({ ...p, isEdited: false }));

	setPosts(postsWithIsEdited);
};

const addPost = (newPost) => {
	const oldPosts = getPosts();
	const newPosts = [...oldPosts, newPost];
	setPosts(newPosts);
};

// UPDATE
const editPost = ({ id, title, body }) => {
	const oldPosts = getPosts();
	const newPosts = oldPosts.map((p) =>
		p.id === id
			? {
					...p,
					title,
					body,
					isEdited: false,
			  }
			: p,
	);

	setPosts(newPosts);
};

const togglePostIsEdited = (postId) => {
	const oldPosts = getPosts();
	const newPosts = oldPosts.map((p) =>
		p.id === postId ? { ...p, isEdited: !p.isEdited } : p,
	);

	setPosts(newPosts);
};

// DELETE
const deletePost = (postId) => {
	const oldPosts = getPosts();
	const newPosts = oldPosts.filter((p) => p.id !== postId);

	setPosts(newPosts);
};

const Store = {
	getPosts,
	initPosts,
	addPost,
	editPost,
	togglePostIsEdited,
	deletePost,
};

export default Store;
