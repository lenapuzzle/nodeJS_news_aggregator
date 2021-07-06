import fs from "fs"
import _ from "lodash"

const articlesPath = "articles.json"
const articlesJson = () => {
    return JSON.parse(fs.readFileSync(articlesPath))
}

class Article {
    constructor({ title, url }) {
        this.title = title
        this.url = url
    }

    static findAll() {
        const articlesData = articlesJson().articles
        console.log(articlesData)
        const articles = articlesData.map(article => {
            return new Article(article)
        })
        return articles
    }

    save() {
        const existingArticles = this.constructor.findAll()
        existingArticles.push(this)
        fs.writeFileSync(articlesPath, JSON.stringify({ articles: existingArticles }))
    }
}

export default Article