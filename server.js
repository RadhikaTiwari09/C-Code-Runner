const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/run", (req, res) => {
    const code = req.body.code;
    const timestamp = Date.now();
    const cppPath = path.join(uploadsDir, `code_${timestamp}.cpp`);
    const exePath = path.join(uploadsDir, `code_${timestamp}.exe`);

    fs.writeFileSync(cppPath, code);

    const command = `g++ "${cppPath}" -o "${exePath}" && "${exePath}"`;

    exec(command, { shell: "cmd.exe" }, (err, stdout, stderr) => {
        if (err) {
            return res.send({ output: stderr });
        }
        res.send({ output: stdout });

        fs.unlinkSync(cppPath);
        fs.unlinkSync(exePath);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
