let Card = (txt, reminder) => {
    let div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = txt
    div.style.borderLeft = ".25em solid transparent"
    if (reminder) {
        div.style.borderColor = "green"
    }
    return div
}

let Modal = (txt, cb) => {

    let modalBox = document.createElement("div")
    let modalDialog = document.createElement("div")

    modalDialog.classList.add("modal__dialog")
    modalDialog.innerHTML = `
        <div class="modal_inner">
            <div class="modal__text">
                ${txt}
            </div>
            <div class="modal__action">
                <button class="modal__action btn ok">
                    yes
                </button>
                <button class="modal__action btn cancel">
                    no
                </button>
            </div>
        </div>
    `
    modalBox.append(modalDialog)
    modalBox.classList.add("modal")


    let open = () => {
        document.body.append(modalBox)
    }
    let close = () => {
        if (document.getElementsByClassName("modal")[0])
            document.getElementsByClassName("modal")[0].remove()
    }
    window.addEventListener("click", (evt) => {
        if (evt.target.matches(".modal__action.btn.cancel")) {
            close()
        }
        if (evt.target.matches(".modal__action.btn.ok")) {
            if (cb) {
                cb()
            }
            setTimeout(close, 100)
        }
    })

    return {
        open,
        close
    }
}


let StatusBar = (text, state = "success") => {
    let div = document.querySelector(".status_bar")
    div.classList.add(state)
    div.innerText = text
    if (text !== "") {
        div.style.height = "2.5em"
    }
    setTimeout(() => {
        div.style.height = "0em"
    }, 3800)
    setTimeout(() => {
        div.innerText = ""
        div.classList.remove(state)
    }, 4000)
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

let YearParser = (date) => {
    let year = new Date(date).getFullYear()
    return year
}

let TimeParser = (time) => {
    let hour = time.toString().split(":")[0]
    let minute = time.toString().split(":")[1]
    let mainHour = (hour) => {
        return {
            "00": "12",
            "01": "1",
            "02": "2",
            "03": "3",
            "04": "4",
            "05": "5",
            "06": "6",
            "07": "7",
            "08": "8",
            "09": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "1",
            "14": "2",
            "15": "3",
            "16": "4",
            "17": "5",
            "18": "6",
            "19": "7",
            "20": "8",
            "21": "9",
            "22": "10",
            "23": "11",
        } [hour]
    }
    let suffix = "am"
    if (hour === "12" && minute === "00") {
        suffix = "noon"
    } else if (hour >= "12") {
        suffix = "pm"
    } else if (hour < "12") {
        suffix = "am"
    }
    console.log(mainHour(hour) + ":" + minute + suffix);

    return mainHour(hour) + ":" + minute + suffix
}