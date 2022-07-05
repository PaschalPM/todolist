let Card = (txt) => {
    let div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = txt
    return div
}

let Modal = (txt) => {
    let
}

let MonthParser = (date) => {
    let monthIdx = new Date(date).getMonth()
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    return months[monthIdx]
}
let DateParser = (date) => {

    let day = new Date(date).getDate().toString()
    console.log(date);
    let mainDay = day + "th"
    if (day.endsWith("1") && day !== "11") {
        mainDay = day + "st"
    } else if (day.endsWith("2") && day !== "12") {
        mainDay = day + "nd"
    } else if (day.endsWith("3") && day !== "13") {
        mainDay = day + "rd"
    }
    console.log(mainDay);
    return mainDay
}
let YearParser = (date)=>{
    let year = new Date(date).getFullYear()
    return year
}