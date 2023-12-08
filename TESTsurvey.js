app.get("/survey", (req, res) => {
    res.render("survey", {});
});

app.post("/survey", (req, res) => {
    console.log(req.body.ResponseID)
    console.log(req.body.age)
    console.log(req.body.gender)
    console.log(req.body.relationshipStatus)
    console.log(req.body.occupation)
    console.log(req.body.mediaUsage)
    knex("Respondent")
        .insert({
            Origin: 'Provo',
            Date: new Date(),
            Time: new Date().getTime(),
            Age: parseInt(req.body.age),
            Gender: req.body.gender,
            RelationshipStatus: req.body.relationshipStatus,
            OccupationStatus: req.body.occupation,
            SocialMediaUse: req.body.mediaUsage,
            HoursOnSocialMedia: req.body.time,
            SocialMediaWithoutPurpose: parseInt(req.body.noPurpose),
            DistractedBySocialMedia: parseInt(req.body.distracted),
            RestlessWithoutSocialMedia: parseInt(req.body.restless),
            EasilyDistractedScale: parseInt(req.body.youDistracted),
            BotheredByWorriesScale: parseInt(req.body.worries), 
            DifficultyConcentrating: parseInt(req.body.concentrate),
            CompareSelfOnSocialMedia: parseInt(req.body.compare),
            FeelingsAboutComparisons: parseInt(req.body.compare),
            SeekValidationFrequency: parseInt(req.body.validation),
            FeelingsOfDepression: parseInt(req.body.depressed),
            InterestFluctuationScale: parseInt(req.body.interest),
            SleepIssuesScale : parseInt(req.body.sleep)
        }))

    

        
        knex("Main")
        .insert({
            ResponseID : ???,
            SocialMediaPlatformID: ???,
            SocialMediaPlatform :







        
    //     .returning('ResponseID')
    //     .then(([responseId]) => {
    //         const organizationInserts = [];
    //         const platformInserts = [];
    //         const organizationLength = req.body.organization.length;

    //         // Insert data into the Main table
    //         for (let iCount = 0; iCount < organizationLength; iCount++) {
    //             organizationInserts.push(knex("Main").insert({
    //                 ResponseID: responseId,
    //                 OrganizationAffiliationID: req.body.organization[iCount],
    //                 SocialMediaPlatformID: req.body.platform[iCount],
    //             }));
    //         }

    //         // Insert data into the Organization and SocialMedia tables
    //         for (let iCount = 0; iCount < organizationLength; iCount++) {
    //             organizationInserts.push(knex("Organization").insert({
    //                 OrganizationAffiliation: req.body.organization[iCount]
    //             }));

    //             platformInserts.push(knex("SocialMedia").insert({
    //                 SocialMediaPlatform: req.body.platform[iCount]
    //             }));
    //         }

    //         // Use Promise.all to wait for all inserts to complete
    //         return Promise.all([...organizationInserts, ...platformInserts]);
    //     })
    //     .then(() => {
    //         res.redirect("/");
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         res.status(500).send("Internal Server Error");
    //     });
    // })
