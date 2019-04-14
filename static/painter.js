
var IS_DRAGGING = false
var IS_TYPING = false

var theCardsTextInput = document.getElementById("the-card-textinput")
var theCardsButton = document.getElementById("the-cards-button")
var theCard = document.getElementById("the-card")

theCardsTextInput.addEventListener('focus', (e) => {
    IS_TYPING = true
    let _draggables = document.getElementsByClassName("draggable")
    clearDraggableElementsEvents(_draggables)
    e.currentTarget.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 
                                       0 10px 10px rgba(0,0,0,0.22)`;
})

theCardsTextInput.addEventListener('blur', (e) => {
    dragAllElements()
    IS_TYPING = false
    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                                       0 1px 2px rgba(0,0,0,0.24)`;
})

theCardsTextInput.addEventListener('keydown', (e) => {
    // console.log(e.which)
    if (e.which === 27) {
        e.currentTarget.blur();
    }
})

theCardsTextInput.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 
                                       0 10px 10px rgba(0,0,0,0.22)`;
})

theCardsTextInput.addEventListener('mouseleave', (e) => {
    if (!IS_TYPING) {
        e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                                           0 1px 2px rgba(0,0,0,0.24)`;
   }
})

theCardsButton.addEventListener('onmousemove', (e) => {
    let _draggables = document.getElementsByClassName("draggable")
    clearDraggableElementsEvents(_draggables)
})

theCardsButton.addEventListener('onmouseup', (e) => {
    setTimeout(dragAllElements(),500)
})

theCardsButton.addEventListener('focus', (e) => {
    e.currentTarget.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 
                                       0 10px 10px rgba(0,0,0,0.22)`;
})

theCardsButton.addEventListener('blur', (e) => {
    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                                       0 1px 2px rgba(0,0,0,0.24)`;
})

theCardsButton.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 
                                       0 10px 10px rgba(0,0,0,0.22)`;
})

theCardsButton.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                                       0 1px 2px rgba(0,0,0,0.24)`;
})

theCard.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 
                                       0 10px 10px rgba(0,0,0,0.22)`;
})

theCard.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                                       0 1px 2px rgba(0,0,0,0.24)`;
})

//
// Draggables
//

function clearDraggableElementsEvents(draggables) {
    for (var i = 0; i <draggables.length ; i++) {
        let element = draggables[i]
        document.onmousedown = null
        document.onmouseup = null
        document.onmousemove = null
    }
}

function dragElement(element) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e = e || window.event
        pos3 = e.clientX
        pos4 = e.clientY

        document.onmousemove = (e) => {
            e = e || window.event

            let triggeredFromTagName = e.currentTarget.activeElement.localName
            if (triggeredFromTagName !== "input"
                && triggeredFromTagName !== "button") {
                pos1 = pos3 - e.clientX
                pos2 = pos4 - e.clientY
                pos3 = e.clientX
                pos4 = e.clientY
                element.style.top = (element.offsetTop - pos2) + "px"
                element.style.left = (element.offsetLeft - pos1) + "px"
                IS_DRAGGING = true
                setPointerEventsFor(element, "none")
            }

        }

        document.onmouseup = (e) => {
            IS_DRAGGING = false
            setPointerEventsFor(element, "initial")
            document.onmousemove = null
            document.onmouseup = null
        }
    }

}

function dragAllElements() {
    var NofDraggables = document.getElementsByClassName("draggable").length
    for (var i = 0; i < NofDraggables; i++) {
        dragElement(document.getElementsByClassName("draggable")[i])
    }
}

function setPointerEventsFor(element, option) {
    element.style.pointerEvents = option
}


//
// Canvas
//

document.getElementById("bottom").onmousemove = (e) => {
    document.getElementById("bottom").style.userSelect = "none"
}
document.getElementById("bottom").onmousedown = (e) => {
    document.getElementById("bottom").style.userSelect = "none"
    document.getElementById("the-card-textinput")
        .style
            .boxShadow = `0 1px 3px rgba(0,0,0,0.12), 
                          0 1px 2px rgba(0,0,0,0.24)`;
}
document.getElementById("bottom").onmouseup = (e) => {
    document.getElementById("bottom").style.userSelect = "initial"
}


function appearInCenter(eid) {
    var element = document.getElementById(eid)
    element.style.opacity = 1
    element.style.left = `${(window.innerWidth/2) - (element.clientWidth/2)}px`
    element.style.top = `${(window.innerHeight/2) - (element.clientHeight/2)}px`
}


//
// Execution
//

setTimeout(() => {
    dragAllElements();
    appearInCenter("card-drag-handle")
}, 150)