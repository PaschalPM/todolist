const todoForm = document.forms[0]
const TaskFormAndButtonToggleLogic = () => {
    let toggleBtn = document.querySelector(".header__toggleBtn")
    let toggleBtnStatus = !!toggleBtn.dataset.status
    let formDiv = document.querySelector(".main__form_div")
    let switchBtnState = () => {
        if (toggleBtnStatus) {
            toggleBtn.classList.add("close")
        } else {
            toggleBtn.classList.remove("close")
        }
    }
    let toggleForm = () => {
        if (toggleBtnStatus) {
            formDiv.style.paddingBottom = "1.5em"
            formDiv.style.maxHeight = "250vh"
        } else {
            formDiv.style.paddingBottom = "0em"
            formDiv.style.maxHeight = "0vh"
        }
    }
    toggleBtn.onclick = function () {
        toggleBtnStatus = !(toggleBtnStatus)
        switchBtnState()
        toggleForm()
    }
}
const SetDefaultsForTaskForm = () => {
    let dObj = new Date(),
        formDate = todoForm.date,
        formTime = todoForm.time

    let y = dObj.getFullYear().toString(),
        m = (dObj.getMonth() + 1).toString(),
        d = dObj.getDate().toString()
    m = m.length == 1 ? "0" + m : m
    d = d.length == 1 ? "0" + d : d

    let h = dObj.getHours().toString(),
        i = dObj.getMinutes().toString()
    h = h.length == 1 ? "0" + h : h
    i = i.length == 1 ? "0" + i : i


    formDate.value = `${y}-${m}-${d}`
    formTime.value = `${h}:${i}`
}
const PostTask = () => {
    todoForm.addEventListener("submit", function (e) {
        e.preventDefault()


        let errObj = formValidation(this)

        if (errObj.cnt > 0) {
            console.log(errObj.msg);
            return
        }
        let dataObj = {
            task: this.task.value,
            date: this.date.value,
            time: this.time.value,
            reminder: this.reminder.checked
        }


        // Creates a custom post event handler if form validity is true
        // postdata event is used in the app.js file
        const postEvent = new CustomEvent("postdata", {
            detail: dataObj
        })
        todoForm.dispatchEvent(postEvent)

    })
}
const UpdateTasksFromDBToUI = () => {

    let mainDisplay = document.querySelector(".main__display")
    mainDisplay.innerHTML = ""
    getAllData((res) => {
        if (res.length > 0) {
            mainDisplay.innerHTML = `<button id="clear">clear all</button>`
            res.forEach(({
                task, date, time, reminder
            }) => {
                mainDisplay.append(Card(`
                    <h1>${task}</h1>
                    <pre>${date}</pre>
                `))
            })
            
        } else {
            console.log("ok");
            mainDisplay.innerHTML = `<i> No task available... </i>`
        }

    })
}


window.onload = function () {
    TaskFormAndButtonToggleLogic()
    SetDefaultsForTaskForm()
    PostTask()
    UpdateTasksFromDBToUI()
}