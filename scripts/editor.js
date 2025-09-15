document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const templateId = urlParams.get('id');
  let templateContent = { html: '<div>Start Editing</div>', css: '' };

  if (templateId) {
    fetch(`templates/index.json`)
      .then(response => response.json())
      .then(templates => {
        const template = templates.find(t => t.id === parseInt(templateId));
        if (template) {
          Promise.all([
            fetch(`templates/${template.html}`).then(r => r.text()),
            fetch(`templates/${template.css}`).then(r => r.text())
          ]).then(([html, css]) => {
            templateContent = { html, css };
            initEditor();
          });
        } else {
          initEditor();
        }
      });
  } else {
    initEditor();
  }

  function initEditor() {
    const editor = grapesjs.init({
      container: '#gjs',
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: { 'gjs-preset-webpage': {} },
      storageManager: false,
      components: templateContent.html,
      style: templateContent.css
    });

    // Add save button (saves to localStorage for now)
    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-save',
      command: () => {
        const html = editor.getHtml();
        const css = editor.getCss();
        localStorage.setItem('editedTemplate', JSON.stringify({ html, css }));
        alert('Saved locally!');
      },
      attributes: { title: 'Save Locally' }
    });
  }
});
