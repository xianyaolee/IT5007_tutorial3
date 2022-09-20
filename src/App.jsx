//global constants
const MAX_SERIAL_NO = 199; //upper limit for serial number
const MIN_SERIAL_NO = 100; //lower limit for serial number
const MAX_CAPACITY = 10;

//JS variable to store traveller details. To be stored in React state.
const initialTravellers = [
  {
    name: 'Jack', phone: 88885555,
    bookingTime: new Date(), serialNo: 103,
  },
  {
    name: 'Rose', phone: 88884444,
    bookingTime: new Date(), serialNo: 104,
  },
];

//function to generate a random serial number in a defined range
function generateRandomSerialNo() {
  const serialNo = Math.floor(Math.random() * (MAX_SERIAL_NO-MIN_SERIAL_NO) + MIN_SERIAL_NO);
  return serialNo;
}

//function to check seats availability
function checkAvailability(bookings) {
  if (bookings.length >= MAX_CAPACITY) {
    alert("No more availability.")
    return 0;
  }
  else {return 1;}
}

//function to generate individual row of details for each traveller
function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  console.log("TravellerRow is called.")
  const traveller = props.traveller;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.serialNo}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

//to generate an image of empty seat
function EmptySeat() {
  return(
    <>
      <div className="greenSquare"></div>
    </>
  );
}

//to generate an image of booked seat
function BookedSeat() {
  return(
    <>
      <div className="greySquare"></div>
    </>
  );
}

//component for seat map
class SeatMap extends React.Component {
  constructor() {
    super();
  }
  render() {
    let seatMap = this.props.travellers.map(traveller => <BookedSeat key = {traveller.serialNo}/>);
    const capacity = this.props.capacity;
    const utility = seatMap.length;
    const availability = capacity - utility;
    for (let i = 0; i < availability; i++){
      seatMap.push(<EmptySeat key ={i}/>);
    }
    return(
      <>
        <DisplayFreeSeats travellers={this.props.travellers} capacity={this.props.capacity}/> 
        <div className="containerSquare">
        <h5 className="header">Seat Map</h5>
          {seatMap}
        </div>
      </>
    );
  }
}

//Component to display booking list
class DisplayTraveller extends React.Component {
  constructor() {
    super();
  }
  render() {
    const travellerRows = this.props.travellers.map(traveller => <TravellerRow key = {traveller.serialNo} traveller={traveller}/>);
    /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
    return (
        <>
          <div id="Display" className="tabcontent">
          <h4 className="tab-header">Display All Bookings</h4>
            <table className="table table-hover">
              <thead>
                <tr>
            {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
                  <th>Serial No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Booking Time</th>
                </tr>
              </thead>
              <tbody>
                {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
                {travellerRows}
              </tbody>
            </table>
          </div>
        </>
    );
  }
}

//function to display the number of available seats
function DisplayFreeSeats(props) {
  console.log("displaying availability..")
  const bookedSeats = props.travellers.length;
  console.log(`${bookedSeats} seats are taken.`);
  const capacity = props.capacity;
  return(
    <>
      <div className="tabcontent">
        <h4 className="tab-header">Welcome!</h4>
        <div>There are currently {capacity-bookedSeats} seats available.</div>
      </div> 
    </>
  )
}

//component to add a new booking
class AddTraveller extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const booking = {
      name: form.travellerName.value, phone: form.travellerPhoneNum.value,
    }
    this.props.bookTraveller(booking);
    form.travellerName.value = ''; form.travellerPhoneNum.value = '';
  }

  render() {
    return (
      <React.Fragment>
        <div id="Book" className="tabcontent">
          <h4 className="tab-header">New Booking</h4>
          <form name="addTraveller" onSubmit={this.handleSubmit}>
            {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}            
            <div className="form-group">
              <label htmlFor="nameField">Please enter your full name</label>
              <input type="text" className="form-control" id="nameField" name="travellerName" placeholder="Full Name" required/>
            </div><br />
            <div className="form-group">
              <label htmlFor="phoneField">Please enter your phone number</label>
              <input type="number" className="form-control" id="phoneField" name="travellerPhoneNum" placeholder="Phone Number" required/>
            </div><br />
            <button className="btn btn-primary">Add</button>
          </form>
        </div>

      </React.Fragment>
    );
  }
}

//component to delete a booking
class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const serialNoDel = form.serialNo.value;
    this.props.deleteTraveller(serialNoDel);
    form.serialNo.value = ''; 
  }

  render() {
    return (
      <React.Fragment>
        <div id="Cancel" className="tabcontent">
          <h4 className="tab-header">Booking Cancellation</h4>
          <form name="deleteTraveller" onSubmit={this.handleSubmit}>
          {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
            <div className="form-group">
              <label htmlFor="serialNoField">Please enter the serial number to be deleted</label>
              <input type="number" className="form-control" id="serialNoField" name="serialNo" placeholder="Serial Number" required/>
              <br />
              <button className="btn btn-primary">Delete</button>            
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

//main component of the website
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, capacity: MAX_CAPACITY,};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    const newTraveller = Object.assign({}, passenger);
    const idList = this.state.travellers.map(traveller => traveller.serialNo);
    const newTravellerList = this.state.travellers.slice();
    if (checkAvailability(newTravellerList)){
      let serialNo = generateRandomSerialNo();
      while (idList.includes(serialNo)){
        serialNo = generateRandomSerialNo();
        console.log(`${serialNo} is a duplicated serial no. To regenerate.`);
      }
      newTraveller.serialNo = serialNo;
      newTraveller.bookingTime = new Date();
      newTravellerList.push(newTraveller);
      this.setState({ travellers: newTravellerList});
      alert("Booking made")
    }
  }

  deleteTraveller(serialNo) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const newTravellerList = this.state.travellers.slice();
    for (const i in newTravellerList){
      if (newTravellerList[i].serialNo == serialNo){
        newTravellerList.splice(i,1);
        alert("Booking cancelled");
        console.log("Booking cancelled");
        this.setState({ travellers: newTravellerList});
        return;
      }
    }
    alert("Booking not found");
    console.log("Booking not found");
  }

  render() {
    const { Tabs, TabList, Tab, TabPanel } = ReactTabs;
    return (
      <React.Fragment>
        {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
        {/*Q3. Code to call component that Displays Travellers.*/}
        {/*Q4. Code to call the component that adds a traveller.*/}
        {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        <h3 className="header">Ticket To Ride</h3>
        <Tabs>
            <TabList>
              <Tab>Home</Tab>
              <Tab>New Booking</Tab>
              <Tab>Booking Cancellation</Tab>
              <Tab>Display All Bookings</Tab>
            </TabList>
            <TabPanel> 
              <SeatMap travellers={this.state.travellers} capacity={this.state.capacity}/>  
            </TabPanel>
            <TabPanel>
              <AddTraveller bookTraveller={this.bookTraveller} />
            </TabPanel>
            <TabPanel>
              <Delete deleteTraveller={this.deleteTraveller} />
            </TabPanel>
            <TabPanel>
              <DisplayTraveller travellers={this.state.travellers} />
            </TabPanel>
          </Tabs>
      </React.Fragment>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
