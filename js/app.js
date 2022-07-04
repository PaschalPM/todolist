// Post Data to indexedDB
todoForm.addEventListener("postdata",function({detail}){
    putData(detail,()=>{
        console.log("task added");
        UpdateTasksFromDBToUI()
    })
})

window.addEventListener("click",({target})=>{
    if(target.matches("#clear"))
    {
        clearData(()=>{
            UpdateTasksFromDBToUI()
        })
    }
})