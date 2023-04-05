import ApiPosts from "./api/posts";
import Dom from "./utils/dom";
import Store from "./store";

const postsDOM = Dom.qs("#posts");

// DOM functions
const viewUsers = () => {
	const posts = Store.getPosts();

	const templateIsEdited = ({ id, title, body }) => `
	<form class="editPostForm" data-id="${id}">
		<h3>Edit Post</h3>
		<input type="text" name="title" placeholder="title" value="${title}" />
		<textarea name="body" cols="30" placeholder="body" rows="5">${body}</textarea>
		<button class="btn--create">Confirm</button>
  </form>
	<button class="btn--toggle-edit" data-id="${id}" data-toggle-edit>Cancel</button>
	`;
	const templateIsNotEdited = (id) => `
	<button class="btn--toggle-edit" data-id="${id}" data-toggle-edit>Edit</button>
	`;

	postsDOM.innerHTML = posts
		.map(
			(p) => `
      <li class="post">
      <h2 class="post__title">(id:${p.id}) ${p.title}</h2>
      <p class="post__body">${p.body}</p>
			${p.isEdited ? templateIsEdited(p) : templateIsNotEdited(p.id)}
      <button class="btn--delete" data-id="${p.id}" data-delete>Delete</button>
    </li>`,
		)
		.join("");

	// Is Edited Btns
	const toggleEditBtns = Dom.qsa("button[data-id][data-toggle-edit]");
	toggleEditBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const postId = Number(e.target.dataset.id);

			// Data update
			Store.togglePostIsEdited(postId);

			// View update
			viewUsers();

			// Confirm btns / Form
			const editPostForms = Dom.qsa("form.editPostForm");
			editPostForms.forEach((form) => {
				form.addEventListener("submit", async (e) => {
					e.preventDefault();

					const postId = Number(e.target.dataset.id);

					const { title, body } = e.currentTarget.elements;

					const postData = {
						title: title.value,
						body: body.value,
					};

					ApiPosts.editPost(postId, postData);
				});
			});
		});
	});

	// Delete Btns
	const deleteBtns = Dom.qsa("button[data-id][data-delete]");
	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const postId = Number(e.target.dataset.id);

			ApiPosts.deletePost(postId);
		});
	});
};

const View = { viewUsers };

export default View;
