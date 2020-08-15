var a;
var projectName = document.querySelectorAll('[data-project-name]');
for (a = 0; a < projectName.length; a++) {
  console.log(projectName[a]);
  projectName[a].addEventListener('click', function(){
   var parent = this.parentElement;
   console.log(parent);
   parent.classList.toggle('stephany__project_active');
  });
}

// var b;
// var projectDesc = document.querySelectorAll('[data-project-desc]');
// for (b = 0; b < cars.length; b++) {
//   text += cars[i] + "<br>";
// }