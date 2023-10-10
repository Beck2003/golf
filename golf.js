function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/')
      .then(function (response) {
      return response.json();
      })
      .then(function (courses) {
        // You can access individual courses and their information here
        for (const course of courses) {
          console.log(course.name); // Print the name of each course
          console.log(course.city); // Print the city of each course
        }
      })
      .catch(function (error) {
        console.error('Error fetching golf courses:', error);
      });
}
courses = [
  {
    "id": 11819,
    "name": "Thanksgiving Point Golf Course - Lehi, UT",
    "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json"
  },
  {
    "id": 18300,
    "name": "Fox Hollow Golf Course - American Fork, UT",
    "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course18300.json"
  },
  {
    "id": 19002,
    "name": "Spanish Oaks Golf Course - Spanish Fork, UT",
    "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course19002.json"
  }
];

let courseOptionsHtml = '';
courses.forEach((course) => {
 courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});
document.getElementById('course-select').innerHTML = courseOptionsHtml;




/*
const courseSelect = document.getElementById('course-select');

courseSelect.addEventListener('change', function () {
  const selectedCourseId = courseSelect.value; // Get the selected course ID

  // Call a function to fetch tee box information for the selected course
  fetchTeeBoxInformation(selectedCourseId);
});

function fetchTeeBoxInformation(selectedCourseId) {
  // Make a request to the API with the selected course ID
  fetch(`https://golf-courses-api.herokuapp.com/courses/${selectedCourseId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (courseData) {
      const teeBoxes = courseData.data.holes[0].teeBoxes; // Assuming teeBoxes is an array
    })
    .catch(function (error) {
      console.error('Error fetching tee box information:', error);
    });
}

let teeBoxSelectHtml = '';

teeBoxes.forEach(function (teeBox, index) {
  teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
    teeBox.totalYards
  } yards</option>`;
});

// Set the innerHTML of the tee box select element
document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;*/