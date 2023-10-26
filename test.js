/*fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json")
.then(response => {
if (!response.ok) {
throw new Error(`Unable to retrieve golf courses. Status code: ${response.status}`);
}
return response.json();
})
.then(data => {
data.forEach(course => {
const option = document.createElement("option");
option.value = course.id;
option.textContent = course.name;
courseSelect.appendChild(option);
});

courseSelect.addEventListener("change", function () {
const courseId = this.value;
const selectedCourse = data.find(course => course.id === Number(courseId));
if (selectedCourse) {
fetch(selectedCourse.url)
  .then(response => {
      if (!response.ok) {
          throw new Error(`Unable to retrieve course details. Status code: ${response.status}`);
      }
      return response.json();
  })
  .then(courseDetails => {
      const totalYardsByTeeType = {};
      courseDetails.holes.forEach(hole => {
          hole.teeBoxes.forEach(teeBox => {
              const teeType = teeBox.teeType;
              const yards = teeBox.yards;
              if (!totalYardsByTeeType[teeType]) {
                  totalYardsByTeeType[teeType] = 0;
              }
              totalYardsByTeeType[teeType] += yards;
          });
      });

      teeBoxSelect.innerHTML = '';
      for (const teeType in totalYardsByTeeType) {
          const option = document.createElement("option");
          option.value = teeType;
          option.textContent = `${teeType} - ${totalYardsByTeeType[teeType]} yards`;
          teeBoxSelect.appendChild(option);
      }

      // Add an event listener for teeType selection
      teeBoxSelect.addEventListener("change", function () {
          const selectedTeeType = this.value;
          populateScorecard(courseDetails, selectedTeeType);
      });
  })
  .catch(error => console.error('Error fetching course details:', error));
}
});
});*/

const courseSelect = document.getElementById("courseSelect");
const teeBoxSelect = document.getElementById("teeBoxSelect");
const scorecardTable = document.getElementById("scorecardTable");
const holes1018Table = document.getElementById("backnine");

