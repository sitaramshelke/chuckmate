const program = require("commander");

function collect(val, memo) {
  memo.push(val);
  return memo;
}

module.exports = () => {
  const Joke = require("./joke.js");

  program.version("1.0.0");

  program.option("-l --list-categories", "List all the available categories.");

  program.option(
    "-c, --category <category>",
    "Specify a category to filter. Can be used multiple times for multiple categories",
    collect,
    []
  );

  program.parse(process.argv);

  if (process.argv.length == 2) {
    Joke.random();
  } else if (program.listCategories) {
    Joke.printCategories();
  } else if (program.category != undefined && program.category.length > 0) {
    Joke.random({ categories: program.category });
  }
};
