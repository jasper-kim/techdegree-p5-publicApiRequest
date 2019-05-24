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

// Generate the markup for each employee
function displayEmployees(data) {
    data.map(empolyee => {
        const employeeHTML = `
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${empolyee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${empolyee.name.first}</h3>
                <p class="card-text">${empolyee.email}</p>
                <p class="card-text cap">${empolyee.location.city}, ${empolyee.location.state}</p>
            </div>
            </div>
        `;

        galleryDiv.innerHTML += employeeHTML;
    })
}

getEmployees(url)
    .then(data => displayEmployees(data))
    .catch( e => {
        galleryDiv.innerHTML = "<h3>Somthing went wrong!</h3>";
        console.error(e);
    });

