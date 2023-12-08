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
                    OrganizationAffiliationID: ???
                    OrganizationAffiliation: req.body.organization[iCount]
                }));

                platformInserts.push(knex("SocialMedia").insert({
                    SocialMediaPlatformID: ???
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









// BEFORE THINGS just in case
// add survey info to database
app.post("/survey", (req, res) => {
    if (req.body.organization.length > 0)
    {
        for(iCount = 0; iCount < req.body.organization.length; iCount++)
        {
           //add a row
           knex("Respondent")      
           .innerJoin('Main', 'Main.ResponseID', 'Respondent.ResponseID')
           .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', 'Main.SocialMediaPlatformID')
           .innerJoin('Organization', 'Organization.OrganizationAffiliationID', 'Main.OrganizationAffiliationID').insert(
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
               InterestFluctuationScale: req.body.interest,
               SleepIssuesScale : req.body.sleep,
               // double check these
               SocialMediaPlatform : req.body.platform[iCount],
               OrganizationAffiliation : req.body.organization[iCount]
                  
           }
           
           )     
        }
    }

    if (req.body.platform.length > 0)
    {
        for(iCount = 0; iCount < req.body.platform.length; iCount++)
        {
           //add a row     
            knex("Respondent")      
            .innerJoin('Main', 'Main.ResponseID', 'Respondent.ResponseID')
            .innerJoin('SocialMedia', 'SocialMedia.SocialMediaPlatformID', 'Main.SocialMediaPlatformID')
            .innerJoin('Organization', 'Organization.OrganizationAffiliationID', 'Main.OrganizationAffiliationID').insert(
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
                InterestFluctuationScale: req.body.interest,
                // double check these
                SocialMediaPlatform : req.body.platform[iCount],
                OrganizationAffiliation : req.body.organization[iCount]

            
            }
    
    )   
        }
    }

});


// **********************************The first loop for search bar is good
<form action="/adminRecords/<%= adminInfo[iCount].ResponseID %>" method="GET">
<label for="ResponseID">Search</label>
  <select name="ResponseID">
    <% 
    const uniqueResponseIDs = [...new Set(adminInfo.map(obj => obj.ResponseID))];
    for (let iCount = 0; iCount < uniqueResponseIDs.length; iCount++) { %>
      <option value='<%= adminInfo[uniqueResponseIDs[iCount]] %>'><%= uniqueResponseIDs[iCount] %></option>
  <% } %>
  </select>
  <button type="submit" class="createbtn">Search</button>
</form>


// new guy same logic but es malo

<% 
const uniqueResponseIDs = [...new Set(adminInfo.map(obj => obj.ResponseID))];

for (let iCount = 0; iCount < uniqueResponseIDs.length; iCount++) { %>

    <form action="/adminRecords/<%= adminInfo[iCount].ResponseID %>" method="GET">
        <label for="ResponseID">Search</label>
        <select name="ResponseID">
          <option value='<%= adminInfo[uniqueResponseIDs[iCount]] %>'><%= uniqueResponseIDs[iCount] %></option>
        </select>
        <button type="submit">Search</button>
    </form>
    <%
        })(iCount);
    %>
<% } %>



// nick be crazy
//Search record on the admin records page
app.get("/adminRecords/:ResponseID", (req, res) => {

    const love = parseInt(req.query.ResponseID)
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




// Something be workin
<form action="/adminRecords/:ResponseID %>" method="GET">
<label for="ResponseID">Search</label>
  <select name="ResponseID">
    <% 
    <!-- const uniqueResponseIDs = [...new Set(adminInfo.map(obj => obj.ResponseID))]; -->
    for (let iCount = 0; iCount < adminInfo.length; iCount++) { %>
      <option value='<%= adminInfo[iCount].ResponseID %>'><%= adminInfo[iCount].ResponseID %></option>
  <% } %>
  </select>
  <button type="submit" class="createbtn">Search</button>
</form>