function populateScorecard(courseDetails, selectedTeeType) {
    scorecardTable.innerHTML = '';
    const holes = courseDetails.holes;
  
    // Create a header row with 20 columns
    const headerRow = scorecardTable.insertRow(-1);
    const headerCell = headerRow.insertCell(0);
    headerCell.textContent = "Hole";

    headerRow.classList.add("header-row");
  
    for (let i = 1; i <= 9; i++) {
      const cell = headerRow.insertCell(-1);
      cell.textContent = i;
    }
  
    // Create a Yardage row with 20 columns
    const yardageRow = scorecardTable.insertRow(-1);
    const yardageCell = yardageRow.insertCell(0);
    yardageCell.textContent = "Yardage";
  
    for (let i = 0; i < 9; i++) {
      const hole = holes[i];
      const teeBox = hole.teeBoxes.find(tee => tee.teeType === selectedTeeType);
      const cell = yardageRow.insertCell(-1);
      cell.textContent = teeBox ? teeBox.yards : 'N/A';
    }
  
    // Create a Par row with 20 columns
    const parRow = scorecardTable.insertRow(-1);
    const parCell = parRow.insertCell(0);
    parCell.textContent = "Par";
  
    for (let i = 0; i < 9; i++) {
      const hole = holes[i];
      const teeBox = hole.teeBoxes.find(tee => tee.teeType === selectedTeeType);
      const cell = parRow.insertCell(-1);
      cell.textContent = teeBox ? teeBox.par : 'N/A';
    }
  
    // Create a Handicap row with 20 columns (Replace 'N/A' with actual handicap data)
    const handicapRow = scorecardTable.insertRow(-1);
    const handicapCell = handicapRow.insertCell(0);
    handicapCell.textContent = "Handicap";
  
    for (let i = 0; i < 9; i++) {
        const hole = holes[i];
        const teeBox = hole.teeBoxes.find(tee => tee.teeType === selectedTeeType);
        const cell = handicapRow.insertCell(-1);
        cell.textContent = teeBox ? teeBox.hcp : 'N/A';
    }

  // Create or update a new table for holes 10-18
  //let holes1018Table = document.getElementById("backnine");
  if (!holes1018Table) {
    holes1018Table = document.createElement("table");
    holes1018Table.id = "backnine";
    holes1018Table.classList.add("holes1018-table");
  } else {
    // Clear existing content
    while (holes1018Table.rows.length > 0) {
      holes1018Table.deleteRow(0);
    }
  }

  const holes1018TableHeader = holes1018Table.insertRow(-1);
  holes1018TableHeader.insertCell(0).textContent = "Hole";

  holes1018TableHeader.classList.add("header-row");
  
  const yardageRow1018 = holes1018Table.insertRow(-1);
  yardageRow1018.insertCell(0).textContent = "Yardage";
  const parRow1018 = holes1018Table.insertRow(-1);
  parRow1018.insertCell(0).textContent = "Par";
  const handicapRow1018 = holes1018Table.insertRow(-1);
  handicapRow1018.insertCell(0).textContent = "Handicap";

  for (let i = 9; i < 18; i++) {
    const hole = holes[i];
    const teeBox = hole.teeBoxes.find(tee => tee.teeType === selectedTeeType);
    holes1018TableHeader.insertCell(-1).textContent = i + 1;
    yardageRow1018.insertCell(-1).textContent = teeBox ? teeBox.yards : 'N/A';
    parRow1018.insertCell(-1).textContent = teeBox ? teeBox.par : 'N/A';
    handicapRow1018.insertCell(-1).textContent = teeBox ? teeBox.hcp : 'N/A';
  }

    // Add <td> elements for "Out", total yards, and total handicaps
  const firstRowLastCell = headerRow.insertCell(-1);
  firstRowLastCell.textContent = "Out";

  const totalYards1To9 = Array.from(yardageRow.cells).slice(1, 10).reduce(
    (acc, cell) => acc + Number(cell.textContent) || 0,
    0
  );
  const secondRowLastCell = yardageRow.insertCell(-1);
  secondRowLastCell.textContent = totalYards1To9;

  const totalPars1To9 = Array.from(parRow.cells).slice(1, 10).reduce(
    (acc, cell) => acc + Number(cell.textContent) || 0,
    0
  );
  const thirdRowLastCell = parRow.insertCell(-1);
  thirdRowLastCell.textContent = totalPars1To9;

  const fourthRowLastCell = handicapRow.insertCell(-1);
  fourthRowLastCell.textContent;

  // Calculate the total yards for holes 10-18
  const totalYards10To18 = Array.from(yardageRow1018.cells).slice(1, 10).reduce(
    (acc, cell) => acc + Number(cell.textContent) || 0,
    0
  );

  // Calculate the total pars for holes 10-18
  const totalPars10To18 = Array.from(parRow1018.cells).slice(1, 10).reduce(
    (acc, cell) => acc + Number(cell.textContent) || 0,
    0
  );

  // Add <td> elements for "Out," total yards, and total pars
  const backfirstRowLastCell = holes1018TableHeader.insertCell(-1);
  backfirstRowLastCell.textContent = "In";

  const backfirstRowTotalCell = holes1018TableHeader.insertCell(-1);
  backfirstRowTotalCell.textContent = "Total";

  const backsecondRowLastCell = yardageRow1018.insertCell(-1);
  backsecondRowLastCell.textContent = totalYards10To18;

  const backsecondRowTotalCell = yardageRow1018.insertCell(-1);
  backsecondRowTotalCell.textContent = totalYards1To9 + totalYards10To18;

  const backthirdRowLastCell = parRow1018.insertCell(-1);
  backthirdRowLastCell.textContent = totalPars10To18;

  const backthirdRowTotalCell = parRow1018.insertCell(-1);
  backthirdRowTotalCell.textContent = totalPars1To9 + totalPars10To18;

  const backfourthRowLastCell = handicapRow1018.insertCell(-1);
  backfourthRowLastCell.textContent;

  const backfourthRowTotalCell = handicapRow1018.insertCell(-1);
  backfourthRowTotalCell.textContent;
}
  
