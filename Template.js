const { timeStamp } = require("console");
class Template {
  constructor(name = "", ticker = "", description = "") {
    this.name = name;
    this.ticker = ticker;
    this.description = description;
  }

  get name() {
    return this._name;
  }

  get ticker() {
    return this._ticker;
  }

  get description() {
    return this._description;
  }

  set name(value) {
    this._name = value;
  }
  set ticker(value) {
    this._ticker = value;
  }
  set description(value) {
    this._description = value;
  }

  getTemplate() {
    return `
    <!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script defer src="./main.js"></script>
		</head>
		<body>
				<form action="/process_search" method="POST">
						<input id="companySearch" type="text" name="companyName" placeholder="Search Company">
            <input type="submit" value="search">
            <div>
              <ul class="autocom-box">
              </ul>
            </div>
        </form>
        <div>
        <h2>${this.name}</h2>${this.ticker}
        <p>${this.description}</p>
        </div>
		</body>
		</html>
		`;
  }
}

module.exports = Template;
