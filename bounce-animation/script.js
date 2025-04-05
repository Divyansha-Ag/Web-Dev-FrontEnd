
const mode=document.getElementById('theme-toggle');
mode.addEventListener('click',function(){
    document.body.classList.toggle('dark-mode');
    const svgchange=mode.querySelector('path');
    if (document.body.classList.contains('dark-mode')){
        svgchange.setAttribute('fill',"#E0E1DD");
    }
    else{
        svgchange.setAttribute('fill',"#000000")
    }
})
const apiKey='PyrFc1HvaU7KkpHud159Beq17Kx6nf6tWUBiSBvE';
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

document.getElementById('apod-loading').style.display = 'block';

fetch(apodUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    document.getElementById('apod-loading').style.display = 'none';
    const content = document.getElementById('apod-content');
    document.getElementById('apod-title').textContent = data.title;
    document.getElementById('apod-date').textContent = data.date;
    document.getElementById('apod-explanation').textContent = data.explanation;
    const mediaContainer = document.getElementById('apod-media');
    if (data.media_type === 'image') {
      mediaContainer.innerHTML = `<a href="${data.url} target="_blank">
      <img src="${data.url}" id="astro" alt="${data.title}" style="max-width:100%; border-radius:8px; </a>">`;
    } else if (data.media_type === 'video') {
      mediaContainer.innerHTML = `
        <iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:500px; border-radius:8px;"></iframe>
      `;
      mediaContainer.style.transition='all 0.3s ease'
    }
    

    const copyrightEl = document.getElementById('apod-copyright');
    if (data.copyright) {
      copyrightEl.textContent = `Credit: ${data.copyright}`;
    } else {
      copyrightEl.textContent = 'Credit: Public Domain';
    }
    content.style.display = 'block';
    content.style.transition='all 0.3s ease'
  })
  .catch(error => {
    console.error('APOD fetch failed:', error);
    document.getElementById('apod-loading').style.display = 'none';
    const errorEl = document.getElementById('apod-error');
    errorEl.textContent = `Failed to load Astronomy Picture: ${error.message}`;
    errorEl.style.display = 'block';
  });


  document.addEventListener('DOMContentLoaded',function(){
    const quotegen=document.getElementById('quote-display');
    const quotes=[
      "Physics is the language the universe uses to write its story.",
  "Understanding physics is like unlocking the code of nature.",
  "Every equation tells a story—learn its language.",
  "From falling apples to orbiting planets—physics connects it all.",
  "Don't memorize—understand the why behind the what.",
  "A good question in physics is often better than the right answer.",
  "Physics isn’t hard when you think in pictures.",
  "The beauty of physics lies in its simplicity.",
  "Concepts first, formulas later—that’s the way to learn.",
  "If you can explain it simply, you truly understand it.",
  "Nature doesn’t lie—physics is just us catching up.",
  "Complex ideas often start with simple principles.",
  "The universe is written in math—physics is how we read it.",
  "You don’t just study physics—you learn to see differently.",
  "Think of physics as storytelling with logic and numbers."
    ]
  function showrandom(){
    const randomnum=Math.floor(Math.random()*quotes.length);
    quotegen.textContent=`"${quotes[randomnum]}"`;

    
  }
  showrandom();
  setInterval(showrandom,5000);
  })
  const calculatebtn = document.getElementById('calculate-btn');

calculatebtn.addEventListener('click', function() {
    const m = parseFloat(document.getElementById('mass').value);
    const v = parseFloat(document.getElementById('velocity').value);
    const keResult = document.getElementById('ke-result');
    Object.assign(keResult.style, {
        display: 'block',
        fontSize: '15px',
        
    });
    if (isNaN(m)||isNaN(v)) {
        keResult.style.color = 'rgb(255, 65, 65)';
        keResult.textContent = '*Invalid Input*';
        return;
    }
    const kinetic = 0.5 * m * v * v;
    keResult.style.color = '';
    keResult.textContent = `Kinetic Energy: ${kinetic.toFixed(2)} Joules`;
});