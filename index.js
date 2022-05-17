const express = require("express");
const { Article } = require("./models");

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/articles", (req, res) => {
  Article.findAll().then((articles) => {
    res.render("articles/index", {
      articles,
    });
  });
});

// GET /articles/create, menampilkan form create
app.get("/articles/create", (req, res) => {
  res.render("articles/create");
});

// POST /articles, buat artikel baru
app.post("/articles", (req, res) => {
  Article.create({
    title: req.body.title,
    body: req.body.body,
  }).then((article) => {
    res.redirect("/articles");
  });
});

app.get("/articles/:id", (req, res) => {
  Article.findOne({
    where: { id: req.params.id },
  }).then((article) => {
    // Karena hasil dari promise findOne adalah object,
    // Maka bisa kita lempar langsung ke method render
    res.render("articles/show", article.dataValues);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
