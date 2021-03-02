const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data)=> {
    if (err) throw err;

    let notes = JSON.parse(data);

    app.get("/", (req, res) =>{
      res.sendFile(path.join(__dirname, "../public/index.html"))
    });

    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"))
    });
    
    app.get("/api/notes", (req, res) => {
      res.json(notes);
    });

    app.get("/api/notes/:id", (req, res) => {
      res.json(notes[req.params.id])
    });

    app.post("/api/notes", (req, res) => {
      let newNote = req.body;
      notes.push(newNote);
      updateDB();
      res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
      notes.splice(req.params.id, 1);
      updateDB();
      res.end();
  });

    function updateDB() {
      fs.writeFile("db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
      })
    }
  })
}