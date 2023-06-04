// Создаем HTML-разметку для одного поста
function createPostHTML(post) {
  return `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
}

// Добавляем HTML-разметку поста в контейнер
function addPostToContainer(container, postHTML) {
  container.innerHTML += postHTML;
}

// Делаем GET-запрос к серверу для получения списка постов
function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      const postContainer = document.getElementById("post-container");
      // Применяем функции createPostHTML и addPostToContainer для каждого поста
      posts.forEach((post) => {
        const postHTML = createPostHTML(post);
        addPostToContainer(postContainer, postHTML);
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении списка постов:", error);
    });
}

// Создаем новый пост при отправке формы
function createPost(event) {
  event.preventDefault();

  const titleInput = document.getElementById("post-title");
  const bodyInput = document.getElementById("post-body");

  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((post) => {
      const postContainer = document.getElementById("post-container");
      const postHTML = createPostHTML(post);
      addPostToContainer(postContainer, postHTML);
      titleInput.value = "";
      bodyInput.value = "";
    })
    .catch((error) => {
      console.error("Ошибка при создании поста:", error);
    });
}

// Вызываем функцию fetchPosts для начала процесса получения и отображения постов
fetchPosts();

// Добавляем обработчик события submit для формы, чтобы вызвать функцию createPost при отправке формы
const postForm = document.getElementById("post-form");
postForm.addEventListener("submit", createPost);
