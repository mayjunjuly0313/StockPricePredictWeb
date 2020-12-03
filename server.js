"use strict";
let http = require("http");
let https = require("https");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");
let path = require("path");
let Template = require("./Template.js");
let stockAPI = require("./api/stockAPI");

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".eot": "aplication/vnd.ms-fontobject",
  ".ttf": "aplication/font-sfnt",
};

let app = http
  .createServer((request, response) => {
    let _url = request.url;
    const ext = path.parse(_url).ext;
    const publicPath = path.join(__dirname, "./");

    let pathName = url.parse(_url, true).pathname;
    let queryData = url.parse(_url, true).query;
    // console.log(queryData);
    if (Object.keys(mimeType).includes(ext)) {
      // console.log(pathName);
      fs.readFile(`${publicPath}${_url}`, (err, data) => {
        if (err) {
          response.statusCode = 404;
          response.end("Not found");
        } else {
          response.writeHead(200, { "Content-Type": mimeType[ext] });
          response.end(data);
        }
      });
    } else if (pathName === "/") {
      console.log(pathName);
      console.log(queryData.input);
      if (queryData.input != undefined) {
        console.log("got Data");
      } else if (queryData.name === undefined) {
        fs.readFile(`./data/ticker.json`, (err, data) => {
          if (data.length > 0) {
            let template = new Template();
            let body = template.getTemplate();
            response.writeHead(200);
            response.end(body);
          } else {
            let options = stockAPI.getStockOption();
            const req = https
              .request(options, (res) => {
                let body = "";
                res.on("data", (data) => {
                  body += data;
                  console.log(data);
                });
                res.on("end", (err) => {
                  console.log("get stock list data", body);
                  fs.writeFile(`./data/ticker.json`, body, "utf8", (err) => {
                    let template = new Template();
                    let body = template.getTemplate();
                    response.writeHead(200);
                    response.end(body);
                  });
                });
              })
              .end();
          }
        });
      } else {
        let companyName = queryData.name;
        fs.readFile(`./${companyName}.json`, (err, data) => {
          let compObj = JSON.parse(data);
          let companyTicker = compObj.symbol;
          let companyInfo = compObj.revenue;
          let template = new Template(companyName, companyTicker, companyInfo);
          let body = template.getTemplate();
          response.writeHead(200);
          response.end(body);
        });
      }
    } else if (pathName === "/process_search") {
      let body = "";
      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        let content = qs.parse(body);
        let companyName = content.companyName;
        console.log(content);
        response.writeHead(302, { Location: `/?name=${companyName}` });
        response.end();
      });
    }
  })
  .listen(3000);
