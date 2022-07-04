let Card = (txt)=>{
    let div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = txt
    return div
}