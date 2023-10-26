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
  let playerChoices = [{id: 1, name: "1 Player"}, {id: 2, name: "2 Players"}, {id: 3, name: "3 Players"}, {id: 4, name: "4 Players"}]
  let playerAmount;
  let holeAmount;
  let selectedTee;
  let rowOne = ["Holes"];
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
//loads the data after a golf course is chosen 
async function goAgain() {
  allOfDetails = await getGolfCourseDetails(selectedCourse.id);
  holes = allOfDetails.holes
  holeOptions()
  }


let selectedCourse = '';
  //finding the selected course 
function submitCourseSelect() {
   let x = document.getElementById('course-select').selectedIndex
   selectedCourse = courses[x]
   if (holeAmount) {
    //everything equals nothing??? or local storage ughhh
   }
   goAgain();
   render();
}
//creating the buttons
function holeOptions() {
  var holeChoicesHTML = '';
  holeChoices.forEach((choice) => {
    holeChoicesHTML += `<div class="holeOptionClass" id="holeOption${choice.id}" onclick="holeNumberSelection(${choice.id})">${choice.name}</div>`
  })
  document.getElementById('holeOptions').innerHTML = holeChoicesHTML;
  
} 
//making the 9 or 18 holes buttons work
function holeNumberSelection(id) {
  if (id === 1) {
    holeAmount = 10;
  } else if (id === 2) {
    holeAmount = 19;
  } else {
    console.log('idk what went wrong, oopsies')
  }
  for(let i=1; i < holeAmount; i++) {
    rowOne[i] = i
  }
  console.log(rowOne)
 document.getElementById(`holeOption${id}`).className = 'chosenOptionClass'
 playerOptions()
}
//how many players buttons
function playerOptions() {
  var playerChoicesHTML = '';
  playerChoices.forEach((players) => {
    playerChoicesHTML += `<div class="playerOptionClass" id="player${players.id}" onclick="playerAmountSelection(${players.id})">${players.name}</div>`
  })
  document.getElementById('playerOptions').innerHTML = playerChoicesHTML;
}
//how many players rendering
function playerAmountSelection(id) {
  playerAmount = id;
  //console.log(playerAmount + 3) it's a number!!!
  document.getElementById(`player${id}`).className = 'chosenOptionClass'
  noClue()
}
//which tee button
function noClue() {
  holes.length = holeAmount;
  for (let i = 0; i < holeAmount; i++) {
    teeBoxes = holes[i].teeBoxes
    var teeBoxSelectHtml = ''
    teeBoxes.forEach(function (teeBox) {
    teeBoxSelectHtml += `<option class="teeBoxOptionClass" id="teeBoxOption${teeBox.teeTypeId}" onclick="choosingTee(${teeBox.teeTypeId})">${teeBox.teeType.toUpperCase()}, ${
    teeBox.yards
    } yards</option>`
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  })}
}
//tee button click 
function choosingTee(teeTypeId) {
document.getElementById('theOptions').innerHTML = '';
selectedTee = teeBoxes.find(t => t.teeTypeId === teeTypeId);
render();
}

//make restart button that appears with the players after choosing a hole so they can choose if they want to
//and then make a confirm button after the yards have been chosen
//bringing together the three introduction buttons 

//maybe if i have time actually
function userOptions() {

}
//rendering :thumb:
function render() {
  //rendering in the title
  let courseTitle = '';
  courseTitle += `<div>${selectedCourse.name}</div>`
  document.getElementById('header').innerHTML = courseTitle
  //rendering the table with everything *ugh*
  if (selectedTee) {
    let table = '';
    rowOne.forEach((holes) =>
    {
      table += `<div>${holes}</div>`
    })
  document.getElementById('theTable').innerHTML = table
}}