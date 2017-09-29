var projectsTotal, projects, projectHeight, projectFaith, projectLastActive;
var projectAngleSmall = 3, projectAngleBig = 6, projectFaithLimit = 767, projectVirgin = true;
function restrictedProjectDisplay(){
    $('.project').css("background-color","#333");
    $('.project').addClass("col-lg-4 col-md-4 col-sm-4 col-xs-12");
    $('.project').css("transform","scale(0.8,0.8)");
    $('.project').css("transform-origin","50% 50%");
}
function loadProjects(decision){
    // Ensure Odd number of cards
    if(masterWidth <= projectFaithLimit || decision == false){
        projectFaith = decision;
        restrictedProjectDisplay();return;
    }
    projectsTotal = $('.project').length;
    if(projectsTotal % 2 == 0){
        $(".projects").prepend("<div class='project' style='opacity:0;'></div>");
        projectsTotal++;
    }
    //Set up utility Variables
    projectHeight = $('.project0').height();
    var width = $('.project0').width();
    //Re-position the cards
    var marginBuffer = 100;
    $('.projects').css("height",(projectHeight + marginBuffer) + "px");
    $('.projects').css("padding-top",(marginBuffer/3) + "px");
    // Cluster & Spray cards
    projects = document.getElementsByClassName("project");
    sprayCards(projectAngleSmall);
}
function clusterCards(){
    for(var x = 0; x < projectsTotal;x++){
        projects[x].style.transform = "translateY(" + (projectHeight * x * -1) + "px) ";
    }
}
function sprayCards(deg){
    if(masterWidth <= projectFaithLimit || projectFaith == false)return;
    clusterCards();
    var mid = Math.floor(projectsTotal/2);
    for(var x = 1; x <= mid;x++){
        projects[mid + x].style.transform += "rotate(" + (-1 * deg * x) + "deg) ";
        projects[mid - x].style.transform += "rotate(" + (1 * deg * x) + "deg) ";
    }
    $('.project').css("transform-origin","100% 200%");
    $('.project').css("background-color","#333");
    if(deg == projectAngleBig)
        $('.project').css("transform-origin","200% 500%");
    else{
        projectLayover();
        $('.project').css("transform-origin","150% 150%");
    }
}
function projectLayover(){
    //decreasing z-index surround selected card
    if(projectLastActive == 0)
        for(var x = 0;x < projectsTotal;x++)
            projects[x].style.zIndex = parseInt($('.skills-section').css("z-index")) - x;
    else
        for(var x = 0;x < projectsTotal;x++)
            projects[x].style.zIndex = parseInt($('.skills-section').css("z-index")) + x;
}
function projectCardsHover(project, decision){
    //in card animation
    // https://codepen.io/ufukasia/pen/mgsrB
    if(decision == true){
        project.style.boxShadow = "0 0 10px #8AF3FF";
        $("#" + project.id + " .project-pager").addClass("project-pager-active fa-plus");
    }else{
        project.style.boxShadow = "";
        $("#" + project.id + " .project-pager").removeClass("project-pager-active fa-plus");
    }
    //Animations below depends on browser support
    if(masterWidth <= projectFaithLimit || projectFaith == false)return;
    if(decision == true){
        sprayCards(projectAngleBig);
        projectLastActive = project.id.substr(7);
        projectLayover();
        // high light selected card
        project.style.zIndex = "500";
    }
}
