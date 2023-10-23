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

//function for when the selection changes
  function onCourseChange() {
    let x = 0;
  }

  let courses = '';
  let teeBoxes = '';
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
  teeBoxes = await getGolfCourseDetails(golfCourseId);
  console.log(teeBoxes)
}
goAgain();
let selectedCourse = '';
  //finding the selected course 
function submitCourseSelect() {
   let x = document.getElementById('course-select').selectedIndex
   selectedCourse = courses[x]
   render();
}
function render() {
  //rendering in the title
  let courseTitle = '';
  courseTitle += `<div>${selectedCourse.name}</div>`
  document.getElementById('header').innerHTML = courseTitle
  //render in the table with information saved in it's own array and stuff
//   let teeBoxSelectHtml = ''
// teeBoxes.forEach(function (teeBox, index) {
//    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
//      teeBox.totalYards
//    } yards</option>`
// });

// document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
}