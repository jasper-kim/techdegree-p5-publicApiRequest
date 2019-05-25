// Constant variables
const url = "https://randomuser.me/api/?results=12&nat=us";
const galleryDiv = document.getElementById('gallery');
const employees = [];

// Generates async funtion to make fetch requests
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

// Makes markup for each employee
function displayEmployees(data) {
    data.map(employee => {
        const employeeHTML = `
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
            </div>
        `;

        galleryDiv.innerHTML += employeeHTML;
        employees.push(employee);
    })
}

// Makes markup for employee
function displayModal(data) {
    data.map(item => {
        item.addEventListener('click', (e) => {
            const employeeName = item.querySelector('#name').textContent;
            const employee = employees.filter(employee => {
                return employee.name.first === employeeName.toLocaleLowerCase();
            });
            
            const modalHTML = `
                <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${employee[0].picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${employee[0].name.first}</h3>
                            <p class="modal-text">${employee[0].email}</p>
                            <p class="modal-text cap">${employee[0].location.city}, ${employee[0].location.state}</p>
                            <hr>
                            <p class="modal-text">${employee[0].phone}</p>
                            <p class="modal-text">${employee[0].location.street}, ${employee[0].location.city}, ${employee[0].location.state}, ${employee[0].location.postcode}</p>
                            <p class="modal-text">${formatBday(employee[0].dob.date)}</p>
                        </div>
                    </div>

                    // IMPORTANT: Below is only for exceeds tasks 
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
            `;
            
            galleryDiv.innerHTML += modalHTML;

            closeModal();
        });
    });
}

//Reformats bitrh day
function formatBday(text) {
    const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
    return text.replace(regex, '$2/$3/$1');
}

//Closes modal window
function closeModal() {
    const closeBtn = document.getElementById('modal-close-btn');
    const cardDivs = document.querySelectorAll('.card');
    const cardArray = [...cardDivs];

    closeBtn.addEventListener('click', (e) => {
        const modalDiv = document.querySelector('.modal-container');
        modalDiv.remove();
    });

    displayModal(cardArray);
}

getEmployees(url)
    .then(data => displayEmployees(data))
    .catch( e => {
        galleryDiv.innerHTML = "<h3>Somthing went wrong!</h3>";
        console.error(e);
    })
    .finally(() => {
        const cardDivs = document.querySelectorAll('.card');
        const cardArray = [...cardDivs];
        displayModal(cardArray);
    });