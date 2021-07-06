import express from "express"
import Article from "../models/Article.js"

const articlesRouter = new express.Router()

articlesRouter.get("/", (req, res) => {
    res.render("articles/index", { articles: Article.findAll() })
})

articlesRouter.get("/new", (req, res) => {
    res.render("articles/new/index", {})
})

articlesRouter.post("/", (req, res) => {
    const inputTitle = req.body.title
    const inputUrl = req.body.url

    if (inputTitle && inputUrl && (inputUrl.startsWith("http://") || inputUrl.startsWith("https://"))) {
        const newArticle = new Article({ title: inputTitle, url: inputUrl })
        newArticle.save()
        res.redirect("/articles")
    } else if (inputUrl &&
        (inputUrl.startsWith("http://") ||
            inputUrl.startsWith("https://"))) {
        res.render("articles/new/index", { error: "You need to input a Title" })
    } else if (inputTitle && inputUrl &&
        (!inputUrl.startsWith("http://") &&
            !inputUrl.startsWith("https://"))) {
        res.render("articles/new/index", { error: "A valid link should start with http:// or https://" })
    } else {
        res.render("articles/new/index", { articles: Article.findAll() });
    }
})

export default articlesRouter