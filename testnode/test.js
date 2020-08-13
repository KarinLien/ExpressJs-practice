const fs = require("fs");

// 1.從文件中讀取數據。
// 2.修改數據以獲取文件應具有的新數據。
// 3.將數據（不附加）寫回文件。
//每次要向json添加新屬性時，都應該讀取該文件，然後添加新屬性

fs.readFile("student.json", (err, data) => {
  // READ
  if (err) {
    return console.error(err);
  }

  var data = JSON.parse(data.toString());
  console.log(data);
  data.address = "taipei";
  data.phone = "09123456799999"; // MODIFY

  var writeData = fs.writeFile(
    "student.json",
    JSON.stringify(data),
    (err, result) => {
      // WRITE
      if (err) {
        return console.error(err);
      } else {
        console.log(result);
        console.log("Success");
      }
    }
  );
});
