
const employeesUrl = 'http://localhost:3000/employees'
const rolesUrl = 'http://localhost:3000/roles'
const tbody = document.querySelector('tbody')
const rolesFilter = document.querySelector('.roles-filter')
const select = document.querySelector('select')
const orderOptions = [
    {value:'name-asc', text:'Name ascendent'},
    {value:'name-desc', text:'Name descendent'},
    {value:'salary-asc', text:'Salary ascendent'},
    {value:'salary-desc', text:'Salary descendent'}
]


let employees, roles
let selectedFilter = new Set


function fetchJson(url){
     return fetch(url).then(r => r.json())
}

async function fetchData(){
    [employees,roles] = await Promise.all([fetchJson(employeesUrl), fetchJson(rolesUrl)])
    renderTable(employees)
    renderSortBy(employees)
    renderFilter(roles)
    
    
}

fetchData()

                      






function renderTable(data){
    if (tbody.hasChildNodes){
        while(tbody.firstChild){
            tbody.removeChild(tbody.lastChild)
        }
    }

    const optionValue = select.value

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

function renderSortBy(employees){
    let sortedEmployees
    
    orderOptions.forEach((obj) => {
        const option = document.createElement('option')
        option.value = obj.value
        option.textContent = obj.text
        select.appendChild(option)
        select.addEventListener('change', e => sort(e, employees))
    })







function sort (e, employees) {
    const option = e.target.value
    
    if (option === 'name-asc'){
        sortedEmployees = employees.sort((a, b) => a.name < b.name ? 1 : -1)
    } else if (option === 'name-desc'){
        sortedEmployees = employees.sort((a, b) => a.name > b.name ? 1 : -1)
    } else   if (option === 'salary-asc'){
        sortedEmployees = employees.sort((a, b) => a.salary < b.salary ? 1 : -1)
    } else if (option === 'salary-desc'){
        sortedEmployees = employees.sort((a, b) => a.salary > b.salary ? 1 : -1)
    } else {
        sortedEmployees = employees
    }
    renderTable(sortedEmployees)
}


return sortedEmployees


}

