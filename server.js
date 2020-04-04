const express = require("express");
const server = express();

const ideas =[
  {
    img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Curso de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam iste dolore quasi eligendi ratione?",
    url: "https://rocketseat.com.br"
  },
  {
    img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam iste dolore quasi eligendi ratione?",
    url: "https://rocketseat.com.br"
  },
  {
    img:"https://image.flaticon.com/icons/svg/2729/2729009.svg",
    title: "Vídeos de Culinária",
    category: "Receitas",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam iste dolore quasi eligendi ratione?",
    url: "https://rocketseat.com.br"
  },
  {
    img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação ",
    category: "Saúde Mental",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam iste dolore quasi eligendi ratione?",
    url: "https://rocketseat.com.br"
  },
]

//arquivos estaticos
server.use(express.static("public"));

//nunjucks
const nunjucks = require ("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

//rotas
server.get("/", function(req, res) {

  const reverseIdeas = [...ideas].reverse()
  let lastIdeas = []
    for (let idea of reverseIdeas) {
        if(lastIdeas.length < 3) {
            lastIdeas.push(idea)
        }
    }

  return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideas", function(req, res) {

  const reverseIdeas = [...ideas].reverse()
  return res.render("ideas.html", { ideas: reverseIdeas })
})

server.listen(3000)