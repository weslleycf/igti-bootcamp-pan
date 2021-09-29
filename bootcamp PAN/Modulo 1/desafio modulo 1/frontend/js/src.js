
const employeesUrl = 'http://localhost:3000/employees'
const rolesUrl = 'http://localhost:3000/roles'
const tbody = document.querySelector('tbody')
const rolesFilter = document.querySelector('.roles-filter')
const select = document.querySelector('select')


let employees, roles
let selectedFilter = new Set


function fetchJson(url){
     return fetch(url).then(r => r.json())
}

async function fetchData(){
    [employees,roles] = await Promise.all([fetchJson(employeesUrl), fetchJson(rolesUrl)])
    renderTable(employees)
    renderFilter(roles)
}

fetchData()
                      


function renderTable(data){
    if (tbody.hasChildNodes){
        while(tbody.firstChild){
            tbody.removeChild(tbody.lastChild)
        }
    }
    if (selectedFilter.size === 0){
        data.forEach(element => {
            tbody.insertAdjacentHTML('afterbegin',`<tr data-role["${element.role_id}"]>
                <td>${element.id}</td>
                <td class="emp-name">${element.name}</td>
                <td>${element.role_id}</td>
                <td>${element.salary}</td>
                </tr>`)
                
        })
    } else {
            
        data.forEach(element => {
            if (selectedFilter.has(element.role_id)){
            tbody.insertAdjacentHTML('afterbegin',`<tr data-role["${element.role_id}"]>
                <td>${element.id}</td>
                <td class="emp-name">${element.name}</td>
                <td>${element.role_id}</td>
                <td>${element.salary}</td>
                </tr>`)
            }
        })
    
    }
}

function renderFilter(data){
 
    data.forEach(element => {
        const div = document.createElement('div')
        const inputCheckbox = document.createElement('input')
        const label = document.createElement('label')
        inputCheckbox.type = 'checkbox'
        inputCheckbox.id = element.id
        label.setAttribute('for', element.id)
        label.textContent = element.name
        div.appendChild(inputCheckbox)
        div.appendChild(label)
        inputCheckbox.addEventListener('change', (e) => {
            if (e.target.checked === true){
                selectedFilter.add(element.id)
            } else {
                selectedFilter.delete(element.id)
            }
            renderTable(employees)
        })
        rolesFilter.appendChild(div)
    });
}


//select.addEventListener('onchage', sortBy(select.value, employees))

function sortBy(sort, data){
   let sortedData;
    if (sort === 'name-asc'){
        sortedData = data.sort((a, b) => a.name > b.name ? 1 : -1)
        console.log(sortedData)
    } else if (sort === 'name-desc'){
        sortedData = data.sort((a, b) => a.name < b.name ? 1 : -1)
        console.log(sortedData)
    } else   if (sort === 'salary-asc'){
        sortedData = data.sort((a, b) => a.salary > b.salary ? 1 : -1)
        console.log(sortedData)
    } else {
        sortedData = data.sort((a, b) => a.salary < b.salary ? 1 : -1)
        console.log(sortedData)
    }

}