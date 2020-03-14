const lib = {
  "a": "do",
  "b": "ri",
  "c": "me",
  "d": "in",
  "e": "te",
  "f": "ri",
  "g": "mo",
  "h": "ada",
  "i": "pa",
  "j": "re",
  "k": "la",
  "l": "ti",
  "m": "re",
  "n": "la",
  "o": "ti",
  "p": "re",
  "q": "mo",
  "r": "do",
  "s": "ri",
  "t": "me",
  "u": "a",
  "v": "me",
  "w": "no",
  "x": "o",
  "y": "me",
  "z": "nare",
}

const nameDorime = (name) => {
  name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  name = name.toLowerCase()
  
  libKeys = Object.keys(lib)
  libValues = Object.values(lib)

  var newName = ""

  for (let i = 0; i < name.length; i++) {
    for(let x = 0; x < libKeys.length; x++) {
      if(name[i] == libKeys[x]) {
        name[i] = libValues[x]
        newName += libValues[x]
      }
    }
  }

  newName = newName.charAt(0).toUpperCase() + newName.slice(1)

  return newName
}

const dataUriBlob = (dataUrl, mime) => {
  const byteString = window.atob(dataUrl)
  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  const blob = new Blob([ia], {type: mime})

  const blobUrl = URL.createObjectURL(blob)

  return blobUrl
}

const createBlobUrl =(dataUrl) => {
  const imgData = dataUrl.match(/data:(image\/.+);base64,(.+)/);
  const blob = dataUriBlob(imgData[2], imgData[1])
  return blob
}

//window.open('http://www.facebook.com/sharer.php?u='+url+'&t='+textUri,'sharer','toolbar=0,status=0,width=640,height=430');
//window.open('https://twitter.com/intent/tweet?url=https://bit.ly/39REUMS&text='+textUri,'sharer','toolbar=0,status=0,width=640,height=430');

const createImage = (name) => {
  const canvas = document.getElementById("canvasDorime")
  const ctx = canvas.getContext("2d")
  const image = document.getElementById("templateImage")

  ctx.drawImage(image, 0, 0)
  ctx.font= "25px Arial"
  ctx.fillStyle= "white"
  ctx.textAlign= "center"
  ctx.fillText(name, 300, 230, 260)

  let dataUrl = canvas.toDataURL("image/jpeg")
  //let textUri = encodeURIComponent("Meu nome em Dorime fica assim, como fica o seu?") texto para compartilhar em rede social
  let downloadUrl = dataUrl.replace("image/jpeg", "image/octet-stream")

  const btn = document.getElementById("btnDownload")
  btn.style.display = "block"
  btn.setAttribute('download', 'meunomeemdorime.jpeg')
  btn.setAttribute('href', downloadUrl)
}

const nameSubmit = (e, form) => {
  const name = form.children[0].value

  e.preventDefault()

  form.children[0].value = ""

  let newName = nameDorime(name)

  createImage(newName)
}