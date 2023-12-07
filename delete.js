// Survey routes
app.get("/form", (req, res) => res.render("form"));

// This creates a timestamp and inserts that into the database
let currentDate = new Date();

// Format the date and time as a string
let year = currentDate.getFullYear();
let month = String(currentDate.getMonth() + 1).padStart(2, '0');
let day = String(currentDate.getDate()).padStart(2, '0');
let hours = String(currentDate.getHours()).padStart(2, '0');
let minutes = String(currentDate.getMinutes()).padStart(2, '0');
let seconds = String(currentDate.getSeconds()).padStart(2, '0');
let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

app.post("/form", async (req, res) => {
    try {
        const [ResponseID] = await knex("Respondent")
            .insert({
                ResponseID: ,
                Origin: 'Provo',
                Date: ,
                Time: ,
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
            })

            .returning('ResponseID');

        // Assigning a variable for the platform_id array
        const platformIds = Array.isArray(req.body.platform_id);
        // Iterate over each platform_id and insert into user_platforms
        for (let iCount = 0; iCount < platformIds.length; iCount++) {
            const platformId = parseInt(platformIds[iCount]);
            await knex("user_platforms").insert({
                user_id: user_id.user_id,
                platform_id: platformId,
            });
        }
        // Assigning a variable for the org_id array
        const orgIds = req.body.org_id;
        // Iterate over each org_id and insert into user_organizations
        for (let iCount = 0; iCount < orgIds.length; iCount++) {
            const orgId = parseInt(orgIds[iCount]);
            await knex("user_organizations").insert({
                user_id: user_id.user_id,
                org_id: orgId,
            });
        }
        // insert into the survey table
        await knex("survey").insert({
            user_id: user_id.user_id,
            no_purpose: req.body.no_purpose,
            distracted_busy: req.body.distracted_busy,
            restless: req.body.restless,
            distracted_general: req.body.distracted_general,
            bothered_worried: req.body.bothered_worried,
            difficult_concentrate: req.body.difficult_concentrate,
            compare_people: req.body.compare_people,
            feeling_comparison: req.body.feeling_comparison,
            validation_social: req.body.validation_social,
            depressed_down: req.body.depressed_down,
            fluctuate_activities: req.body.fluctuate_activities,
            sleep_issues: req.body.sleep_issues,
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});