class Player {
  constructor(name, id, scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
    this.allColumnsFilled = false;
  }
}
 
const players = [];

// function to add a new player row
function addPlayerRow(playerName) {
  const player = new Player(playerName, players.length + 1, Array(18).fill(0));
  players.push(player);
  // Create a new row for the player in backnine table
  const backNinePlayerRow = holes1018Table.insertRow(-1);
  const backNinePlayerNameCell = backNinePlayerRow.insertCell(0);
  backNinePlayerNameCell.textContent = playerName;

  const backPlayerRowLastCell = backNinePlayerRow.insertCell(-1);
  backPlayerRowLastCell.textContent;

  const backPlayerRowTotalCell = backNinePlayerRow.insertCell(-1);
  backPlayerRowTotalCell.textContent;

  // Create a new row for the player in scorecardTable
  const playerRow = scorecardTable.insertRow(-1);
  const playerNameCell = playerRow.insertCell(0);
  playerNameCell.textContent = playerName;

  const PlayerRowLastCell = playerRow.insertCell(-1);
  PlayerRowLastCell.textContent;

  // Create 9 empty cells for player scores in both tables
  for (let i = 1; i <= 9; i++) {
    const backNinePlayerScoreCell = backNinePlayerRow.insertCell(i);
    //backNinePlayerScoreCell.textContent = ''; // Empty content
    backNinePlayerScoreCell.textContent = i <= 9 ? '' : 'Total'; // Empty content, except for the last cell

    const playerScoreCell = playerRow.insertCell(i);
    //playerScoreCell.textContent = ''; // Empty content
    playerScoreCell.textContent = i <= 9 ? '' : 'Total'; // Empty content, except for the last cell
  }
  //updatePlayerScores(playerName);
}
// Add an event listener for the "Add Player" button
const addPlayerButton = document.getElementById("addPlayerButton");
addPlayerButton.addEventListener("click", function () {
  const playerNameInput = document.getElementById("playerNameInput");
  const playerName = playerNameInput.value.trim();
  
  if (playerName) {
    addPlayerRow(playerName);
    playerNameInput.value = ''; // Clear the input field
  } else {
    alert("Please enter a valid player name.");
  }
});




// Function to handle cell click and enable editing
function enableEditing(cell) {
  // Create an input element
  const input = document.createElement("input");
  input.type = "text";
  input.value = cell.textContent;

  // Replace the cell's content with the input element
  cell.innerHTML = '';
  cell.appendChild(input);

  // Focus on the input
  input.focus();

  // Add an event listener to the input for the "Enter" key press
  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      //cell.textContent = input.value;
      const scorevalue = input.value;
      cell.textContent = scorevalue;
      updatePlayerScores(cell, scorevalue);
    }
  });

  // Remove the input element when it loses focus
  input.addEventListener("blur", function () {
    //cell.textContent = input.value;
    const scorevalue = input.value;
    cell.textContent = scorevalue;
    updatePlayerScores(cell, scorevalue);
  });
}

// Use event delegation to handle clicks on player cells in both tables
document.getElementById("scorecardTable").addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "TD") {
    enableEditing(target);
  }
});

document.getElementById("backnine").addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "TD") {
    enableEditing(target);
  }
});




