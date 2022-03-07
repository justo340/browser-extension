let myLeads = []
const inputEl = document.getElementById('input-el')
const saveInput = document.getElementById("input-btn")
const saveTab = document.getElementById("tab-btn")
const deleteList = document.getElementById('delete-btn')
const leadsList = document.getElementById('list-el')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('my-Leads'))


saveTab.addEventListener('click', function() {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

        // add a tab to the array
        myLeads.push(tabs[0].url)

        //converting the array to a string. JSON.parse() would do the reverse
        localStorage.setItem("my-Leads", JSON.stringify(myLeads))

        renderLeads(myLeads)
    })

})

saveInput.addEventListener('click', function() {

    // add a lead to the array
    myLeads.push(inputEl.value)

    // erase input of user from input field
    inputEl.value = ''

    //converting the array to a string. JSON.parse() would do the reverse
    localStorage.setItem("my-Leads", JSON.stringify(myLeads))

    renderLeads(myLeads)

})


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}


deleteList.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = ""
    renderLeads(myLeads)

})

function renderLeads(userInput) {
    let listItems = '' // list of all inputs

    // show the list of inputs 
    for (i = 0; i < userInput.length; i++) {

        //using template strings/literals
        listItems +=
            `
            <li>
                <a target='_blank' href='${ userInput[i] }'>
                    ${ userInput[i] }
                </a>
            </li>
            `
    }
    // innerHTML is used to pass html tags in js code
    leadsList.innerHTML = listItems
}