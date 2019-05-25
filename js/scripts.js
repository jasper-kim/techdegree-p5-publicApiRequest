// Constant variables
const url = "https://randomuser.me/api/?results=12&nat=us";
const galleryDiv = document.getElementById('gallery');
const searchContainerDiv = document.querySelector('.search-container');
const modals = [];

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

//Makes markup for search
function searchEmployee(list, input) {
    const text = input.value;

    list.map(item => {
        if(item.querySelector('#name').textContent.includes(text)) {
            item.style.display = "";
        }else {
            item.style.display = "none";
        }
    });
}

function generateSearch() {
    const searDiv = `
        <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form>
        `;

    searchContainerDiv.innerHTML = searDiv;

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('serach-submit');
    const cardDivs = document.querySelectorAll('.card');
    const cardArray = [...cardDivs];

    searchBtn.addEventListener('click', () => {
        searchEmployee(cardArray, searchInput);
    });

    searchInput.addEventListener('input', () => {
        searchEmployee(cardArray, searchInput);
    })
}

// Makes markup for each employee
function displayEmployees(data) {
    data.forEach((employee, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const employeeHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;

        cardDiv.innerHTML = employeeHTML;
        galleryDiv.appendChild(cardDiv);

        //------------------------------------------------
        //Modal generate

        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal-container';

        const modalHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                    <hr>
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatBday(employee.dob.date)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        `;

        modalDiv.innerHTML = modalHTML;
        modals.push(modalDiv);

        cardDiv.addEventListener('click', () => {
            galleryDiv.appendChild(modals[index]);
            controlModal(index);
        });
    });    

    generateSearch();
}

//Reformats bitrh day
function formatBday(text) {
    const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
    return text.replace(regex, '$2/$3/$1');
}

//Closes modal window
function controlModal(index) {
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const modalDiv = document.querySelector('.modal-container');

    closeBtn.addEventListener('click', () => {
       modalDiv.remove();
    });

    prevBtn.addEventListener('click', () => {
        modalDiv.remove();
        if(index > 0) {
            galleryDiv.appendChild(modals[index-1]);
            controlModal(index-1);
        }
    });

    nextBtn.addEventListener('click', () => {
        modalDiv.remove();
        if(index < 11) {
            galleryDiv.appendChild(modals[index+1]);
            controlModal(index+1);
        }
    });
}

getEmployees(url)
    .then(data => displayEmployees(data))
    .catch( e => {
        galleryDiv.innerHTML = "<h3>Somthing went wrong!</h3>";
        console.error(e);
    });