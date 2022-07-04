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
            formDiv.style.maxHeight = "100vh"
        } else{
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
const SetDefaultsForTaskForm = ()=>{
    let dObj = new Date(),
        formDate = todoForm.date,
        formTime = todoForm.time

    let y = dObj.getFullYear().toString(),
        m = (dObj.getMonth() + 1).toString(),
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
const PostTask = ()=>{
    todoForm.addEventListener("submit",function(e){
        e.preventDefault()
        let taskData = {}
        let errObj = {
            msg:[],
            cnt:0
        }
        let taskFieldValue = this.task.value
        let dateFieldValue = this.date.value
        let timeFieldValue = this.time.value

        let taskFormDate = new Date(dateFieldValue+" "+timeFieldValue)
        let dateNow = new Date()
        dateNow.setSeconds(0)
        dateNow.setMilliseconds(0)

        let taskTime = taskFormDate.getTime()
        let currentTimePlus5mins = dateNow.getTime() + 300000

        console.log(taskTime);
        console.log(currentTimePlus5mins);
        if(taskFieldValue.length < 3 || taskFieldValue > 50){
            errObj.msg.push("Task field value is either empty or out of range")
            errObj.cnt++
        }
        if(taskTime < currentTimePlus5mins){
            errObj.msg.push("Task Time must be set atleast 5 minutes ahead")
            errObj.cnt++
        }
        // console.log(errObj);
    })
}

TaskFormAndButtonToggleLogic()
SetDefaultsForTaskForm()
PostTask()
