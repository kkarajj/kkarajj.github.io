function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var startdate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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
