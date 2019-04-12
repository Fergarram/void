console.log(document.getElementById("movebox").clientWidth)


for (var i = 0; i < document.getElementsByClassName("draggable").length; i++) {
    dragElement(document.getElementsByClassName("draggable")[i])
}

function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    elmnt.onmousedown = dragMouseDown
    elmnt.onmouseover = () => {
        console.log("over")
    }
    elmnt.onmouseout = () => {
        console.log("out")
    }

    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
        console.log("press");
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
        console.log("drag");
    }

    function closeDragElement() {
        console.log("release");
        document.onmouseup = null
        document.onmousemove = null
    }

}