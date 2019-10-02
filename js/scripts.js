/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
******************************************/

//** Global variables **//
const url = "https://randomuser.me/api/?results=12&nat=us";
const galleryDiv = document.getElementById('gallery');
const modals = [];


//** Async funtions **/
/**
 * Request a JSON object from Random User Generator API
 * @param {string} url - Public API URL
 */
async function getJSON(url) {
    try{
        const response = await fetch(url);
        return await response.json();
    } catch(error) {
        throw error;
    }
}

/**
 * Return employee Data from JSON object
 * @param {string} url - Public API URL
 */
async function getEmployees(url) {
    const employeesJSON = await getJSON(url);
    return employeesJSON.results;     
}


/** Search **/
/**
 * Change display property of employee element
 * @param {array} list - arry of html div elements 
 * @param {object} input - object of html input element
 */
function searchEmployee(list, input) {
    const text = input.value;
    
    //Loop through employee element
    list.map(item => {
        //Check if the element has the input value in its name.
        if(item.querySelector('#name').textContent.includes(text)) {
            item.style.display = "";
        }else {
            item.style.display = "none";
        }
    });
}

/**
 * Add search markup and its function
 */
function generateSearch() {
    //Display search elements 
    const searchContainerDiv = document.querySelector('.search-container');
    const searchDiv = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form>
    `;

    searchContainerDiv.innerHTML = searchDiv;
 
    const searchInput = document.getElementById('search-input');
    const searchForm = document.querySelector('form');
    const cardDivs = document.querySelectorAll('.card');
    const cardArray = [...cardDivs];

    //When the user clicks search form
    searchForm.addEventListener('click', () => {
        //Find mactched employee
        searchEmployee(cardArray, searchInput);
    });

    //When the user types in search form
    searchForm.addEventListener('input', () => {
        //Find mactched employee
        searchEmployee(cardArray, searchInput);
    })
}

/** Employee **/
/**
 * Display 12 Employee's card and modal window
 * @param {array} data - array of employee data
 */
function displayEmployees(data) {
    data.forEach((employee, index) => {
        //Display employees
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
        
        //Create modal window objects of employee
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
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatBday(employee.dob.date)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        `;

        modalDiv.innerHTML = modalHTML;

        //Store modal window objects in array
        modals.push(modalDiv);

        //When the user clicks a employee
        cardDiv.addEventListener('click', () => {
            //Show modal window
            galleryDiv.appendChild(modals[index]);
            //Activate bottuns in the modal window
            controlModal(index);
        });
    });    

    //Activate search 
    generateSearch();
}

/**
 * Reformat employee's bitrh day
 * @param {string} text - value from employee data
 */
function formatBday(text) {
    const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
    return text.replace(regex, '$2/$3/$1');
}

/**
 * Make buttons to close and toggle modal window
 * @param {number} index - index of array of employee data
 */
function controlModal(index) {
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const modalDiv = document.querySelector('.modal-container');

    //Remove modal window when clicking close button
    closeBtn.addEventListener('click', () => {
       modalDiv.remove();
    });

    //When the user click the prev button
    prevBtn.addEventListener('click', () => {
        //Close current modal window
        modalDiv.remove();
        //Display previous modal window
        if(index > 0) {
            galleryDiv.appendChild(modals[index-1]);
            controlModal(index-1);
        }
    });

    //When the user click the next button
    nextBtn.addEventListener('click', () => {
        //Close current modal window
        modalDiv.remove();
        //Display next modal window
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