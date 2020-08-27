const searchForm = document.getElementById('search-form');
const API_KEY = 'kLvHt2puR01mwrVfJM2yyP2m7CkQ1KvuIAAERSrc';
const SEARCH_URL = 'https://api.fda.gov/drug/label.json';

const getApiData = (input, callback) => {
   const query = {
       url: SEARCH_URL,
       data: {
           search: `openfda.brand_name:${input}`,
           limit: 4
       },
   };
   fetch(SEARCH_URL, query.data, searchMeds)
   .fail(() => {
       alert('item not found');
   });
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();

})