"use strict";

const keywords = {
  "help": {
    "a": function (keyword) {
      if (!keyword.length || keyword[0] == "help") {
        printLn(keywords["help"].b())
      } else if (keywords.hasOwnProperty(keyword[0])) {
        console.log("j")
        printLn(keywords[keyword[0]].b)
      } else {
        keywordMissing(keyword[0])
      }
      return;
    },
    "b": function () {
      let helpBody = ""
      let i = 1;
      for (let val in keywords) {
        if (val == "help") continue
        helpBody += `<span class='bracket'>[</span><span class='red'>${i++}</span><span class='bracket'>]</span> ${val} <span class='nabla'>&nabla;</span> ${keywords[val].b}<br>`
      }
      printLn(helpBody)
    }
  },
  "clear": {
    "a": function () {
      const allActiveBodyContainer = document.querySelectorAll("div")
      allActiveBodyContainer.forEach((elem) => {
        elem.remove()
      })
    },
    "b": "clears screen"
  },
  "history": {
    "a": function () {
      const historyCopy = history
      historyCopy.shift()
      printLn(historyCopy.join("<br>"))
    },
    "b": "Shows history of command usage"
  },
  "export": {
    "a": function (keyword) {
      let varName = keyword[0].slice(0, keyword[0].indexOf("="))
      let varValue = keyword[0].slice(keyword[0].indexOf("=") + 1, keyword[0].length)
      localStorage.setItem(varName, varValue)
    },
    "b": "Sets environment variable.<br>&nbsp;&nbsp;&nbsp;&nbsp;Usage:<br>&nbsp;&nbsp;&nbsp;&nbsp;export MY_NAME='Chris Evans'<br>&nbsp;&nbsp;&nbsp;&nbsp;echo $MY_NAME"
  },
  "echo": {
    "a": function (keyword) {
      keyword = keyword.map(elem => {
        if (elem.startsWith("$")) {
          return keywords.getenv.a([elem.slice(1)], true) || keywords.getpmv.a([elem.slice(1)], true)
        }
        return elem
      })
      printLn(keyword.join(" "))
    },
    "b": "Prints on the screen"
  },
  "getenv": {
    "a": function (keyword, callback) {
      let value = sessionStorage.getItem(keyword[0])
      if (callback) return value
      printLn(value)
    },
    "b": "Prints environment variable.<br>&nbsp;&nbsp;&nbsp;&nbsp;Usage:<br>&nbsp;&nbsp;&nbsp;&nbsp;getenv MY_NAME"
  },
  "getpmv": {
    "a": function (keyword, callback) {
      let value = localStorage.getItem(keyword[0])
      if (callback) return value
      printLn(value)
    },
    "b": "Prints permanent variable.<br>&nbsp;&nbsp;&nbsp;&nbsp;Usage:<br>&nbsp;&nbsp;&nbsp;&nbsp;getpmv MY_NAME"
  },
  "whoami": {
    "a": function (callback) {
      let whoami = keywords.getpmv.a(["whoami"], true)
      whoami = whoami || "erucix"
      if (callback) return whoami
      printLn(whoami)
    },
    "b": "Prints effective username"
  },
  "curl": {
    "a": function (keyword) {
      let http = new XMLHttpRequest()
      http.open("GET", keyword[0])
      http.onload = function () {
        printLn(http.responseText)
      }
      http.onerror = function (e) {
        printLn("Can't access URL: " + JSON.stringify(e), true)
      }
      http.send()
    },
    "b": "Sends get request to URL<br>&nbsp;&nbsp;&nbsp;&nbsp;Usage:<br>&nbsp;&nbsp;&nbsp;&nbsp;curl https://google.com"
  },
  "setuser": {
    "a": function (keyword) {
      if (!keyword[0]) return;
      keywords.export.a(["whoami=" + keyword[0]])
      keywords.whoami.a()
    },
    "b": "Sets user name.<br>&nbsp;&nbsp;&nbsp;&nbsp;Usage:<br>&nbsp;&nbsp;&nbsp;&nbsp;setuser chris"
  },
  "useragent": {
    "a": function () {
      printLn(navigator.userAgent)
    },
    "b": "Prints useragent value"
  }
}

function keywordMissing(keyword) {
  printLn(`<span class="red">${keyword}:</span> command not found`)
}

function printLn(line, text) {
  if (!line) return;
  let outputBox = document.body.querySelectorAll(".outputBox")
  outputBox = outputBox[outputBox.length - 1]
  if (text) {
    outputBox.innerText = line;
  } else {
    outputBox.innerHTML = line;
  }
}

const history = [""]
let pos = 0

