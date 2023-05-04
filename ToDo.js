var itemListToDo = document.getElementById('itemsToDo');
var itemListDone = document.getElementById('itemsDone');

function createItem(event)
{
    event.preventDefault();
    const name = event.target.name.value;
    const desc = event.target.desc.value;
    const isDone = false;

    const myObj = {
        name,
        desc,
        isDone
    }

    axios.post('https://crudcrud.com/api/dcd55c9eeea94c4fb3a86c27172b29d6/ToDo', myObj)
    .then((response) => {
        showItemOnScreen(response.data)
        showItemsDoneOnScreen(response.data);
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something is wrong</h4>"
        console.error(err);
    })   
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/dcd55c9eeea94c4fb3a86c27172b29d6/ToDo")
        .then((response) => {
            console.log(response)

            for(let i=0; i<response.data.length; i++) {
                showItemOnScreen(response.data[i]);
                showItemsDoneOnScreen(response.data[i]);
            }
        })
        .catch(error => console.error(error))
})

function showItemOnScreen(myObj)
{
    if (!myObj.isDone) {
        const parentElem = document.getElementById('itemsToDo');
        const childElem = document.createElement('li');
        childElem.class = ". list-group" ;
        childElem.textContent = myObj.name + "-" + myObj.desc;

        //adding delete button
        const deleteBtn = document.createElement('input');
        deleteBtn.type="button";
        deleteBtn.value = "X"
    
        deleteBtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/dcd55c9eeea94c4fb3a86c27172b29d6/ToDo/${myObj._id}`)
            .then((response) => {
                parentElem.removeChild(childElem);
            })
            .catch(error => console.error(error))
        }

        //Edit button
        const doneBtn = document.createElement('input');
        doneBtn.type="button";
        doneBtn.value= "\u2713" ;
        doneBtn.onclick = () => {
            axios.put(`https://crudcrud.com/api/dcd55c9eeea94c4fb3a86c27172b29d6/ToDo/${myObj._id}`,{
                name: myObj.name,
                desc: myObj.desc,
                isDone: true
            })
                .then((response) => {
                    parentElem.removeChild(childElem);
                    const parentElemItemsDone = document.getElementById('itemsDone');
                    const childElemItemDone = document.createElement('li');
                    childElemItemDone.textContent = myObj.name + "-" + myObj.desc;
                    parentElemItemsDone.appendChild(childElemItemDone);
                })
                .catch(error => console.error(error))
        }
        childElem.appendChild(doneBtn);
        childElem.appendChild(deleteBtn);
        parentElem.appendChild(childElem);
    }
    
}

function showItemsDoneOnScreen(myObj) {
    if (myObj.isDone) {
        const parentElemItemsDone = document.getElementById('itemsDone');
        const childElemItemDone = document.createElement('li');
        childElemItemDone.textContent = myObj.name + "-" + myObj.desc;
        parentElemItemsDone.appendChild(childElemItemDone);
    }
}