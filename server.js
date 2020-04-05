const express = require("express");
const server = express();
const db = require("./db")

//arquivos estaticos
server.use(express.static("public"));
server.use(express.urlencoded({ extend: true }))

//nunjucks

const nunjucks = require ("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

//rotas
server.get("/", function(req, res) {

  db.all('SELECT * FROM ideas', function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }

    const reverseIdeas = [...rows].reverse()

    let lastIdeas = []
      for (let idea of reverseIdeas) {
          if(lastIdeas.length < 3) {
              lastIdeas.push(idea)
          }
      }
    
      return res.render("index.html", { ideas: lastIdeas })
  })
})

server.get("/ideas", function(req, res) {
  db.all('SELECT * FROM ideas', function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }

    const reverseIdeas = [...rows].reverse()
    return res.render("ideas.html", { ideas: reverseIdeas })
  })
})
server.post("/", function(req, res) {
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES(?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]

  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }

    return res.redirect("/ideas")
  })
})

//server.delete() --------- implementar

server.listen(3000)