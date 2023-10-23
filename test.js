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

  const backsecondRowLastCell = yardageRow1018.insertCell(-1);
  backsecondRowLastCell.textContent = totalYards10To18;

  const backthirdRowLastCell = parRow1018.insertCell(-1);
  backthirdRowLastCell.textContent = totalPars10To18;

  const backfourthRowLastCell = handicapRow1018.insertCell(-1);
  backfourthRowLastCell.textContent;
  }
  

// function to add a new player row
function addPlayerRow(playerName) {
  // Create a new row for the player in backnine table
  const backNinePlayerRow = holes1018Table.insertRow(-1);
  const backNinePlayerNameCell = backNinePlayerRow.insertCell(0);
  backNinePlayerNameCell.textContent = playerName;

  // Create a new row for the player in scorecardTable
  const playerRow = scorecardTable.insertRow(-1);
  const playerNameCell = playerRow.insertCell(0);
  playerNameCell.textContent = playerName;

  // Create 9 empty cells for player scores in both tables
  for (let i = 1; i <= 9; i++) {
    const backNinePlayerScoreCell = backNinePlayerRow.insertCell(i);
    backNinePlayerScoreCell.textContent = ''; // Empty content

    const playerScoreCell = playerRow.insertCell(i);
    playerScoreCell.textContent = ''; // Empty content
  }
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



/*// Get references to your tables
const table1 = document.getElementById("scorecardTable"); // Replace "table1" with the actual ID of your table
const table2 = document.getElementById("backnine"); // Replace "table2" with the actual ID of your table

// Get all the buttons with the "addRowsButton" id
const buttons = document.querySelectorAll("#addRowsButton");

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const numRowsToAdd = parseInt(button.getAttribute("data-rows"), 10);
    
    // Add rows to the first table
    for (let i = 0; i < numRowsToAdd; i++) {
      const newRow = table1.insertRow(-1);
      const cell = newRow.insertCell(0);
      cell.textContent = `Player ${i + 1}`;
    }
    
    // Add rows to the second table (if needed)
    for (let i = 0; i < numRowsToAdd; i++) {
      const newRow = table2.insertRow(-1);
      const cell = newRow.insertCell(0);
      cell.textContent = `Player ${i + 1}`;
    }
  });
});*/

/*// Get references to your tables
const table1 = document.getElementById("scorecardTable"); // Replace "table1" with the actual ID of your table
const table2 = document.getElementById("backnine"); // Replace "table2" with the actual ID of your table

// Initialize the currently selected button
let currentButton = document.getElementById("addRowsButton1"); // Default to the first button

// Function to clear the rows in a table
function clearTableRows(table) {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

// Add a click event listener to each button
document.querySelectorAll("[id^='addRowsButton']").forEach(button => {
  button.addEventListener("click", () => {
    const numRowsToAdd = parseInt(button.getAttribute("data-rows"), 10);
    
    // Check if the selected button is different from the previously selected button
    if (button !== currentButton) {
      currentButton = button; // Update the currently selected button
      clearTableRows(table1); // Clear the rows in the first table
      clearTableRows(table2); // Clear the rows in the second table (if needed)
    }
    
    // Add new rows to the first table
    for (let i = 0; i < numRowsToAdd; i++) {
      const newRow = table1.insertRow(-1);
      const cell = newRow.insertCell(0);
      cell.textContent = `Row ${i + 1}`;
    }
    
    // Add new rows to the second table (if needed)
    for (let i = 0; i < numRowsToAdd; i++) {
      const newRow = table2.insertRow(-1);
      const cell = newRow.insertCell(0);
      cell.textContent = `Row ${i + 1}`;
    }
  });
});*/