//get name, url, and id
async function getAvailableGolfCourses() {
    return await fetch(
      "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
      //, { mode: "no-cors" }
    ).then(async function (response) {
      return await response.json();
    });
  }

//get golf course details
async function getGolfCourseDetails(golfCourseId) {
    return await fetch(
      `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
      //, { mode: "no-cors" }
    ).then(async function (response) {
      return await response.json();
    });
  }
//all definitions
  let courses = '';
  let allOfDetails = '';
  let teeBoxes = '';
  let holes = '';
  let holeChoices = [{id: 1, name: "9 Holes"}, {id: 2, name: "18 Holes"}]
  let holeAmount;
//makes the selection work
  async function go() {
    courses = await getAvailableGolfCourses(); 
    let courseOptionsHtml = '';
    courses.forEach((course) => {
     courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });
    console.log()
    document.getElementById('course-select').innerHTML = courseOptionsHtml;    
    }
  
go();

async function goAgain() {
  allOfDetails = await getGolfCourseDetails(selectedCourse.id);
  holes = allOfDetails.holes
  holeOptions()
  }
function noClue() {
  holes.length = holeAmount;
  for (let i = 0; i < holeAmount; i++) {
    teeBoxes = holes[i].teeBoxes
  let teeBoxSelectHtml = ''
    teeBoxes.forEach(function (teeBox, index) {
    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
    teeBox.yards
    } yards</option>`
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  })}
}

let selectedCourse = '';
  //finding the selected course 
function submitCourseSelect() {
   let x = document.getElementById('course-select').selectedIndex
   selectedCourse = courses[x]
   goAgain();
   render();
}
function holeOptions() {
  let holeChoicesHTML = '';
  holeChoices.forEach((choice) => {
    holeChoicesHTML += `<div class="holeOptionClass" onclick="holeNumberSelection(${choice.id})">${choice.name}</div>`
  })
  document.getElementById('holeOptions').innerHTML = holeChoicesHTML;
}
function holeNumberSelection(id) {
  if (id === 1) {
    holeAmount = 9;
  } else if (id === 2) {
    holeAmount = 18;
  } else {
    console.log('idk what went wrong, oopsies')
  }
  document.getElementById('holeOptions').innerHTML = '';
  noClue()
}
function render() {
  //rendering in the title
  let courseTitle = '';
  courseTitle += `<div>${selectedCourse.name}</div>`
  document.getElementById('header').innerHTML = courseTitle
  //render in the table with information saved in it's own array and stuf
}//i don't really understand *how* the table is supposed to be created