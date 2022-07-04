let formValidation = (form) => {
    let errObj = {
        msg: [],
        cnt: 0
    }

    let taskFieldValue = form.task.value
    let dateFieldValue = form.date.value
    let timeFieldValue = form.time.value

    let taskFormDate = new Date(dateFieldValue + " " + timeFieldValue)
    let dateNow = new Date()
    dateNow.setSeconds(0)
    dateNow.setMilliseconds(0)

    let taskTime = taskFormDate.getTime()
    let currentTimePlus5mins = dateNow.getTime() + 300000

    if (taskFieldValue.length < 3 || taskFieldValue > 50) {
        errObj.msg.push("Task field value is either empty or out of range")
        errObj.cnt++
    }
    if (taskTime < currentTimePlus5mins) {
        errObj.msg.push("Task Time must be set atleast 5 minutes into the future")
        errObj.cnt++
    }
    return errObj
}