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