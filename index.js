const fs = require("fs");
const http = require("http");

const PORT = process.env.PORT || 8000;

const time = Date().toString();

// fs.writeFile("Date/current date-time.txt", time, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("data saved");
//   }
// });

// fs.readFile("Date/current date-time.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     3;
//     http
//       .createServer((req, res) => {
//         res.writeHead(200, { content: "html/txt" });
//         res.write(data);
//         res.end();
//       })
//       .listen(PORT, () => console.log("listening" + PORT));
//   }
// });

// express
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  // to read the content of the file and send it as response
  fs.readFile("Date/timestamp.txt", "UTF8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json([
        {
          currentTime: data,
        },
      ]);
    }
  });
});
app.post("/", function (req, res) {
  //to get request from postman and write the body in file
  let data = req.body.time;
  fs.writeFile("Date/timestamp.txt", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      let arr = [
        {
          message: "Data saved Successfully",
          savedData: data,
        },
      ];
      res.json(arr); //to show success message
    }
  });
});
app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});
