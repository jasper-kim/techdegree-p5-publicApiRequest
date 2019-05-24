//Constant variables
const url = "https://randomuser.me/api/?results=12&nat=ca";
const galleryDiv = document.getElementById('gallery');

//Handle fetch requests
async function getJSON(url) {
    try{
        const response = await fetch(url);
        return await response.json();
    } catch(error) {
        throw error;
    }
}

async function getEmployees(url) {
    const employeesJSON = await getJSON(url);
    return employeesJSON.results;     
}

console.log(getEmployees(url));

