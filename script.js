function filterData() {
  event.preventDefault();
  
  // Get the start and end date values from the input fields
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;

  // Convert the input dates to Date objects for comparison
  var startDateObj = new Date(startdate);
  var endDateObj = new Date(enddate);

  // Log the start and end dates for debugging purposes
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);

  // Get all the rows from the table
  var rows = document.querySelectorAll("#pitchTable tbody tr");

  // Loop through each row and hide or show it based on the date range
  rows.forEach(row => {
      var dateText = row.cells[1].textContent;  // Get the date from the second cell (index 1)
      var rowDateObj = new Date(dateText);      // Convert the row's date to a Date object

      // Check if the row's date is outside the range, and hide/show accordingly
      if (rowDateObj < startDateObj || rowDateObj > endDateObj) {
          row.style.display = "none";  // Hide the row
      } else {
          row.style.display = "";      // Show the row (empty string resets it)
      }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';
  const tableBody = document.querySelector('#pitchTable tbody');

  fetch(url)
      .then(response => response.json())
      .then(data => {
          data.forEach(pitch => {
              const row = document.createElement('tr');
              
              const pitchNo = `<td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>`;
              const date = `<td>${pitch.Date}</td>`;
              const time = `<td>${pitch.Time}</td>`;
              const batter = `<td>${pitch.Batter}</td>`;
              const balls = `<td>${pitch.Balls}</td>`;
              const strikes = `<td>${pitch.Strikes}</td>`;
              const outs = `<td>${pitch.Outs}</td>`;
              const pitchCall = `<td>${pitch.PitchCall}</td>`;
              const korBB = `<td>${pitch.KorBB || ''}</td>`;
              const relSpeed = `<td>${pitch.RelSpeed || ''}</td>`;
              const spinRate = `<td>${pitch.SpinRate || ''}</td>`;
              const spinAxis = `<td>${pitch.SpinAxis || ''}</td>`;

              row.innerHTML = pitchNo + date + time + batter + balls + strikes + outs + pitchCall + korBB + relSpeed + spinRate + spinAxis;
              tableBody.appendChild(row);
          });
      })
      .catch(error => console.error('Error fetching pitch data:', error));
});
