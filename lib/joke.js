var request = require("request");
var API = "https://api.icndb.com/jokes";
var RANDOM = "random?escape=javascript";
var CATERGORIES = ["nerdy", "explicit", "chuck_norris", "bruce_schneier"];
var DEFAULT_EXCLUDE = ["explicit"];
var CATERGORIES_MAP = {
  "nerdy": "nerdy",
  "explicit": "explicit",
  "chuck_norris": "chuck norris",
  "bruce_schneier": "bruce schneier"
}

function get(url, callback) {
  request(url, function(error, response, body) {
    try {
      if (error != null || response == undefined) {
        console.log(
          "There was some issue while fetching data. \nERROR: " + error
        );
      }
      if (response.statusCode != 200) {
        console.log(`Request unsuccessful status: ${response.statusCode}`);
      }

      var info = JSON.parse(body);
      if (info.type == "success") {
        callback(getJoke(info));
      }
    } catch (error) {
      console.log("Exception: \n%s", error);
    }
  });
}

function getJoke(body) {
  return body.value.joke || "";
}

function validateCategories(categories) {
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    if (CATERGORIES_MAP[category] == undefined) {
      console.log("Category %s is invalid", category);
      return false;
    }
  }
  return true;
}

function makeUrl(url, options) {
  let urlArgs = "";
  let defaultOpt = true;
  if (options.categories != undefined) {
    let categories = options.categories;
    if (validateCategories(categories)) {
      urlArgs = `&limitTo=[${categories.join(",")}]`;
    } else {
      return undefined;
    }
    defaultOpt = false;
  }
  if (defaultOpt == true) {
    urlArgs = `&exclude=${DEFAULT_EXCLUDE}`;
  }
  if (urlArgs != "") {
    url += `?${urlArgs}`;
  }

  return url;
}

exports.printCategories = () => {
  console.log(CATERGORIES);
};

exports.random = (options = {}) => {
  let url = makeUrl(`${API}/${RANDOM}`, options);
  if (url != undefined) {
    get(url, joke => {
      console.log(joke);
    });
  }
};
