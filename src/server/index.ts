import express from "express"
import { join } from "path";
import { static as estatic } from "express"
import Webpack from "webpack"
import WebpackDevMiddleware from "webpack-dev-middleware"
import { bindScraper } from "./scrape";

const webpackConfig = require('../../webpack.config');
const compiler = Webpack(webpackConfig)
const devMiddleware = WebpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
})

var app = express();
 
app.use("/static",estatic(join(__dirname,"../../public/dist")))
 
app.get("/", function(req, res, next){
  res.sendFile(join(__dirname,"../../public/index.html"))
});

app.get("/favicon.ico", (req,res) => {
  res.sendFile(join(__dirname,"../../public/favicon.ico"))
})

app.use("/js",devMiddleware)
bindScraper(app)

app.listen(8080,() => {
  console.log("Listening!");
});
