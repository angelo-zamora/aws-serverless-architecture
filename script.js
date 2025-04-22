// Fade-in effect on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


const form = document.querySelector('form');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const res = await fetch('https://32vsqlq5qc4fqq3elv2z427zva0bzvhz.lambda-url.ap-southeast-1.on.aws/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    responseDiv.textContent = `Message sent! ID: ${result.id || 'N/A'}`;
    form.reset();
  } catch (err) {
    console.error('Error:', err);
    responseDiv.textContent = 'There was a problem sending your message.';
  }
});