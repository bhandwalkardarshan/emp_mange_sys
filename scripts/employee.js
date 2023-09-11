const baseUrl = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`

const cardContainer = document.getElementById("card-container")
const sortSelect = document.getElementById("sort-select")
const departmentSelect = document.getElementById("department-select")
const genderSelect = document.getElementById("gender-select")
const prevPageBtn = document.getElementById("prev-page")
const nextPageBtn = document.getElementById("next-page")

let currPage = 1
let items = 6

fetchData(`page=${currPage}`)

prevPageBtn.addEventListener("click",() => {
    if(currPage>1){
        currPage-=1
        fetchData(`page=${currPage}`)
    }
})

nextPageBtn.addEventListener("click",() => {
    currPage+=1
    fetchData(`page=${currPage}`)
})

sortSelect.addEventListener("change",()=>{
    // sort=salary&order=desc
    let val = sortSelect.value
    fetchData(`sort=salary&order=${val}`) 
})

departmentSelect.addEventListener("change",()=>{
    // if filterBy value is gender | filterValue can be male,female,others
    let val = departmentSelect.value
    fetchData(`filterBy=department&filterValue=${val}`) 
})

genderSelect.addEventListener("change",()=>{
    // if filterBy value is gender | filterValue can be male,female,others
    let val = genderSelect.value
    fetchData(`filterBy=gender&filterValue=${val}`) 
})

function fetchData(query){
    fetch(`${baseUrl}?${query?query:""}&limit=${items}`)
    .then((response)=>response.json())
    .then ((data)=>{
        // console.log(data.data)
        createAndRenderCards(data.data)
    })
}

function createAndRenderCards(employees){
    cardContainer.innerHTML = '';

    employees.forEach((employee) => {
        const card = createEmployeeCard(employee);
        cardContainer.innerHTML += card;
    });
}

function createEmployeeCard(emp){
    return `
        <div class="employee-card">
        <img src="${emp.image}" alt="" />
        <h3>${emp.name}</h3>
        <p>Department :${emp.department}</p>
        <p>Gender :${emp.gender}</p>
        <p>Salary :${emp.salary}</p>
        </div>
    `
}