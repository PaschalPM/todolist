const form = document.forms[0]
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
            formDiv.style.paddingBlockEnd = "1.5em"
            formDiv.style.maxHeight = "100vh"
        } else{
            formDiv.style.paddingBlockEnd = "0em"
            formDiv.style.maxHeight = "0vh"
        }
    }
    toggleBtn.onclick = function () {
        toggleBtnStatus = !(toggleBtnStatus)
        switchBtnState()
        toggleForm()
    }
}
const SetDefaultsForTaskForm = ()=>{
    let dObj = new Date(),
        formDate = form.date,
        formTime = form.time

    let y = dObj.getFullYear().toString(),
        m = dObj.getMonth().toString(),
        d = dObj.getDate().toString()
    m = m.length == 1? "0"+m: m
    d = d.length == 1? "0"+d: d
   
    let h = dObj.getHours().toString(),
        i = dObj.getMinutes().toString()
    h = h.length == 1? "0"+h: h
    i = i.length == 1? "0"+i: i
    
    formDate.value = `${y}-${m}-${d}`
    formTime.value = `${h}:${i}`
        
}
const AddTaskLogic =()=>{
    form.onsubmit =(e)=>{
        e.preventDefault()
    }
}

TaskFormAndButtonToggleLogic()
SetDefaultsForTaskForm()
AddTaskLogic()