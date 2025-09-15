document.addEventListener('DOMContentLoaded', () => {
  fetch('templates/index.json')
    .then(response => response.json())
    .then(templates => {
      const gallery = document.getElementById('template-gallery');
      templates.forEach(template => {
        const div = document.createElement('div');
        div.className = 'border p-4 rounded shadow hover:shadow-lg';
        div.innerHTML = `
          <img src="${template.thumbnail}" alt="${template.name}" class="w-full h-40 object-cover rounded">
          <h2 class="text-xl font-semibold mt-2">${template.name}</h2>
          <a href="editor.html?id=${template.id}" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded inline-block">Use Template</a>
        `;
        gallery.appendChild(div);
      });
    })
    .catch(error => console.error('Error loading templates:', error));
});