function createActiveBodyContainer() {

  const inputEvent = new Event("input", { bubbles: true, cancelable: true })


  const activeBodyContainer = document.createElement("div")
  const preDisplayText = document.createElement("span")
  const bracket1 = document.createElement("span")
  const bracket2 = document.createElement("span")
  const deviceName = document.createElement("span")
  const centralUnicode = document.createElement("span")
  const userName = document.createElement("span")
  const bracket3 = document.createElement("span")
  const bracket4 = document.createElement("span")
  const currentDirectory = document.createElement("span")
  const bracket9 = document.createElement("span")
  const inputContainer = document.createElement("span")
  const bracket5 = document.createElement("span")
  const euid = document.createElement("span")
  const keywordInputBox_under = document.createElement("span")
  const keywordInputBox_over = document.createElement("span")
  const outputBox = document.createElement("span")

  activeBodyContainer.setAttribute("class", "activeBodyContainer")
  preDisplayText.setAttribute("class", "preDisplayText")
  bracket1.setAttribute("class", "bracket")
  bracket2.setAttribute("class", "bracket")
  deviceName.setAttribute("class", "deviceName")
  centralUnicode.setAttribute("class", "centralUnicode")
  userName.setAttribute("class", "userName")
  bracket3.setAttribute("class", "bracket")
  bracket4.setAttribute("class", "bracket")
  currentDirectory.setAttribute("class", "currentDirectory")
  bracket9.setAttribute("class", "bracket")
  inputContainer.setAttribute("class", "inputContainer")
  bracket5.setAttribute("class", "bracket")
  euid.setAttribute("class", "euid")
  keywordInputBox_under.setAttribute("class", "keywordInputBox_under")
  keywordInputBox_over.setAttribute("class", "keywordInputBox_over")
  keywordInputBox_over.setAttribute("contenteditable", "true")
  keywordInputBox_over.setAttribute("spellcheck", "false")
  outputBox.setAttribute("class", "outputBox")


  bracket1.innerHTML = "&boxdr;&HorizontalLine;&HorizontalLine;&HorizontalLine;"
  bracket2.innerText = "("
  deviceName.textContent = navigator.userAgentData.platform.toLowerCase()
  centralUnicode.textContent = "@"
  userName.textContent = keywords.whoami.a(true)
  bracket3.innerText = ")"
  bracket4.innerText = "["
  currentDirectory.textContent = "~"
  bracket9.innerText = "]"
  bracket5.innerHTML = "&boxur;&HorizontalLine;&HorizontalLine;&HorizontalLine;"
  euid.textContent = keywords.whoami.a(true) == "root" ? "#" : "$"

  preDisplayText.appendChild(bracket1) //append 1,2
  preDisplayText.appendChild(bracket2) //append 1,2
  preDisplayText.appendChild(deviceName) //append 1,3
  preDisplayText.appendChild(centralUnicode) // append 1,4
  preDisplayText.appendChild(userName) // append 1,5
  preDisplayText.appendChild(bracket3) //append 1,6
  preDisplayText.appendChild(bracket4) //append 1,7
  preDisplayText.append(currentDirectory) //append 1,8
  preDisplayText.appendChild(bracket9) //append 1,9
  inputContainer.appendChild(bracket5) //append 2,1
  inputContainer.appendChild(euid)    //append 2,2

  inputContainer.appendChild(keywordInputBox_under)
  inputContainer.appendChild(keywordInputBox_over) //append 2,3


  activeBodyContainer.appendChild(preDisplayText)  //append 1
  activeBodyContainer.appendChild(inputContainer) // append 2
  activeBodyContainer.appendChild(outputBox) //append 3
  document.body.appendChild(activeBodyContainer) //append 4

  window.addEventListener("click", () => {
    keywordInputBox_over.focus()
  })

  keywordInputBox_over.focus()

  keywordInputBox_over.addEventListener("input", (e) => {
    const inputValue = keywordInputBox_over.textContent.trim().replace(String.fromCharCode(160), " ").split(" ").join(" ").toString().split(" ")
    let primaryValue = inputValue[0]
    inputValue.shift()

    if (e.inputType == "insertParagraph") {
      if (primaryValue != "") {
        if (keywords.hasOwnProperty(primaryValue)) {
          keywords[primaryValue].a(inputValue)
          keywordInputBox_over.setAttribute("contentEditable", "false")
        } else {
          keywordMissing(primaryValue)
        }
      }
      history.push(primaryValue + (inputValue.join(" ") != "" ? " " : "") + inputValue.join(" "))
      pos = history.length - 1
      keywordInputBox_over.removeEventListener("input", () => { })
      window.removeEventListener("click", () => { })
      createActiveBodyContainer()
    }

    if (keywords.hasOwnProperty(primaryValue)) {
      primaryValue = `<p>${primaryValue}</p>&nbsp;`
    } else {
      primaryValue = primaryValue + " "
    }

    keywordInputBox_under.innerHTML = primaryValue + inputValue.join(" ")

  })



  keywordInputBox_over.addEventListener("keydown", (e) => {

    if (e.keyCode == 38) {
      keywordInputBox_over.textContent = history[pos ? pos-- : 0]
      keywordInputBox_over.dispatchEvent(inputEvent)
    } else if (e.keyCode == 40) {
      pos < history.length && pos++
      keywordInputBox_over.textContent = history[pos]
      keywordInputBox_over.dispatchEvent(inputEvent)
    }
  })

}

createActiveBodyContainer()