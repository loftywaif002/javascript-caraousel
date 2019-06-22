webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_style_css__);



/**
 * Defines methods to fetch and load data from server
 * to create a carousal on DOM
 * implements functionalities to navigate using a keyboard
 */
class Carousel {
  constructor() {
    // Global Variable
    this.imageArray = [];
    this.index = 3;
    this.elementCounter = 7;
    this.initialIndex = 0;

    // Fetching data from server
    this.getData("http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=2018-06-10&sportId=1", this.filterLoadedData);

    document.body.addEventListener("keydown", this.imageCycle());
  }

  /**
   * @param {url} url Api Endpoint to get Data
   * @param {callback} callback Callback function to be invoked after receiving response
   */
  getData(url, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.onerror = function (e) {
      console.error(xmlhttp.statusText);
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  /**
   * @param {data} data Stringified JSON data
   */
  filterLoadedData(data) {
    console.log('data received', data);
    var obj = JSON.parse(data);
    this.imageArray = obj.dates[0].games[0].content.editorial.recap.mlb;
    this.renderCarousel(this.initialIndex, this.elementCounter, this.imageArray);
  }

  /**
   * @param {initialIndex} initialIndex starting index of array containing image link
   * @param {counter} counter  be incremented to limit for loop iteration over image array
   * @param {imageArray} imageArray  array containing all links of images
   */
  renderCarousel(initialIndex, counter, imageArray) {
    for (let i = initialIndex; i < counter; i++) {
      let link = imageArray.image.cuts[i].src;
      let title = imageArray.image.title;
      let subtitle = imageArray.subhead;

      this.createCarousel(link, i, title, subtitle);
    }
  }

  /**
   * @param {link} link image url
   * @param {counter} counter  be incremented to limit for loop iteration over image array
   * @param {title} title  title of the image
   * @param {subtitle} subtitle subtitle of the image
   */
  createCarousel(link, counter, title, subtitle) {
    var column = document.createElement("div");
    column.className = "column";

    var head = document.createElement("h2");
    head.classList.add("headline");
    head.classList.add("hide");
    var headContent = document.createTextNode(title);
    head.appendChild(headContent);

    column.appendChild(head); // Appending Title here

    var subhead = document.createElement("p");
    subhead.classList.add("meta");
    subhead.classList.add("hide");
    var subheadContent = document.createTextNode(subtitle);
    subhead.appendChild(subheadContent);

    var imageWrapper = document.createElement("div");
    imageWrapper.className = "img-wrap";

    var image = document.createElement("img");
    image.setAttribute("src", link);
    image.setAttribute("alt", "Sports");
    image.setAttribute("width", "100%");

    if (counter === 3) {
      image.classList.add("hover");
      head.classList.remove("hide");
      subhead.classList.remove("hide");
    }

    imageWrapper.appendChild(image);
    column.appendChild(imageWrapper);

    column.appendChild(subhead);

    document.getElementsByClassName("row")[0].appendChild(column);
  }

  /**
   * @param {e} e event object
   */
  imageCycle(e) {
    let row = document.getElementsByClassName("row")[0];

    // get access to each img element
    let totalElementCount = row.childElementCount;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;

    if (e.keyCode === LEFT_KEY) {
      //left <- show Prev image
      if (this.index <= totalElementCount - 1) {
        if (this.index === 0) {
          row.children[this.index].children[1].children[0].classList.remove("hover");
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = totalElementCount - 1;
          row.children[this.index].children[1].children[0].classList.add("hover");
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        } else {
          row.children[this.index].children[1].children[0].classList.remove("hover");
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = this.index - 1;
          row.children[this.index].children[1].children[0].classList.add("hover");
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        }
      }
    } else if (e.keyCode === RIGHT_KEY) {
      // right -> show next image
      if (this.index >= 0) {
        if (this.index === totalElementCount - 1) {
          row.children[this.index].children[1].children[0].classList.remove("hover");
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = 0;
          row.children[this.index].children[1].children[0].classList.add("hover");
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        } else {
          row.children[this.index].children[1].children[0].classList.remove("hover");
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = this.index + 1;
          row.children[this.index].children[1].children[0].classList.add("hover");
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        }
      }
    }
  }
}
/* harmony export (immutable) */ exports["default"] = Carousel;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n    margin:0;\n    padding:0;\n}\n\nbody {\n    background-image: url(\"http://mlb.mlb.com/mlb/images/devices/ballpark/1920x1080/1.jpg\");\n\t  font:62.5% helvetica,arial,sans-serif;\n    margin-left: 0.5%;\n    margin-right: 0.5%;\n}\n\nbody * {\n    -moz-box-sizing:border-box;\n    -webkit-box-sizing:border-box;\n    box-sizing:border-box;\n}\n\n\n.row {\n  margin-top: 10%;\n  display: flex;\n}\n\n.column {\n  margin: 25px;\n  flex: 33.33%;\n  padding: 0px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n}\n\n\n.img-wrap {\n  background: black;\n  display: block;\n  line-height: 0;\n}\n.img-wrap > img {\n  opacity: 0.6;\n}\n\n/* [2] Transition property for smooth transformation of images */\n.img-wrap img {\n  transition: transform .5s ease;\n}\n\n.hover{\n  transform: scale(1.5);\n  opacity: 1 !important;\n}\n\n.headline {\n  font-family: 'Geneva', Tahoma,Verdana,sans-serif;\n  font-size: 1rem;\n  font-weight: bold;\n  line-height: 1.5;\n  text-align: center;\n  color: white;\n  margin-bottom: 18%;\n}\n\n.meta {\n  font-family: 'Geneva',Tahoma,Verdana,sans-serif;\n  font-size: 0.9rem;\n  line-height: 1;\n  text-align: center;\n  color: white;\n  margin-top: 20%;\n}\n\n.hide{\n  visibility: hidden;\n}\n", ""]);

// exports


/***/ }
]);