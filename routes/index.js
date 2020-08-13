var express = require("express");
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");
const studentData = require("./student1.json");
/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function(req, res, next) {
  res.send("<h1>This is localhost:3000/test</h1>");
});

router.get("/hello", function(req, res) {
  res.render("hello", {
    // 這邊不用寫 views/index 是因為 express 預設 template 就是會放在 views 資料夾裡面
    name: "hello",
    items: ["peter", "nick", "cake"],
    tag: false
  });
});

router.get("/images", function(req, res) {
  res.json({ message: "第一個API!" });
});

router.get("/student", function(req, res) {
  res.json({ studentData });
});

router.get("/hellopage", function(req, res) {
  res.render("hellopage", { data: studentData });
});

router.post("/submit-student-data", function(req, res) {
  var name = req.body.name + " " + req.body.address;
  res.send(
    name + " Submitted Successfully!<p><a href=/hellopage>GO BACK</a></p>"
  );
});

router.post("/hello1", function(req, res) {
  if (req.body.email === "") {
    res.json({
      status: "註冊失敗。",
      result: req.body.username,
      email: req.body.email
    });
  } else {
    res.json({
      status: "註冊成功。",
      result: req.body.username,
      email: req.body.email
    });
  }
});

router.get("/post/:id", function(req, res) {
  res.send(req.params.id);
});

router.get("/api/users", function(req, res) {
  var data = {
    data: [
      {
        id: 1,
        name: "Joe",
        age: 18,
        phone: "0912123456"
      },
      {
        id: 2,
        name: "John",
        age: 22,
        phone: "0923456789"
      }
    ]
  };
  res.json(data);
});

router.get("/api/users/:number", function(req, res) {
  var a = {
    id: 1,
    name: "Joe",
    age: 18,
    phone: "0912123456"
  };
  var b = {
    id: 2,
    name: "John",
    age: 22,
    phone: "0923456789"
  };
  if (req.params.number == 1) {
    res.json(a);
  } else if (req.params.number == 2) {
    res.json(b);
  } else if (req.params.number == "") {
    res.json(data);
  } else {
    res.json("NOT FOUND");
  }
});

router.put("/api/user/:username", function(req, res) {
  res.json(`hello${req.body.username}`);
});

router.delete("/api/users/:id", function(req, res) {
  res.send("Got a DELETE request at /user");
  // var id = req.params.id;
});

// ---------------------------------------------************************-- GET/POST/DELETE to JSON file -------------------------------//
fs.readFileAsync = function(filename, enc) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, enc, function(err, data) {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};
router.get("/api/student", function(req, res) {
  const file = "routes/student1.json";
  fs.readFileAsync(file, "utf8").then(data => {
    var json = JSON.parse(data);
    res.json(json);
  });
});

router.get("/api/student/:uid", function(req, res) {
  var filterData = studentData.find(item => item.uid == req.params.uid);
  res.json(filterData);
});

router.delete("/api/student/:uid", function(req, res) {
  const file = "routes/student1.json";
  fs.readFileAsync(file, "utf8").then(data => {
    var json = JSON.parse(data);
    var user = json.filter(user => {
      return user.uid.toString() !== req.params.uid;
    });
    fs.writeFileSync(file, JSON.stringify(user, null, 1)); //把檔案重新寫入file裡面
  });
  res.json("delete success");
});

router.post("/api/post/student", function(req, res) {
  const file = "routes/student1.json";
  fs.readFileAsync(file, "utf8").then(data => {
    var json = JSON.parse(data);
    var postData = {
      username: req.body.username.toUpperCase(),
      password: req.body.password,
      email: req.body.email,
      uid: json[json.length - 1].uid + 1,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone
    };
    json.push(postData);
    fs.writeFileSync(file, JSON.stringify(json, null, 1));
  });
  res.json("success");
});

router.post("/api/post/student/:uid", function(req, res) {
  const file = "routes/student1.json";
  fs.readFileAsync(file, "utf8").then(data => {
    var json = JSON.parse(data);
    var needUid = json.filter(item => item.email == req.body.email);
    var postData = {
      username: req.body.username.toUpperCase(),
      password: req.body.password,
      email: req.body.email,
      uid: needUid[0].uid,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone
    };
    json.splice(json.indexOf(needUid[0]), 1, postData);
    fs.writeFileSync(file, JSON.stringify(json, null, 1));
  });
  res.json("success");
});
router.post("/api/search", function(req, res) {
  const file = "routes/student1.json";
  fs.readFileAsync(file, "utf8").then(data => {
    var json = JSON.parse(data);
    var filter = req.body.searchValue.toUpperCase();
    res.json(
      json.filter(
        item =>
          item.username.toUpperCase().indexOf(filter) > -1 ||
          item.age.toUpperCase().indexOf(filter) > -1 ||
          item.email.toUpperCase().indexOf(filter) > -1
      )
    );
  });
});
module.exports = router;
