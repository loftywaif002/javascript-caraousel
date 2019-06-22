"use strict"
import '../styles/style.css'

class Carousel {
  constructor() {
    // Global Variable
    this.imageArray = [];
    this.index = 3;
    this.elementCounter = 7;
    this.initialIndex = 0;

    this.imageCycle = this.imageCycle.bind(this)

    // Attaching keydown event to the body of the document
    document.body.addEventListener("keydown", this.imageCycle)
  }

  /**
   * @param {url} url Api Endpoint to get Data
   * @param {callback} callback Callback function to be invoked after receiving response
   */
getData(url) {
    return new Promise((resolve, reject) => {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.onload = () => {
          if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
              resolve(xmlhttp.response);
          } else {
              reject(xmlhttp.statusText);
          }
      };
      xmlhttp.onerror = () => reject(xmlhttp.statusText);
      xmlhttp.send();
  });
 }

  /**
   * @param {data} data Stringified JSON data
   */
  filterLoadedData(data) {
    data.then((res)=>{
      var obj = JSON.parse(res)
      this.imageArray = obj.dates[0].games[0].content.editorial.recap.mlb;
      this.renderCarousel(
        this.initialIndex,
        this.elementCounter,
        this.imageArray
      );
      console.log(this.imageArray)
    }).catch((error)=>{
      console.log(error)
    })
  }

  /**
   * @param {initialIndex} initialIndex starting index of array containing image link
   * @param {counter} counter  be incremented to limit for loop iteration over image array
   * @param {imageArray} imageArray  array containing all links of images
   */
  renderCarousel(initialIndex, counter, imageArray) {
    for (let i = initialIndex; i < counter; i++) {
      let link = imageArray.image.cuts[i].src
      let title = imageArray.seoKeywords 
      let subtitle = imageArray.image.title

      this.createCarousel(link, i, title, subtitle)
    }
  }

  /**
   * @param {link} link image url
   * @param {counter} counter  be incremented to limit for loop iteration over image array
   * @param {title} title  title of the image
   * @param {subtitle} subtitle subtitle of the image
   * Description : create dom nodes as div -> h2 -> div -> img -> p
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

    var subhead = document.createElement("p")
    subhead.classList.add("meta")
    subhead.classList.add("hide")
    var subheadContent = document.createTextNode(subtitle)
    subhead.appendChild(subheadContent);

    var imageWrapper = document.createElement("div")
        imageWrapper.className = "img-wrap"

    var image = document.createElement("img")
    image.setAttribute("src", link)
    image.setAttribute("alt", "Sports")
    image.setAttribute("width", "100%")

    if (counter === 3) {
      image.classList.add("hover")
      head.classList.remove("hide")
      subhead.classList.remove("hide")
    }

    imageWrapper.appendChild(image)
    column.appendChild(imageWrapper)

    column.appendChild(subhead)

    document.getElementsByClassName("row")[0].appendChild(column)
  }

  /**
   * @param {e} e event object
   */
  imageCycle(e) {

    let row = document.getElementsByClassName("row")[0]

    // get access to each img element
    let totalElementCount = row.childElementCount;

    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const ENTER = 13

    if (e.keyCode === LEFT_KEY) {
      //left <- show Prev image
      if (this.index <= totalElementCount - 1) {
        
        if (this.index === 0) {
          row.children[this.index].children[1].children[0].classList.remove(
            "hover"
          );
          row.children[this.index].children[0].classList.add("hide")
          row.children[this.index].children[2].classList.add("hide")
          this.index = totalElementCount - 1;
          row.children[this.index].children[1].children[0].classList.add(
            "hover"
          );
          row.children[this.index].children[0].classList.remove("hide")
          row.children[this.index].children[2].classList.remove("hide")
        } else {
          row.children[this.index].children[1].children[0].classList.remove(
            "hover"
          );
          row.children[this.index].children[0].classList.add("hide")
          row.children[this.index].children[2].classList.add("hide")
          this.index = this.index - 1;
          row.children[this.index].children[1].children[0].classList.add(
            "hover"
          );
          row.children[this.index].children[0].classList.remove("hide")
          row.children[this.index].children[2].classList.remove("hide")
        }
      }
    } else if (e.keyCode === RIGHT_KEY) {
      // right -> show next image
      if (this.index >= 0) {
        
        if (this.index === totalElementCount - 1) {

          row.children[this.index].children[1].children[0].classList.remove(
            "hover"
          );
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = 0;
          row.children[this.index].children[1].children[0].classList.add(
            "hover"
          );
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        } else {
          row.children[this.index].children[1].children[0].classList.remove(
            "hover"
          );
          row.children[this.index].children[0].classList.add("hide");
          row.children[this.index].children[2].classList.add("hide");
          this.index = this.index + 1;
          row.children[this.index].children[1].children[0].classList.add(
            "hover"
          );
          row.children[this.index].children[0].classList.remove("hide");
          row.children[this.index].children[2].classList.remove("hide");
        }
      }
    }
    else if (e.keyCode === ENTER) {
      // Show modal here
      alert('Enter button Pressed')
    }
  }
  
  // This function can be used remove elements in the row 
  cleanUp(){
    var elements = document.getElementsByClassName("row")[0].getElementsByClassName("column")
     while (elements.length > 0) {
       elements[0].parentNode.removeChild(elements[0])
     }
   }

}

let carousel = new Carousel()

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()+1
let day = date.getDay()

let today = year.toString()+'-'+month.toString()+'-'+day.toString()


let url = `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${today}&sportId=1`

// Fetch data from server
let data = carousel.getData(url)

// filter data
carousel.filterLoadedData(data)

