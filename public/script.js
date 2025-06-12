let editor;

function runCode() {
  const code = document.getElementById("code").value;
  fetch("/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").textContent = data.output;
    });
}

window.onload = () => {
  editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "text/x-c++src",
    theme: "dracula",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    matchBrackets: true
  });
};

function runCode() {
  const code = editor.getValue();

  fetch("/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("output").textContent = data.output;
    })
    .catch((err) => {
      document.getElementById("output").textContent = "Error: " + err;
    });
}
