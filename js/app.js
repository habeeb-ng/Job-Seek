document.querySelector(".button-container")
    .addEventListener("click", () => {
        let text = document.getElementById("filter-jobs").value;
        getJobs().then(jobs => {
            let filteredJobs = filterJobs(jobs, text);
            showJobs(filteredJobs);
        })
    })

    // a function that gets jobs
    //what this function does is to get data from an api with the use of fetch
    // in this case, the api is the data.json, which is accessed with the built in js fetch funtion
function getJobs() {
    return fetch("data.json") // promise
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return data;
    })
}

//create a funtion that filters ther job
function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.location.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            } else {
                return false;
            }
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}
function showJobs(jobs) {
    console.log(jobs);
    let jobsContainer = document.querySelector(".jobs-container"); // this is the entire element in the div element class job-container
    let jobsHTML = "";
    jobs.forEach(job => { //job is an array that we are looping through
        jobsHTML += `
        <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="job-logo">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="roleName">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>
                        ${job.requirements.content}
                    </span>
                </div>
                <div class="buttons">
                    <div class="button applyNow">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
        `
    });
    jobsContainer.innerHTML = jobsHTML
}


//the parameter in the .then after this function is called is a function
getJobs().then(data => { // the .then is done only when the promise is fulfilled
    showJobs(data);
});