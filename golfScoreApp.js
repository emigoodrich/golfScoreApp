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
function getGolfCourseDetails(golfCourseId) {
    return fetch(
      `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
      //, { mode: "no-cors" }
    ).then(function (response) {
      return response.json();
    });
  }
//function for 
  function onCourseChange() {
    console.log('hello?')
    let x = 0;
  }
//makes the selection work
  async function go() {
    let courses = await getAvailableGolfCourses();

    let courseOptionsHtml = '';
    courses.forEach((course) => {
     courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });
    
    document.getElementById('course-select').innerHTML = courseOptionsHtml;    
  }

  go();
