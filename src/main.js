const terminalBody = document.querySelectorAll(".terminalBody")[0]

var charging, level, chargingTime, dischargingTime;
const battery = navigator.getBattery().then(data => {
  charging = data.charging
  level = data.level * 100 + "%"
  chargingTime = data.chargingTime
  dischargingTime = data.dischargingTime
})

const keywords = {
  "clear": function(query) {
    if(query=="help") {
      return "Clears terminal screen"
    } else {
      document.querySelectorAll(".topPlaceholder").forEach((element)=>{
        element.remove()
      })
      document.querySelectorAll(".outputValue").forEach((element)=>{
        element.remove()
      })
      return "";
    }
  },
  "setuser": function(query) {
    if (query == "help") {
      return `Change username. Default: erucix`
    } else {
      localStorage.setItem("whoami", prompt("Enter username: ", this.whoami()))
      localStorage.setItem("whoami-nr", localStorage.getItem("whoami"))
      return "New Username: " + localStorage.getItem("whoami")
    }
  },
  "exit": function(query) {
    if (query == "help") {
      return "Exits current terminal"
    } else {
      if (this.whoami() == "root") {
        localStorage.setItem("whoami", localStorage.getItem("whoami-nr"))
        return ""
      } else {
        setTimeout(function() { window.close() }, 1000)
        return "Exitting..."
      }
    }
  },
  "su": function(query) {
    if (query == "help") {
      return "Get superuser permission"
    } else {
      localStorage.setItem("whoami", "root")
      return '<span class="green">[</span><span class="red">!</span><span class="green">]</span> Proceed with caution ;)'
    }
  },
  "whoami": function(query) {
    if (query == "help") {
      return "Returns your superuser type"
    } else {
      return localStorage.getItem("whoami") == null ? "erucix" : localStorage.getItem("whoami");
    }
  },
  "sysinfo": function(query) {
    if (query == "help") {
      return "Shows JS accessable system details"
    } else {
      const row = document.createElement("span");
      row.innerHTML = `
      [+] OS: ${this.osname()}<br>
      [+] Max Touch Point: ${navigator.maxTouchPoints}<br>
      [+] Battery Level: ${level}<br>
      [+] Charging: ${charging}<br>
      [+] Charging Time: ${chargingTime}<br>
      [+] Discharging Time: ${dischargingTime}<br>
      [+] Vendor: ${navigator.vendor}<br>
      [+] DoNotTrack: ${navigator.doNotTrack}<br>
      [+] Platform: ${navigator.platform}<br>
      [+] Device Memory: ${navigator.deviceMemory}<br>
      [+] Eruda Attached: ${"eruda" in window}<br>
      [+] Screen Height: ${window.innerHeight}<br>
      [+] Screen Width: ${window.innerWidth}<br>
      [+] Cookie Enabled: ${navigator.cookieEnabled}<br>
      [+] Is Webdriver: ${navigator.webdriver}<br>
      `
      return row.innerHTML;
    }
  },
  "osname": function(query) {
    if (query == "help") {
      return "Your OS according to navigator"
    } else {
      const appVersion = navigator.appVersion;
      if (appVersion.indexOf("Android") != -1) {
        return "android"
      } else if (appVersion.indexOf("Linux") != -1) {
        return "linux"
      } else if (appVersion.indexOf("Win") != -1) {
        return "windows"
      } else if (appVersion.indexOf("Mac") != -1) {
        return "mac"
      } else {
        return "hecker"
      }
    }
  },
  "help": function(query) {
    if (query == "help") {
      return "Shows this help message"
    } else {
      const row = document.createElement("span");
      let i = 0;
      for (let val in keywords) {
        row.innerHTML += '<span class="green">[</span>*<span class="green">]</span> ' + Object.getOwnPropertyNames(keywords)[i] + " - " + keywords[val]("help") + "<br>";
        i++;
      }
      return row.innerHTML;
    }
  }
}

function execute(value = "") {
  return keywords[value]()
}

function output(code) {
  let outputValue = document.createElement("span");
  outputValue.classList.add("outputValue")
  if (code == "") {
    newLine()
    return;
  } else if (code in keywords) {
    outputValue.innerHTML = execute(code)
  } else {
    outputValue.innerHTML = "<span class='red'>" + code + "</span>" + " is not defined in keywords"
  }
  terminalBody.appendChild(outputValue)
  newLine()
}

function newLine() {
  const oldCodeValue = document.querySelectorAll(".codeValue");
  oldCodeValue.forEach((element) => {
    element.removeEventListener("keydown", () => {})
    element.setAttribute("disabled", "");
  })

  const topPlaceholder = document.createElement("div");

  topPlaceholder.innerHTML = `<span class="topPlaceholder"><span class="bracket default">[&nbsp;</span><span class="osName default">${keywords.osname()}</span><span class="rate default">&nbsp;@&nbsp;</span><span class="username default">${keywords.whoami()}</span><span class="bracket default">&nbsp;]</span>&nbsp;<span class="whoami default">${keywords.whoami() == "root" ? "#" : "$"}</span>&nbsp;<input type="text default" class="codeValue">`;
  topPlaceholder.classList.add("topPlaceholder");
  terminalBody.appendChild(topPlaceholder)

  let newCodeValue = document.querySelectorAll(".codeValue");
  newCodeValue = newCodeValue[newCodeValue.length - 1];

  topPlaceholder.addEventListener("keydown", (e) => {
    if (e.keyCode == "13") {
      output(newCodeValue.value)
    }
  })
}

newLine()