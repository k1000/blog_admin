javascript: (async () => {
  const currentUrl = window.location.href;
  const apiUrl = 'https://synopsis.selwak.workers.dev/?link=' + currentUrl;
  const syn = await fetch(apiUrl);
  const { url, title, description, author, publishedAt, tags } =
    await syn.json();
  const form = document.createElement('div');
  form.innerHTML = `<form id="synpsis-form">
  <label for="title">Title:</label>
  <div id="title" contenteditable="true" required>${title.trim()}</div>
  
  <label for="description">Description:</label>
  <div id="description" contenteditable="true">${description.trim()}</div>
  
  <label for="summary">Summary:</label>
  <div id="summary" contenteditable="true">${summary.trim()}</div>
  
  <label for="author">Author:</label>
  <div id="author" contenteditable="true">${author.trim()}</div>
  
  <label for="publishedAt">Published At:</label>
  <div id="publishedAt" contenteditable="true">${publishedAt.trim()}</div>
  
  <label for="tags">Tags:</label>
  <div id="tags" contenteditable="true">${tags.trim()}</div>
  
  <label for="isPublic">Is Public:</label>
  <input type="checkbox" id="isPublic" name="isPublic" value="${isPublic}" required>
  
  <input type="submit" value="Save">
</form>`;
  insertBefore(form, document.body.firstChild);
  document
    .getElementById('synpsis-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      var formData = {
        url,
        title: document.getElementById('title').innerText,
        description: document.getElementById('description').innerText,
        summary: document.getElementById('summary').innerText,
        tags: document.getElementById('tags').innerText,
        author: document.getElementById('author').innerText,
        publishedAt: document.getElementById('publishedAt').innerText,
        isPublic: document.getElementById('isPublic').value,
      };
      const send = await fetch('/submit-article', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    });
})();
