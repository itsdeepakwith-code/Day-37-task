const express = require("express");
const fs = require("fs");
const { format } = require("date-fns");

const app = express();
const PORT = 3001;

// Home Page
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the API Endpoint</h1>
    <ul>
      <li><a href="/create-file">Create a New Text File</a></li>
      <li><a href="/read-files">View All Text Files</a></li>
    </ul>
  `);
});

// Create a New Text File
app.get("/create-file", (req, res) => {
  try {
    const currentTime = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
    const filePath = `./TimeStamps/${currentTime}.txt`;
    const content = `Content created at ${currentTime}`;

    fs.writeFileSync(filePath, content, "utf8");

    res.send(`
      <h2>File Created Successfully!</h2>
      <p>File Name: ${currentTime}.txt</p>
      <p>File Content: ${content}</p>
      <a href="/">Go Back</a>
    `);
  } catch (error) {
    res.status(500).send(`<h2>Error: ${error.message}</h2>`);
  }
});

// View All Text Files
app.get("/read-files", (req, res) => {
  try {
    const files = fs.readdirSync("./TimeStamps");
    const fileList = files
      .filter((file) => file.endsWith(".txt"))
      .map((file) => {
        const content = fs.readFileSync(`./TimeStamps/${file}`, "utf8");
        return `<li><strong>${file}:</strong> ${content}</li>`;
      })
      .join("");

    res.send(`
      <h2>All Text Files</h2>
      <ul>${fileList}</ul>
      <a href="/">Go Back</a>
    `);
  } catch (error) {
    res.status(500).send(`<h2>Error: ${error.message}</h2>`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
