"use strict";

const keywords = {
  "help": {
    "a": function (keyword) {
      if (!keyword.length) {
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
  "game": {
    "a": function (keyword) {
      printLn("no games anymore")
    },
    "b": "shows how many games you have"
  },
  "shame": {
    "a": function () {
      printLn(333)
      return;
    },
    "b": "shame shame"
  },
  "clear": {
    "a": function () {
      const allActiveBodyContainer = document.querySelectorAll("div")
      allActiveBodyContainer.forEach((elem) => {
        elem.remove()
      })
    },
    "b": "clears screen"
  }
}

function keywordMissing(keyword) {
  printLn(`<span class="red">${keyword}:</span> command not found`)
}

function printLn(line) {
  if (!line) return;
  let outputBox = document.body.querySelectorAll(".outputBox")
  outputBox = outputBox[outputBox.length - 1]
  outputBox.innerHTML = line;
}

const history = [""]

function createActiveBodyContainer() {


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
  deviceName.textContent = "bull"
  centralUnicode.textContent = "@"
  userName.textContent = "erucix"
  bracket3.innerText = ")"
  bracket4.innerText = "["
  currentDirectory.textContent = "~"
  bracket9.innerText = "]"
  bracket5.innerHTML = "&boxur;&HorizontalLine;&HorizontalLine;&HorizontalLine;"
  euid.textContent = "$"

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

  })

}



createActiveBodyContainer()