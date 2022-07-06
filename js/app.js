// Post Data to indexedDB
todoForm.addEventListener("postdata",function({detail}){
    putData(detail,()=>{
        console.log("task added");
        UpdateTasksFromDBToUI()
        StatusBar("Added new task","success")
    })
})

window.addEventListener("click",({target})=>{
    if(target.matches("#clear"))
    {
        clearData(()=>{
            UpdateTasksFromDBToUI()
            StatusBar("Cleared all tasks","success")
        })
    }
})