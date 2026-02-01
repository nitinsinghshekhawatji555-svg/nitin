// External JS for Mahi 💜 My Forever

document.addEventListener('DOMContentLoaded', () => {
  /* ===== NAME TYPING ===== */
  const gfName = "Mahi";
  let i = 0;

  function typeName(){
    if(i < gfName.length){
      document.getElementById("name").innerHTML += gfName.charAt(i);
      i++;
      setTimeout(typeName,150);
    } else {
      // typing finished – caret kept alive by CSS
      document.getElementById("name").classList.add('typed');
    }
  }
  typeName();

  /* ===== MUSIC + PROPOSAL ===== */
  window.startLove = function(){
    const music = document.getElementById("music");
    music.play();
    document.getElementById("proposal").classList.add('visible');
    // make play button glow a bit while music plays
    document.querySelector('button').classList.add('pulse');
  };

  /* ===== SLIDER ===== */
  let index = 0;
  const slides = document.querySelectorAll(".slider img");

  setInterval(()=>{
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 2500);

  /* ===== NO BUTTON FUN ===== */
  const noBtn = document.getElementById("noBtn");

  noBtn.addEventListener("mouseover",()=>{
    const x = Math.floor(Math.random() * 140) - 70; // left-right offset
    const y = Math.floor(Math.random() * 60) - 10; // up-down offset
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  /* ===== YES ANSWER ===== */
  window.yesAnswer = function(){
    const final = document.getElementById("finalMsg");
    final.innerHTML = "Yayyy 💜 Mahi, from this moment my forever has your name ✨💍";
    final.classList.add('show');

    // small heart burst for fun
    for(let n=0;n<12;n++){
      const heart = document.createElement('span');
      heart.textContent = '💜';
      heart.style.position = 'absolute';
      heart.style.left = (10 + Math.random()*80) + '%';
      heart.style.top = Math.random()*20 + 'px';
      heart.style.fontSize = (10 + Math.random()*20) + 'px';
      heart.style.opacity = '0.95';
      heart.style.transform = 'translateY(0)';
      heart.style.transition = 'transform 1200ms ease, opacity 1200ms ease';
      document.querySelector('.card').appendChild(heart);
      setTimeout(()=>{ heart.style.transform = `translateY(-${100 + Math.random()*120}px) scale(${1 + Math.random()})`; heart.style.opacity = '0'; }, 50);
      setTimeout(()=> heart.remove(), 1400);
    }

    document.getElementById("music").pause();

    /* ===== PARTICLES (hearts) + CONFETTI ===== */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;

    function resizeCanvas(){ cw = canvas.width = window.innerWidth; ch = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas);

    const hearts = [];
    const confetti = [];

    function spawnHeart(){
      hearts.push({
        x: Math.random()*cw,
        y: ch + 30,
        vy: -(0.4 + Math.random()*1.2),
        vx: (Math.random()-0.5)*0.6,
        size: 14 + Math.random()*18,
        rot: Math.random()*Math.PI*2,
        alpha: 0.95
      });
    }

    setInterval(spawnHeart, 700);

    function spawnConfetti(x,y,count=30){
      for(let i=0;i<count;i++){
        confetti.push({
          x: x + (Math.random()*60-30),
          y: y + (Math.random()*60-30),
          vx: (Math.random()-0.5)*8,
          vy: (Math.random()* -6) - 2,
          size: 6 + Math.random()*8,
          rot: Math.random()*360,
          color: ['#ff6384','#c77dff','#ffd6ff','#9d4edd'][Math.floor(Math.random()*4)],
          life: 80 + Math.random()*40
        });
      }
    }

    // animate
    function draw(){
      ctx.clearRect(0,0,cw,ch);

      // hearts
      for(let i = hearts.length-1;i>=0;i--){
        const h = hearts[i];
        h.x += h.vx;
        h.y += h.vy;
        h.rot += 0.01;
        h.alpha -= 0.001;
        ctx.save();
        ctx.globalAlpha = Math.max(0,h.alpha);
        ctx.font = h.size + 'px serif';
        ctx.fillText('💜', h.x, h.y);
        ctx.restore();
        if(h.y < -40 || h.alpha <= 0) hearts.splice(i,1);
      }

      // confetti
      for(let i = confetti.length-1;i>=0;i--){
        const c = confetti[i];
        c.x += c.vx; c.y += c.vy; c.vy += 0.35; c.life -= 1;
        ctx.save();
        ctx.translate(c.x,c.y);
        ctx.rotate(c.rot*Math.PI/180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size/2,-c.size/2,c.size,c.size*1.6);
        ctx.restore();
        if(c.y > ch + 40 || c.life <= 0) confetti.splice(i,1);
      }

      requestAnimationFrame(draw);
    }

    draw();

    /* ===== CARD 3D TILT ===== */
    const card = document.querySelector('.card');
    card.addEventListener('mousemove',(e)=>{
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
      const rx = (-dy * 8).toFixed(2);
      const ry = (dx * 8).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform = ''; });

    // trigger a small confetti burst when YES is clicked (center of card)
    const origYes = window.yesAnswer;
    window.yesAnswer = function(){
      origYes();
      const r = card.getBoundingClientRect();
      spawnConfetti(r.left + r.width/2, r.top + r.height/2, 45);
      // also add a few hearts near the top of the card
      for(let i=0;i<8;i++){
        hearts.push({ x: r.left + r.width*(0.2+Math.random()*0.6), y: r.top + 10 + Math.random()*20, vy: -(1+Math.random()*1.6), vx: (Math.random()-0.5)*1.4, size: 12 + Math.random()*18, alpha:1 });
      }
    };

  };

});