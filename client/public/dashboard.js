const searchForm = document.getElementById('search-form');
const API_KEY = 'kLvHt2puR01mwrVfJM2yyP2m7CkQ1KvuIAAERSrc';



const getApiData = async (input) => {
  //const brandName = results.openfda.brand_name
  try {
    const SEARCH_URL = `https://api.fda.gov/drug/label.json?search=openfda.brand_name=${input}&limit=4`;

    //const ALT_SEARCH_URL = `https://api.fda.gov/drug/label.json?search=openfda.generic_name=${input}&limit=4`;

    const response = await fetch(SEARCH_URL);
    const data = await response.json();
    displayResults(data.results);
    console.log(data.results);
  } catch (error) {
    console.log("Your request could not be processed.")
  }

}

//Search results list//
const displayResults = (medList) => {

  for (let i = 0; i < medList.length; i++) {
    const ulTag = document.createElement("ul")
    const route = document.createElement("li")
    const brandName = document.createElement("li")
    const genericName = document.createElement("li")
    route.innerHTML = medList[i].openfda.route
    brandName.innerHTML = medList[i].openfda.brand_name
    genericName.innerHTML = medList[i].openfda.generic_name
    ulTag.appendChild(route)
    ulTag.appendChild(brandName)
    ulTag.appendChild(genericName)
    document.getElementById('search-results').appendChild(ulTag)
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('#med-search').value;
  getApiData(input);
  console.log(input);

});






