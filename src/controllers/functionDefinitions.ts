import { trainRoutes } from "../data";

const bookedTickets: Array<{
    pnr: string;
    from: string;
    to: string;
    trainNumber: string;
    time: string;
    date: string;
  }> = [];

export const getBookedTicketDetailsFunction = async (args: string) => {


    const { pnr } = JSON.parse(args);
    // Simulate fetching ticket details from a database or API
  
    const ticketDetails = bookedTickets.find((ticket) => ticket.pnr === pnr);
    if (!ticketDetails) return `No ticket found with PNR ${pnr}.`;
  
    return `Ticket Details: \nPNR: ${ticketDetails.pnr} \nFrom: ${ticketDetails.from} \nTo: ${ticketDetails.to} \nTrain Number: ${ticketDetails.trainNumber} \nDate: ${ticketDetails.date} \nTime: ${ticketDetails.time}`;
  
  };
  
  
  export const getCurrentTimeAndDateFunction = async () => {
    const date = new Date();
    const dateAndTime = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return { dateAndTime };
  };
  
  export const trainBookingFunction = async (args: string) => {
    const { fromStation, toStation, trainNumber, date, time } = JSON.parse(args);
  
    let pnr = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  
    bookedTickets.push({
      pnr,
      from: fromStation,
      to: toStation,
      trainNumber,
      time,
      date,
    });
  
  
    return `Ticket booked from ${fromStation} to ${toStation} on ${date} at ${time} for train number ${trainNumber}. Your PNR is ${pnr}.`;
  };
  
  export const getTrainsBetweenStationsFunction = async (args: string) => {
    const { fromStation, toStation } = JSON.parse(args);
  
    
  
    const route = trainRoutes.find(
      (r) =>
        r.from.toLowerCase() === fromStation.toLowerCase() &&
        r.to.toLowerCase() === toStation.toLowerCase()
    );
  
    if (!route) return `No trains found from ${fromStation} to ${toStation}.`;
  
    return route.trains.map((t) => `${t.name} (${t.number}) at ${t.time}`);
  };