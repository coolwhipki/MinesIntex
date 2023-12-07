let express = require("express");

let app = express();

let path = require("path");

// port we are listening on
const port = process.env.PORT || 3000;

// I want to use ejs
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'bs/assets')))


//how it is going to parse data
app.use( express.urlencoded( {extended: true}) );
// ??
// app.use(express.json());

//Our server from postgres we will be using
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "awseb-e-2wwqgezghp-stack-awsebrdsdatabase-ibek7zsxvhz9.chbjz0hu5jhn.us-east-1.rds.amazonaws.com" || "localhost",
        user: process.env.RDS_USERNAME || "ebroot",
        password: process.env.RDS_PASSWORD || "happykira",
        database: process.env.RDS_DB_NAME ||"ebdb",
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
});



// random route to landing page
app.get("/", (req,res) => {
    res.render('index');
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

// random route to Tableau page TO FIX
/*app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});*/

// // random route to Record form page (add a record) TO FIX
app.get("/", (req,res) => {
    knex.select().from("user").then(user => {
        res.render('index', {users: user});
    })
});

// **********************************************ADMIN RELATED ROUTES*********************************************
//DATA and route FROM PG TO THE ADMIN RECORD PAGE 
app.get("/adminRecords", (req, res) => {
    knex.select('*')
        .from('Respondent')
        .innerJoin('Main', 'Main.ResponseID', '=', 'Respondent.ResponseID')
        .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', '=', 'Main.SocialMediaPlatformID')
        .innerJoin('Organization', 'Organization.OrganizationAffiliationID', '=', 'Main.OrganizationAffiliationID')
        .then( chicks => {
        // adminRecords is a html page that it shows the table, the second parameter is the data
        res.render("adminRecords", { adminInfo : chicks});
    })
});

app.post("/adminRecords", (req, res) => {
    knex("Respondent")      
    .innerJoin('Main', 'Main.ResponseID', 'Respondent.ResponseID')
    .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', 'Main.SocialMediaPlatformID')
    .innerJoin('Organization', 'Organization.OrganizationAffiliationID', 'Main.OrganizationAffiliationID').update(
        {
        Origin: 'Provo',
        Date: new Date().getDate(),
        Time: new Date().getTime(),
        Age: req.body.age,
        Gender: req.body.gender,
        RelationshipStatus: req.body.relationshipStatus,
        OccupationStatus: req.body.occupation,
        SocialMediaUse: req.body.mediaUsage,
        HoursOnSocialMedia: req.body.time,
        SocialMediaWithoutPurpose:req.body.noPurpose,
        DistractedBySocialMedia: req.body.distracted,
        RestlessWithoutSocialMedia: req.body.restless,
        EasilyDistractedScale: req.body.youDistracted,
        BotheredByWorriesScale: req.body.worries, 
        DifficultyConcentrating: req.body.concentrate,
        CompareSelfOnSocialMedia: req.body.compare,
        FeelingsAboutComparisons: req.body.compare,
        SeekValidationFrequency: req.body.validation,
        FeelingsOfDepression: req.body.depressed,
        InterestFluctuationScale: req.body.interest
        // SocialMediaPlatformID :
        // SocialMediaPlatform :
        // OrganizationAffiliationID :
        // OrganizationAffiliation :

        }).then(record => {
            res.redirect("/adminRecords");
    });
});


//Search record on the admin records page
app.get("/adminRecords/:ResponseID", (req, res) => {

    const love = parseInt(req.params.ResponseID)
    knex
    .select('*')
        .from('Respondent')
        .innerJoin('Main', 'Main.ResponseID', '=', 'Respondent.ResponseID')
        .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', '=', 'Main.SocialMediaPlatformID')
        .innerJoin('Organization', 'Organization.OrganizationAffiliationID', '=', 'Main.OrganizationAffiliationID')
        .where('Respondent.ResponseID', love)
        .then(specificGuy => {res.render("searchResults", { Dude: specificGuy });
    
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
        
    });
});


// ***********************************************USER RELATED PATHS******************************************
//DATA and route FROM PG TO THE USER RECORD PAGE 
app.get("/userRecords", (req, res) => {
    knex.select(
        'Respondent.ResponseID',
        'Respondent.Origin',
        'Respondent.Date',
        'Respondent.Time',
        'Respondent.Age',
        'Respondent.Gender',
        'Respondent.RelationshipStatus',
        'Respondent.OccupationStatus',
        'Respondent.SocialMediaUse',
        'Respondent.HoursOnSocialMedia',
        'Respondent.SocialMediaWithoutPurpose',
        'Respondent.DistractedBySocialMedia',
        'Respondent.RestlessWithoutSocialMedia',
        'Respondent.EasilyDistractedScale',
        'Respondent.BotheredByWorriesScale',
        'Respondent.DifficultyConcentrating',
        'Respondent.CompareSelfOnSocialMedia',
        'Respondent.FeelingsAboutComparisons',
        'Respondent.SeekValidationFrequency',
        'Respondent.FeelingsOfDepression',
        'Respondent.InterestFluctuationScale',
        'Respondent.SleepIssuesScale',
        'Main.MainID',
        'SocialMedia.SocialMediaPlatformID',
        'SocialMedia.SocialMediaPlatform',
        'Organization.OrganizationAffiliationID',
        'Organization.OrganizationAffiliation'
      )
      .from('Respondent')
      .innerJoin('Main', 'Main.ResponseID', 'Respondent.ResponseID')
      .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', 'Main.SocialMediaPlatformID')
      .innerJoin('Organization', 'Organization.OrganizationAffiliationID', 'Main.OrganizationAffiliationID').then( chicks => {
        // userRecords is a html page that it shows the table, the second parameter is the data
        res.render("userRecords", { userInfo : chicks});
    })
});

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

// ***********************************************Log In Related Paths****************************************

// random route to Login page
app.get("/login", (req,res) => {
    res.render('login');
});


app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username === "admin" && password === "admin123") {
       res.redirect('adminLanding');
    }
    else if (knex("user").where("username", username) && knex("user").where("password", password))
    {
        res.redirect("userLanding");
    }
    else
    {
        res.redirect("login");
    }
});

