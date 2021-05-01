// Having a reference connection to the DOM
const firstDiv = document.querySelector(".firstDiv");
const secDiv = document.querySelector(".secDiv");
const thirdDiv = document.querySelector(".thirdDiv");
const fourthDiv = document.querySelector(".fourtDiv");
const fifthDiv = document.querySelector(".fifthDiv");
const sixDiv = document.querySelector(".sixDiv");
const prevDiv = document.querySelector(".Prev");
const nextDiv = document.querySelector(".Nex");
let start = 0;

// Function to make API calls
const fetchCall = async (url, method, body = undefined) => {
  const object = {
    method,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, object);
    const statusCode = response.status;
    const responseObj = await response.json();
    return { responseObj, statusCode };
  } catch (err) {
    const error = true;
    return { error };
  }
};
// Functions to get photos
const getPhoto = async (start, limit) => {
  const url = `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
  const { responseObj, statusCode, error } = await fetchCall(url, "GET");
  if (!error) {
    if (statusCode === 200) {
      return responseObj;
    }
    return false;
  }
};

// Fires when the window is fully loaded
window.addEventListener("load", async () => {
  getPhotos(start);
});
// Function that updates the Image tag with the source
const getPhotos = async (start) => {
  const data = await getPhoto(start, 6);
  firstDiv.setAttribute("src", data[0]["url"]);
  firstDiv.nextElementSibling.textContent = data[0]["title"];
  secDiv.setAttribute("src", data[1]["url"]);
  secDiv.nextElementSibling.textContent = data[1]["title"];
  thirdDiv.setAttribute("src", data[2]["url"]);
  thirdDiv.nextElementSibling.textContent = data[2]["title"];
  fourthDiv.setAttribute("src", data[3]["url"]);
  fourthDiv.nextElementSibling.textContent = data[3]["title"];
  fifthDiv.setAttribute("src", data[4]["url"]);
  fifthDiv.nextElementSibling.textContent = data[4]["title"];
  sixDiv.setAttribute("src", data[5]["url"]);
  sixDiv.nextElementSibling.textContent = data[5]["title"];
};
prevDiv.addEventListener("click", (event) => {
  event.preventDefault();
  if (start === 0) return;
  start -= 6;
  getPhotos(start);
});
nextDiv.addEventListener("click", (event) => {
  event.preventDefault();
  start += 6;
  getPhotos(start);
});
