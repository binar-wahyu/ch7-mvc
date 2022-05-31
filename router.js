const router = require("express").Router();
const article = require("./controllers/articleController");

router.get("/articles", article.index);
router.get("/articles/create", article.create);
router.post("/articles", article.store);
router.get("/articles/:id", article.show);
