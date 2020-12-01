"use strict";
let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");
let Template = require("./Template.js");

let app = http
  .createServer((request, response) => {
    let _url = request.url;
    let pathName = url.parse(_url, true).pathname;
    let queryData = url.parse(_url, true).query;
    if (pathName === "/") {
      if (queryData.name === undefined) {
        console.log("sdasd");
        let template = new Template();
        let body = template.getTemplate();
        response.writeHead(200);
        response.end(body);
      } else {
        let companyName = queryData.name;
        console.log(companyName);
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
