
const API_URL = "http://localhost:3000";


async function carregarTecnologias() {
  const resp = await fetch(`${API_URL}/tecnologias`);
  const tecnologias = await resp.json();
  const grid = document.querySelector(".tech-grid");
  grid.innerHTML = "";
  tecnologias.forEach(tec => {
    grid.innerHTML += `
      <div class="tech-card">
        <div class="tech-icon"><i class="${tec.icone}"></i></div>
        <h3>${tec.nome}</h3>
        <p>${tec.descricao}</p>
      </div>
    `;
  });
}


async function carregarBeneficios() {
  const resp = await fetch(`${API_URL}/beneficios`);
  const beneficios = await resp.json();
  const container = document.querySelector(".benefits-container");
  container.innerHTML = "";
  beneficios.forEach(ben => {
    container.innerHTML += `
      <div class="benefit-item">
        <div class="benefit-icon"><i class="${ben.icone}"></i></div>
        <div class="benefit-content">
          <h3>${ben.nome}</h3>
          <p>${ben.descricao}</p>
        </div>
      </div>
    `;
  });
}


async function carregarCasos() {
  const resp = await fetch(`${API_URL}/casos`);
  const casos = await resp.json();
  const slider = document.querySelector(".cases-slider");
  slider.innerHTML = casos.map((caso, idx) => `
    <div class="case-card${idx === 0 ? " active" : ""}">
      <div class="case-image">
        <img src="${caso.imagem}" alt="${caso.titulo}">
      </div>
      <div class="case-content">
        <h3>${caso.titulo}</h3>
        <p>${caso.descricao}</p>
      </div>
    </div>
  `).join("");

  
  const dots = document.querySelector(".slider-dots");
  dots.innerHTML = casos.map((_, idx) =>
    `<span class="dot${idx === 0 ? " active" : ""}" data-index="${idx}"></span>`
  ).join("");

  
  let current = 0;
  function showSlide(idx) {
    const cards = document.querySelectorAll('.case-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    cards.forEach(card => card.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    cards[idx].classList.add("active");
    dots[idx].classList.add("active");
    current = idx;
  }
  document.querySelector(".prev-btn").onclick = () => showSlide((current - 1 + casos.length) % casos.length);
  document.querySelector(".next-btn").onclick = () => showSlide((current + 1) % casos.length);
  document.querySelectorAll('.slider-dots .dot').forEach(dot =>
    dot.onclick = () => showSlide(Number(dot.dataset.index))
  );
}


document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = {
    name: this.name.value,
    email: this.email.value,
    subject: this.subject.value,
    message: this.message.value
  };
  const resp = await fetch(`${API_URL}/contato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (resp.ok) {
    alert("Mensagem enviada com sucesso!");
    this.reset();
  } else {
    alert("Erro ao enviar mensagem.");
  }
});


document.getElementById("newsletterForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = this.querySelector("input[type=email]").value;
  const resp = await fetch(`${API_URL}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (resp.ok) {
    alert("Inscrição realizada com sucesso!");
    this.reset();
  } else {
    alert("Erro ao inscrever.");
  }
});


const formUsuario = document.getElementById('userForm');
if (formUsuario) {
  formUsuario.addEventListener('submit', async function(e){
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagemCadastro');

    try {
      const resp = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
      });
      if (resp.status === 409) {
        mensagem.textContent = "E-mail já cadastrado!";
        mensagem.style.color = "red";
      }
      else if (resp.ok) {
        mensagem.textContent = "Usuário cadastrado com sucesso!";
        mensagem.style.color = "green";
        formUsuario.reset();
      } else {
        mensagem.textContent = "Erro ao cadastrar usuário.";
        mensagem.style.color = "red";
      }
    } catch {
      mensagem.textContent = "Erro de conexão com o servidor.";
      mensagem.style.color = "red";
    }
  });
}


window.addEventListener("DOMContentLoaded", () => {
  carregarTecnologias();
  carregarBeneficios();
  carregarCasos();
});
