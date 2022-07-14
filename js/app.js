// Post Data to indexedDB
todoForm.addEventListener("postdata", function ({
    detail
}) {
    putData(detail, () => {
        console.log("task added");
        UpdateTasksFromDBToUI()
        StatusBar("Added new task", "success")
    })
})

window.addEventListener("click", ({
    target
}) => {
    if (target.matches("#clear")) {
        Modal("Are you sure you want to clear all tasks?", () => {
            clearData(() => {
                UpdateTasksFromDBToUI()
                StatusBar("Cleared all tasks", "success")
            })
        }).open()
    }

   
    if( target.matches(".card__btn.delete")){
        let taskIDtoDelete = parseInt(document.querySelector(".card__btn.delete").id)
        Modal("Are you sure you want to delete this task?", () => {
            deleteData(taskIDtoDelete,() => {
                UpdateTasksFromDBToUI()
                StatusBar("Task deleted", "success")
            })
        }).open()
    }
})