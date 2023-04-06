// Importeer express uit de node_modules map
import express from "express";

const url = "https://api.vinimini.fdnd.nl/api/v1/producten"; // URL naar Json data
const urlPost = "https://api.vinimini.fdnd.nl/api/v1/notities"; // Post URL 

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// afhandeling van formulieren
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Maak een route voor de index
app.get("/", (request, response) => {
  let productenUrl = url;

  fetchJson(productenUrl).then((data) => {
    response.render("index", data);
  });
});

app.get("/logboek", (request, response) => { //Als de route /logboek is dan wordt dit uitgevoerd
    response.render("logboek"); //Dit verwijst naar de view/logboek.ejs
});




// ..............Post note to API.................
//"/newnote" is de (post) actie van het formulier
app.post('/newnote', function (req, res) { // Vanuit het formulier wordt action = /newnote gebruikt. <form action="/newnote" method="post">

  req.body.afgerond = false
  req.body.persoonId = 'clemozv3c3eod0bunahh71sx7'
  req.body.datum = req.body.datum + ':00Z'
  req.body.herinnering = [req.body.herinnering + ':00Z']
  console.log("request body:")
  console.log(req.body)

  postJson(urlPost, req.body).then((data) => {

    
    if (data.success) {
      console.log("POST gelukt")
      res.redirect('/logboek') // Redirect naar de url(route)  /logboek
  
    } else {
      
      console.log("Post error", data.message)
    }
  })
});

// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error);
}

export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}