function updatePlayerScores(cell, scorevalue) {
  const rowIndex = cell.parentElement.rowIndex;
  const playerIndex = rowIndex - 4; // Adjust for the header row
  const player = players[playerIndex];
  const trimmedValue = scorevalue.trim();

  if (trimmedValue === "") {
    cell.textContent = "";
    return; // Skip empty cells
  }

  if (!isNaN(trimmedValue)) {
    const score = parseInt(trimmedValue, 10) || 0;

    // Determine which table the cell belongs to
    const table = cell.closest('table');
    const isBackNine = table.classList.contains('backnine-table'); // Assuming you have a class for the backnine table

    // Calculate the correct index for the player's scores array
    let scoresArrayIndex;

    if (isBackNine) {
      scoresArrayIndex = 9 + cell.cellIndex; // Adjust for zero-based indexing and add 9 for backnine
    } else {
      scoresArrayIndex = cell.cellIndex; // Frontnine
    }

    player.scores[scoresArrayIndex - 1] = score;

    // Calculate and update the total score for the player
    const totalScore1To9 = player.scores.slice(0, 9).reduce((total, score) => total + score, 0);
    const totalScore10To18 = player.scores.slice(9, 18).reduce((total, score) => total + score, 0);

    // Update the second to last cell of the player's row with the total backnine score
    const playerRow = cell.parentElement;
    const totalCellBackNine = playerRow.cells[playerRow.cells.length - 2];
    totalCellBackNine.textContent = totalScore10To18;

    // Calculate and update the total score combining frontnine and backnine
    const totalScoreCombined = totalScore1To9 + totalScore10To18;

    // Update the last cell of the player's row with the combined total score
    const totalCellCombined = playerRow.cells[playerRow.cells.length - 1];
    totalCellCombined.textContent = totalScoreCombined;
  
    if (isScoresArrayFilled(player.scores)) {
      // Display a success message using Toastr
      //const allScoresFilled = player.scores.every(score => !isNaN(score));

      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "escapeHtml": false
      }
      toastr.success(`${player.name}, you are (L)PGA Tour material`, "success");
    }
  
    // Debugging: Log the player and updated scores
    console.log("Player:", player);
    console.log("Updated Scores:", player.scores);

  } else {
    // If the input is not a number, keep the cell empty
    cell.textContent = "";
  }
}

function isScoresArrayFilled(scoresArray) {
  return scoresArray.every(score => !isNaN(score) && score !== null);
}


fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json")
.then(response => {
if (!response.ok) {
throw new Error(`Unable to retrieve golf courses. Status code: ${response.status}`);
}
return response.json();
})
.then(data => {
data.forEach(course => {
const option = document.createElement("option");
option.value = course.id;
option.textContent = course.name;
courseSelect.appendChild(option);
});

courseSelect.addEventListener("change", function () {
const courseId = this.value;
const selectedCourse = data.find(course => course.id === Number(courseId));
if (selectedCourse) {
fetch(selectedCourse.url)
  .then(response => {
      if (!response.ok) {
          throw new Error(`Unable to retrieve course details. Status code: ${response.status}`);
      }
      return response.json();
  })
  .then(courseDetails => {
      const totalYardsByTeeType = {};
      courseDetails.holes.forEach(hole => {
          hole.teeBoxes.forEach(teeBox => {
              const teeType = teeBox.teeType;
              const yards = teeBox.yards;
              if (!totalYardsByTeeType[teeType]) {
                  totalYardsByTeeType[teeType] = 0;
              }
              totalYardsByTeeType[teeType] += yards;
          });
      });

      teeBoxSelect.innerHTML = '';
      for (const teeType in totalYardsByTeeType) {
          const option = document.createElement("option");
          option.value = teeType;
          option.textContent = `${teeType} - ${totalYardsByTeeType[teeType]} yards`;
          teeBoxSelect.appendChild(option);
      }

      // Add an event listener for teeType selection
      teeBoxSelect.addEventListener("change", function () {
          const selectedTeeType = this.value;
          populateScorecard(courseDetails, selectedTeeType);
      });
  })
  .catch(error => console.error('Error fetching course details:', error));
}
});
});