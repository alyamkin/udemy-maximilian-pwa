var button = document.querySelector('#start-button');
var output = document.querySelector('#output');

button.addEventListener('click', function () {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor

  const getUrl = new Promise((resolve) => {
    setTimeout(function () {
      resolve('https://swapi.dev/api/people/1');
    }, 3000);
  });

  getUrl
    .then((url) => fetch(url))
    .then((response) => response.json())
    .then((data) => (output.textContent = data.name))
    .catch((error) => console.log(error));

  const getUrl2 = new Promise((resolve) => {
    setTimeout(function () {
      resolve('https://httpbin.org/put');
    }, 3000);
  });

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ person: { name: 'Andrey', age: 28 } }),
  };

  getUrl2
    .then((url) => fetch(url, params))
    .then((response) => response.json())
    .then((data) => (output.textContent = data.json.person.name))
    .catch((error) => console.log(error));

  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)

  // Handle the response of the fetch() call and extract the JSON data, return that
  // and handle it in yet another then() block

  // Finally, output the "name" property of the data you got back (e.g. data.name) inside
  // the "output" element (see variables at top of the file)

  // Repeat the exercise with a PUT request you send to https://httpbin.org/put
  // Make sure to set the appropriate headers (as shown in the lecture)
  // Send any data of your choice, make sure to access it correctly when outputting it
  // Example: If you send {person: {name: 'Max', age: 28}}, you access data.json.person.name
  // to output the name (assuming your parsed JSON is stored in "data")

  // To finish the assignment, add an error to URL and add handle the error both as
  // a second argument to then() as well as via the alternative taught in the module
});
