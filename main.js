const search = document.getElementById("companySearch");
const autocomp = document.querySelector(".autocom-box");

// searchInput.addEventListener("input", (event) => {
//   // console.log(event);
//   let name = searchInput.value;

//   console.log();

//   fetch(`/?input=${name}`)
//     .then((res) => res.json())
//     .then((res) => {
//       if (res.success) {
//         console.log(res);
//       }
//     });
// });

const searchStocks = async (searchText) => {
  let res = await fetch("./data/ticker.json");
  let stocks = await res.json();

  let matches = stocks.filter((stock) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return stock.name.match(regex) || stock.symbol.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    autocomp.innerHTML = "";
  }
  autocompOutput(matches);
};

const autocompOutput = (matches) => {
  let list = "";
  for (let i = 0; i < Math.min(5, matches.length); i++) {
    list += `<li class="autocompList">${matches[i].name}<span class="ticker"> ${matches[i].symbol}</span></li>`;
  }

  // if (matches.length > 0) {
  //   let list = "";
  //   matches.map((match) => {
  //     list += `<li class="autocompList">${match.name}<span class="ticker"> ${match.symbol}</span></li>`;
  //   });

  //   autocomp.innerHTML = list;
  // }
  autocomp.innerHTML = list;
};

search.addEventListener("input", () => searchStocks(search.value));
