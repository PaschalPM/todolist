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
            StatusBar(errObj.msg,"error")
            return
        }
        let createdAt = new Date().getTime()
        let dataObj = {
            task: this.task.value,
            date: this.date.value,
            time: this.time.value,
            reminder: this.reminder.checked,
            createdAt
        }


        // Creates a custom post event handler if form validity is true
        // postdata event is used in the app.js file
        const postEvent = new CustomEvent("postdata", {
            detail: dataObj
        })
        todoForm.dispatchEvent(postEvent)

        todoForm.onreset =function(e){
            e.preventDefault()
            this.task.value = ""
            SetDefaultsForTaskForm()
        }
    })
}
const UpdateTasksFromDBToUI = () => {

    let mainDisplay = document.querySelector(".main__display")
    mainDisplay.innerHTML = ""
    getAllData((res) => {
        res.sort((a,b)=>b.createdAt - a.createdAt)
        if (res.length > 0) {
            mainDisplay.innerHTML = `<div class="main__trashBtn_holder">
                                        <button class="main__trashBtn" id="clear">T icon</button>
                                    </div>`
            res.forEach(({
                task, date, time, reminder, createdAt
            }) => {
                // DateTimeParser(date, time)
                mainDisplay.append(Card(`
                    <span class="card__btn_holder"> 
                        <button class="card__btn delete" id='${createdAt}'>x</button> 
                    </span>
                   
                    <div style="overflow:auto">
                        <h1 class="card__header">${task}</h1>
                        <small>
                            ${DateParser(date)} 
                            ${MonthParser(date)}, 
                            ${YearParser(date)} at 
                            ${TimeParser(time)}
                        </small>
                    </div>
                `,reminder))
            })
            
        } else {
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