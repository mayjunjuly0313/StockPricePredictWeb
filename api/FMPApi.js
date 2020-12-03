const https = require("https");

const options = {
  hostname: "financialmodelingprep.com",
  port: 443,
  path:
    "/api/v3/search?query=AA&limit=10&exchange=NASDAQ&apikey=cf36470c1e414ce5be2edc6680dd81ba",
  method: "GET",
};

const req = https.request(options, (res) => {
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
