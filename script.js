//Cоздаем функции добавления постов на страницу
function createPostHTML(post) {
  // Создаем HTML-разметку для одного поста
  return `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
}

function addPostToContainer(container, postHTML) {
  // Добавляем HTML-разметку поста в контейнер
  container.innerHTML += postHTML;
}

function fetchPosts() {
  // Делаем GET-запрос к серверу для получения списка постов
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

// Вызываем функцию fetchPosts для начала процесса получения и отображения постов
fetchPosts();
