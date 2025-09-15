document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const websiteForm = document.getElementById('website-form');
  const downloadSection = document.getElementById('download-section');
  const downloadLink = document.getElementById('download-link');

  function addMessage(message, isUser = false) {
    const div = document.createElement('div');
    div.className = `p-2 ${isUser ? 'text-right' : 'text-left'}`;
    div.innerHTML = `<p class="inline-block bg-${isUser ? 'blue' : 'gray'}-200 p-2 rounded">${message}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  addMessage("Hello! I'm your AI assistant. Let's create your website. Enter your site name and a brief description, then submit to generate it.");

  websiteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const siteName = document.getElementById('site-name').value;
    const siteContent = document.getElementById('site-content').value;

    addMessage(`Generating website for "${siteName}" with content: ${siteContent}...`, true);

    // Generate basic website
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteName}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  <header class="bg-blue-600 text-white p-4 text-center">
    <h1 class="text-3xl font-bold">${siteName}</h1>
  </header>
  <main class="p-6">
    <p class="text-lg">${siteContent}</p>
  </main>
</body>
</html>
    `.trim();

    const zip = new JSZip();
    zip.file('index.html', htmlContent);
    zip.generateAsync({ type: 'blob' }).then(content => {
      const url = URL.createObjectURL(content);
      downloadLink.href = url;
      downloadLink.download = `${siteName.replace(/\s+/g, '-')}-website.zip`;
      downloadSection.classList.remove('hidden');
      addMessage("Your website is ready! Download the ZIP file and follow the hosting steps below.");
    });
  });

  // Load JSZip for file generation
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
  script.onload = () => console.log('JSZip loaded');
  document.body.appendChild(script);
});
