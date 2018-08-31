
//Ajax request, if theres is an error theres is no data appended to the page and error message,
//if the get request is succed the webpage functions normally

$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us,gb',
    dataType: 'json',
    error: function () {
        $('.page').html("<h1>There is an error, please contact customer service or try again later</h1>")
    },
    success: function (data, textStatus, jqXHR) {
        //Render the directory elements according to the request json data
        let pageHtml =`<h1>AWESOME STARTUP EMPLOYEE DIRECTORY</h1>`
        pageHtml += `<input class="search" type="text" placeholder="Search Employee...">`
        $.each(data.results, function (index, person) {
            
            pageHtml += `<div class="employee">
                                <div class="employee-image">
                                    <img src="${person.picture.large}">
                                </div>
                                <div class="employee-data">
                                    <h2>${person.name.first.charAt(0).toUpperCase() + person.name.first.slice(1)} ${person.name.last.charAt(0).toUpperCase()+person.name.last.slice(1)}</h2>
                                    <p>${person.email}</p>
                                    <p>${person.location.city.charAt(0).toUpperCase()+person.location.city.slice(1)}</p>
                                </div>
                        </div>`
        })
        $('.page').html(pageHtml)

        //Search functionality, if the search input doesnt include the name of the employee the dom element of this employee is hide
        employees = document.querySelectorAll('.employee')
        search = document.querySelector('.search')
        search.oninput = function (e) {
            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].children[1].children[0].innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
                    employees[i].style.display="none"
                } else {
                    employees[i].style.display = ""
                }
            }   
        }

        //Render the modal content when a employee dom element is clicked
        modal = document.querySelector('.modal')
        for (let i = 0; i < employees.length; i++) {
            employees[i].onclick = function () {
                // console.log(data.results[i])
                modal.innerHTML = `<div class="modal-content">
                                        <span class="close" >&times;</span>
                                        <div class="modal-info">
                                            <img src="${data.results[i].picture.large}">
                                            <h2>${data.results[i].name.first.charAt(0).toUpperCase() + data.results[i].name.first.slice(1)} ${data.results[i].name.last.charAt(0).toUpperCase() + data.results[i].name.last.slice(1)}</h2>
                                            <p>${data.results[i].email}</p>
                                            <p>${data.results[i].location.city.charAt(0).toUpperCase() + data.results[i].location.city.slice(1)}</p>
                                        </div>
                                        <div class="modal-extra">
                                            <p>${data.results[i].cell}</p>
                                            <p>${data.results[i].location.street}, ${data.results[i].location.postcode}</p>
                                            <p>Bithday: ${data.results[i].dob.date.slice(5, 7)}/${data.results[i].dob.date.slice(8, 10)}/${data.results[i].dob.date.slice(0, 4 )}</p>
                                        </div>
                                    </div>  `
                modal.style.display = "block"
                // Close the modal content when the close button is clicked
                close = document.querySelector(".close")
                close.onclick = function () {
                    modal.style.display = "none"
                }
                //Close the modal content when the user click outside the modal content window
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                
            
            }
        }
        
        

    }
    
});




