const searchInput = document.getElementById("companySearch");
const autocomp = document.querySelector(".autocom-box");

searchInput.addEventListener("input", (event) => {
  // console.log(event);
  let name = searchInput.value;

  console.log();
  fetch(`/?input=${name}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log(res);
      }
    });
});
