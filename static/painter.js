console.log(document.getElementById("movebox").clientWidth)


for (var i = 0; i < document.getElementsByClassName("draggable").length; i++) {
    dragElement(document.getElementsByClassName("draggable")[i])
}

function dragElement(elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  elmnt.onmousedown = dragMouseDown

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
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
    // console.log(elmnt.style.top, elmnt.style.left)
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }

}