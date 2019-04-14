var socket = new WebSocket('ws://localhost:8081/')

// When a connection is made
socket.onopen = function() {
  socket.send("client_handshake")
  // console.log('Sent client handshake.')
}

getStaticFilesUpdate()

async function getStaticFilesUpdate() {
  try {
    const response = await axios.get(`${location.href}/canvas.html`)
    document.body.innerHTML = response.data
    loadScript(`${location.href}/painter.js`, function() {
       // console.log("reloaded painter.js")
    })
    loadScript(`${location.href}/logic.js`, function() {
       // console.log("reloaded painter.js")
    })

  } catch (error) {
    console.error(error)
  }
}

// When data is received
socket.onmessage = function(event) {
  switch(event.data) {
    case "static_files_changed":
      getStaticFilesUpdate()
      break

    case "server_handshake":
      getStaticFilesUpdate() // Will only get executed once on first load.
      // console.log("Received handshake from server.")
      break
  }
}

// A connection could not be made
socket.onerror = function(event) {
  // console.log(event)
}

// A connection was closed
socket.onclose = function(code, reason) {
  // console.log(code, reason)
}

// Close the connection when the window is closed
window.addEventListener('beforeunload', function() {
  socket.close()
})

function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript"
  if(script.readyState) {  // only required for IE <9
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {  //Others
    script.onload = function() {
      callback()
    }
  }

  script.src = url
  document.getElementsByTagName( "head" )[0].appendChild( script )
}