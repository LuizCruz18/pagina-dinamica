const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


let tecnologias = [
  { id: 1, nome: "Agricultura de Precisão", descricao: "Utilização de GPS, sensores e imagens de satélite para monitorar e otimizar o uso de recursos nas lavouras.", icone: "fas fa-satellite" },
  { id: 2, nome: "Robótica Agrícola", descricao: "Máquinas autônomas e robôs que realizam plantio, colheita e monitoramento com precisão e eficiência.", icone: "fas fa-robot" },
  { id: 3, nome: "Irrigação Inteligente", descricao: "Sistemas que monitoram a umidade do solo e condições climáticas para otimizar o uso da água.", icone: "fas fa-tint" },
  { id: 4, nome: "Drones Agrícolas", descricao: "Monitoramento aéreo de plantações, pulverização de precisão e mapeamento detalhado de áreas cultivadas.", icone: "fas fa-drone" },
  { id: 5, nome: "Biotecnologia", descricao: "Desenvolvimento de sementes melhoradas geneticamente para maior produtividade e resistência a pragas.", icone: "fas fa-dna" },
  { id: 6, nome: "IoT no Campo", descricao: "Sensores conectados que monitoram em tempo real diversos parâmetros da lavoura e do rebanho.", icone: "fas fa-cloud" }
];

let beneficios = [
  { id: 1, nome: "Aumento de Produtividade", descricao: "Tecnologias modernas permitem produzir mais em menos espaço, otimizando recursos e aumentando a eficiência.", icone: "fas fa-chart-line" },
  { id: 2, nome: "Sustentabilidade", descricao: "Redução do uso de água, fertilizantes e defensivos, minimizando o impacto ambiental da produção agrícola.", icone: "fas fa-leaf" },
  { id: 3, nome: "Redução de Custos", descricao: "Otimização de processos e uso eficiente de insumos resultam em economia significativa para o produtor.", icone: "fas fa-dollar-sign" },
  { id: 4, nome: "Gestão de Riscos", descricao: "Monitoramento constante permite identificar problemas precocemente e tomar decisões baseadas em dados.", icone: "fas fa-shield-alt" }
];

let casos = [
  { id: 1, titulo: "Soja no Mato Grosso", imagem: "https://www.rhdagro.com.br/wp-content/uploads/2022/11/1665679419139.jpeg", descricao: "Sensores mapeiam a fertilidade do solo em tempo real, drones identificam áreas com deficiência nutricional, tratores com taxa variável aplicam adubo apenas onde é necessário. Resultado: Redução de 20% no uso de fertilizantes e aumento de 3 a 5 sacas por hectare." },
  { id: 2, titulo: "Café em Minas Gerais", imagem: "https://www.agenciaminas.mg.gov.br/system/news/images/000/124/941/original/Caf%C3%A9.jpg?1737732621", descricao: "Sensores medem umidade do solo e clima. O sistema libera água apenas quando e onde a planta precisa. Resultado: Economia de 30% de água e aumento de 15% na produtividade." },
  { id: 3, titulo: "Milho No Paraná", imagem: "https://s2.glbimg.com/eVwP3SBEjMn-WojBcB_lPfM1Uds=/780x440/e.glbimg.com/og/ed/f/original/2015/12/18/milho-colheita.jpg", descricao: "Máquinas trabalham 24h com precisão centimétrica, evitam sobreposição de sementes e defensivos. Resultado: Economia de 15% em combustível e insumos." }
];

let usuarios = []; 
let mensagens = [];
let newsletter = [];


app.get('/tecnologias', (req, res) => res.json(tecnologias));
app.post('/tecnologias', (req, res) => {
  const nova = { id: Date.now(), ...req.body };
  tecnologias.push(nova);
  res.status(201).json(nova);
});
app.put('/tecnologias/:id', (req, res) => {
  const idx = tecnologias.findIndex(t => t.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  tecnologias[idx] = { ...tecnologias[idx], ...req.body };
  res.json(tecnologias[idx]);
});
app.delete('/tecnologias/:id', (req, res) => {
  tecnologias = tecnologias.filter(t => t.id != req.params.id);
  res.status(204).send();
});


app.get('/beneficios', (req, res) => res.json(beneficios));
app.post('/beneficios', (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  beneficios.push(novo);
  res.status(201).json(novo);
});
app.put('/beneficios/:id', (req, res) => {
  const idx = beneficios.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  beneficios[idx] = { ...beneficios[idx], ...req.body };
  res.json(beneficios[idx]);
});
app.delete('/beneficios/:id', (req, res) => {
  beneficios = beneficios.filter(b => b.id != req.params.id);
  res.status(204).send();
});


app.get('/casos', (req, res) => res.json(casos));
app.post('/casos', (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  casos.push(novo);
  res.status(201).json(novo);
});
app.put('/casos/:id', (req, res) => {
  const idx = casos.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  casos[idx] = { ...casos[idx], ...req.body };
  res.json(casos[idx]);
});
app.delete('/casos/:id', (req, res) => {
  casos = casos.filter(c => c.id != req.params.id);
  res.status(204).send();
});


app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e e-mail são obrigatórios!" });
  }
  
  if (usuarios.some(u => u.email === email)) {
    return res.status(409).json({ mensagem: "E-mail já cadastrado!" });
  }
  const novoUsuario = { id: Date.now(), nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});
app.get('/usuarios', (req, res) => res.json(usuarios));


app.post('/contato', (req, res) => {
  mensagens.push({ id: Date.now(), ...req.body });
  res.status(201).json({ mensagem: 'Mensagem recebida!' });
});


app.post('/newsletter', (req, res) => {
  newsletter.push({ id: Date.now(), ...req.body });
  res.status(201).json({ mensagem: 'Inscrição realizada!' });
});
app.delete('/newsletter/:id', (req, res) => {
  newsletter = newsletter.filter(n => n.id != req.params.id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
