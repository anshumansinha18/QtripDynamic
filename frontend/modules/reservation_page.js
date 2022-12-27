import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
    try{
    const response = await fetch(`${config.backendEndpoint}/reservations`);
    const data = await response.json();
    console.log(data);
    return data;
    } catch(err){
      return null;
    }

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(!reservations.length){
     document.getElementById('no-reservation-banner').style.display = 'block';
     document.getElementById('reservation-table-parent').style.display = 'none';
  }
  else{
    document.getElementById('no-reservation-banner').style.display = 'none';
     document.getElementById('reservation-table-parent').style.display = 'block';
     const tbody = document.getElementById('reservation-table');

     reservations.forEach((ele) => {
          const trow = document.createElement('tr');
         
          const months = {
            '1': 'January',
            '2': 'Februrary',
            '3': 'March',
            '4': 'April',
            '5': 'May',
            '6': 'June',
            '7': 'July',
            '8': 'August',
            '9': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December'
          }

          
          
          let date = ele.date.split('-').reverse().join('/');
         
          let day = date.split('/')[0];
          let month = date.split('/')[1];
          let year = date.split('/')[2];


          if(day[0]==='0') day = day[1];
          if(month[0]==='0') month = month[1];

          
          date = `${day}/${month}/${year}`;
          const dateArray = date.split('/');
         
          const dateString = dateArray[0]-1 + " " + months[`${dateArray[1]}`] + " " + dateArray[2];
          const d = new Date(ele.time);
          const d1 = d.toLocaleDateString('en-IN');
          console.log(d1);
          let d1Array = d1.split('/');
          const dateString2 = d1Array[0] + " " + months[`${d1Array[1]}`] + " " + d1Array[2];
          
          const dateNTime = dateString2 + ", " + d.toLocaleTimeString("en-IN");
          console.log(dateNTime);
         
          trow.innerHTML = `
          
          <td scope="col"><strong>${ele.id}</strong></td>
          <td scope="col">${ele.name}</td>
          <td scope="col">${ele.adventureName}</td>
          <td scope="col">${ele.person}</td>
          <td scope="col">${date}</td>
          <td scope="col">${ele.price}</td>
          <td scope="col">${dateNTime}</td>
          <td scope="col" id = "${ele.id}"><a href="/frontend/pages/adventures/detail/?adventure=${ele.adventure}" class="reservation-visit-button">Visit Adventure</a></td>
          `;

          tbody.append(trow);
     })
  }



  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
