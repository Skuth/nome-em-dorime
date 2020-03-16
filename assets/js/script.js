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

window.fbAsyncInit = function() {
  FB.init({
    appId            : '604873003427211',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v6.0'
  });
};

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

const shareFacebook = (image) => {
  FB.ui({
    method: "share",
    href: image,
    quote: "Meu nome em Dorime fica assim, como fica o seu? \nCrie o seu em meunomedorime.site"
  })
}

// const shareTwitter = (image) => {
//   let text = "Meu nome em Dorime fica assim, como fica o seu?"
//   window.open('http://twitter.com/share?url='+encodeURIComponent(image)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
// }

const imgurUpload = (dataUrl, name) => {
  const box = document.getElementById("btnContainer")
  const btn = document.getElementById("btnDownload")
  const token = "39a1713e39fdfe0"

  let downloadUrl = dataUrl.replace("image/png", "image/octet-stream")
  let imageUrl = dataUrl.replace("data:image/png;base64,", "")

  $.ajax({
    type: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${token}`
    },
    data: {
      image: imageUrl,
      type: "Base64",
      title: `Meu nome em Dorime fica ${name}`
    },
    dataType: "json",
    success: (res) => {
      btn.style.display = "inline-block"
      btn.setAttribute('download', 'meunomeemdorime.png')
      btn.setAttribute('href', downloadUrl)
      box.innerHTML += `<a onclick="shareFacebook('${res.data.link}')"><i class="fab fa-facebook"></i> Facebook</a>`
      //box.innerHTML += `<a onclick="shareTwitter('${res.data.link}')">Twitter</a>`
    }
  })
}

const createImage = (name) => {
  const canvas = document.getElementById("canvasDorime")
  const ctx = canvas.getContext("2d")
  const image = document.getElementById("templateImage")

  ctx.drawImage(image, 0, 0)
  ctx.font= "25px Arial"
  ctx.fillStyle= "white"
  ctx.textAlign= "center"
  ctx.fillText(name, 300, 230, 260)

  let dataUrl = canvas.toDataURL("image/png")
  
  imgurUpload(dataUrl, name)
}

const nameSubmit = (e, form) => {
  const name = form.children[0].value

  e.preventDefault()

  form.children[0].value = ""

  let newName = nameDorime(name)

  createImage(newName)
}