let express = require("express");

let app = express();

let path = require("path");

// port we are listening on
const port = process.env.PORT || 3000;

// I want to use ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/bs'));

//how it is going to parse data
app.use( express.urlencoded( {extended: true}) );
// ??
// app.use(express.json());

//Our server from postgres we will be using
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || "localhost",
        user: process.env.RDS_USERNAME || "postgres",
        password: process.env.RDS_PASSWORD || "kikico",
        database: process.env.RDS_DB_NAME ||"UPDATE TO MENTAL THING",
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
});

// random route to landing page
app.get("/", (req,res) => {
    res.render('index');
});

// random route to Login page
app.get("/login", (req,res) => {
    res.render('login');
});

// random route to Modify page
app.get("/modifyaccount", (req,res) => {
    res.render('modifyAccount');
});

// random route to Create page
app.get("/createaccount", (req,res) => {
    res.render('createAccount');
});

// random route to Landing 2 page
app.get("/admin", (req,res) => {
    res.render('adminLanding');
});

// random route to form/survey page
app.get("/survey", (req,res) => {
    res.render('form');
});

// // random route to Tableau page TO FIX
// app.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

// // random route to Record form page (add a record) TO FIX
// app.get("/", (req,res) => {
//     res.render('index');
// });


// //DATA and route FROM PG TO THE ADMIN RECORD PAGE 
// app.get("/adminRecords", (req, res) => {
//     // select * from country, then store it to a variable and do what we say
//     knex.select().from("TABLENAME").then( variableName => {
//         // displayCountry is a html page that it shows the table, the second parameter is the data
//         res.render("adminRecords", { adminInfo : variableName});
//     })
// });

// //DELETE a record route
// app.post("/deleteRecord", (req, res) => {
//     // select * from country, then store it to a variable and do what we say
//     knex.select().from("TABLENAME").then( variableName => {
//         // displayCountry is a html page that it shows the table, the second parameter is the data
//         res.render("adminRecords", { adminInfo : variableName});
//     })
// });

// //DATA and route FROM PG TO USER RECORD PAGE 
// app.get("/userRecords", (req, res) => {
//     // Query something, then store it to a variable and do what we say
//     knex.select().from("TABLENAME").then( variableName => {
//         // adminRecords is a ejs/html page that it shows the table, the second parameter is the data
//         res.render("userRecords", { userInfo : variableName});
//     })
// });


// Start the server listening (do it at the bottom)
app.listen( port, () => console.log("Server is listening"));