app.get("/adminLanding", (req, res) => {
    res.render("adminLanding", {});
});

app.get("/userLanding", (req, res) => {
    res.render("userLanding", {});
});

app.get("/findUsername", (req, res) => {
    res.render("findUsername", {});
});

app.post("/createAccount", (req, res) => {
    knex("user").insert({username: req.body.username, password: req.body.password}).then(users => {
        res.redirect("/login");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.post("/findUsername", (req, res) => {
    knex.select().from("user").where("username", req.body.username).then(user => {
        res.render("modifyAccount", {users: user})
    });
});

app.post("/modifyAccount", (req, res) => {
    knex("user").where("user_id", parseInt(req.body.user_id)).update({
        username: req.body.username,
        password: req.body.password
    }).then(users => {
        res.redirect("/login");
    });
});
// ******************************************LANDING PAGES**************************************************
app.get("/adminLanding", (req, res) => {
    res.render("adminLanding", {});
});

app.get("/userLanding", (req, res) => {
    res.render("userLanding", {});
});



// **************************************Form/Survey RELATED PATHS****************************************
app.post("/survey", (req, res) => {
    // Insert data into the Respondent table
    knex("Respondent")
        .insert({
            Origin: 'Provo',
            Date: new Date().getDate(),
            Time: new Date().getTime(),
            Age: req.body.age,
            Gender: req.body.gender,
            RelationshipStatus: req.body.relationshipStatus,
            OccupationStatus: req.body.occupation,
            SocialMediaUse: req.body.mediaUsage,
            HoursOnSocialMedia: req.body.time,
            SocialMediaWithoutPurpose:req.body.noPurpose,
            DistractedBySocialMedia: req.body.distracted,
            RestlessWithoutSocialMedia: req.body.restless,
            EasilyDistractedScale: req.body.youDistracted,
            BotheredByWorriesScale: req.body.worries, 
            DifficultyConcentrating: req.body.concentrate,
            CompareSelfOnSocialMedia: req.body.compare,
            FeelingsAboutComparisons: req.body.compare,
            SeekValidationFrequency: req.body.validation,
            FeelingsOfDepression: req.body.depressed,
            InterestFluctuationScale: req.body.interest,
            SleepIssuesScale : req.body.sleep
        })
        .returning('ResponseID')
        .then(([responseId]) => {
            const organizationInserts = [];
            const platformInserts = [];

            // Insert data into the Main table
            for (let iCount = 0; iCount < req.body.organization.length; iCount++) {
                organizationInserts.push(knex("Main").insert({
                    ResponseID: responseId,
                    OrganizationAffiliationID: req.body.organization[iCount],
                    SocialMediaPlatformID: req.body.platform[iCount],
                }));
            }

            // Insert data into the Organization and SocialMedia tables
            for (let iCount = 0; iCount < req.body.organization.length; iCount++) {
                organizationInserts.push(knex("Organization").insert({
                    OrganizationAffiliation: req.body.organization[iCount]
                }));

                platformInserts.push(knex("SocialMedia").insert({
                    SocialMediaPlatform: req.body.platform[iCount]
                }));
            }

            // Use Promise.all to wait for all inserts to complete
            return Promise.all([...organizationInserts, ...platformInserts]);
        })
        .then(() => {
            res.redirect("/survey");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});


// **********************************************CRUD***********************************************
// Add a new route for deletion
app.post("/deleteRecord/:ResponseId", (req, res) => {
    const responseId = req.params.ResponseId;

    // Perform deletion based on ResponseID
    knex("Respondent")
        .where({ "ResponseID": responseId })
        .del()
        .then( specificGuy => {
            // You may want to add additional logic to delete related records in other tables
            // ...

            res.redirect("/adminRecord");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/editRecord", (req, res) => {
    res.render("editRecord", {});
});

app.get("/editRecord/:ResponseID", (req, res) => {
    knex.select("Age", "Gender", "RelationshipStatus", "OccupationStatus").from("Respondent").where({"ResponseID": req.params.ResponseID}).then(specificGuy => {
        res.render("editRecord", {Dude: specificGuy})
    });
})

app.post("/editRecord/:ResponseID", (req, res) => {
    knex("Respondent").where({"ResponseID": req.params.ResponseID}).update({
        Age: req.body.age,
        Gender: req.body.gender,
        RelationshipStatus: req.body.relationshipStatus,
        OccupationStatus: req.body.occupation
        // SocialMediaUse: req.body.mediaUsage,
        // HoursOnSocialMedia: req.body.time,
        // SocialMediaWithoutPurpose: req.body.noPurpose,
        // DistractedBySocialMedia: req.body.distracted,
        // RestlessWithoutSocialMedia: req.body.restless,
        // EasilyDistractedScale: req.body.youDistracted,
        // BotheredByWorriesScale: req.body.worries, 
        // DifficultyConcentrating: req.body.concentrate,
        // CompareSelfOnSocialMedia: req.body.compare,
        // FeelingsAboutComparisons: req.body.compare,
        // SeekValidationFrequency: req.body.validation,
        // FeelingsOfDepression: req.body.depressed,
        // InterestFluctuationScale: req.body.interest,
        // SleepIssuesScale : req.body.sleep
    }).then(specificGuy => {
        res.render("/adminRecords");
    });
})

// Start the server listening (do it at the bottom)
app.listen( port, () => console.log("Server is listening"));