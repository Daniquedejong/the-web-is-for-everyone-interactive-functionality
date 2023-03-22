// Importeer express uit de node_modules map
import express from "express";

// Maak een nieuwe express app aan
const url = "https://api.vinimini.fdnd.nl/api/v1/producten"; // URL naar Json data

const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", (request, response) => {
  let productenUrl = url;

  fetchJson(productenUrl).then((data) => {
    response.render("index", data);
  });
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



server.post('/new', (request, response) => {
    const baseurl = "https://whois.fdnd.nl/api/v1"
  
    const url = `${baseurl}/member`
  
    postJson(url, request.body).then((data) => {
      let newMember = { ... request.body }
  
      if (data.success) {
        response.redirect('/?memberPosted=true') 
        // TODO: squad meegeven, message meegeven
        // TODO: Toast meegeven aan de homepagina
      } else {
        const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
        const newdata = { error: errormessage, values: newMember }
        
        response.render('form', newdata)
      }
    })
  })