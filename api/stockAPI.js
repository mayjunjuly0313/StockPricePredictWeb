const https = require("https");
const fs = require("fs");

module.exports = {
  getStockOption: () => {
    const KEY = "cf36470c1e414ce5be2edc6680dd81ba";
    const options = {
      hostname: "financialmodelingprep.com",
      port: 443,
      path: `/api/v3/stock/list/?apikey=${KEY}`,
      method: "GET",
    };
    return options;
  },
};
