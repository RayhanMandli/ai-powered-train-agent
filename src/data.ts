type TrainRoute = {
    from: string;
    to: string;
    trains: { name: string; time: string; number: string }[];
}


export const trainRoutes: TrainRoute[] = [
    {
      from: "Ahmedabad",
      to: "Surat",
      trains: [
        { name: "Gujarat Superfast Express", time: "08:00 AM", number: "22953" },
        { name: "Saurashtra Express", time: "03:30 PM", number: "19217" },
      ],
    },
    {
      from: "Vadodara",
      to: "Rajkot",
      trains: [
        { name: "Sayajinagari Express", time: "06:00 AM", number: "19119" },
        { name: "Gujarat Express", time: "02:45 PM", number: "22953" },
      ],
    },
    {
      from: "Surat",
      to: "Bhuj",
      trains: [
        { name: "Kutch Express", time: "10:15 PM", number: "22955" },
        { name: "Bhuj Express", time: "04:20 AM", number: "19115" },
      ],
    },
    {
      from: "Junagadh",
      to: "Ahmedabad",
      trains: [
        { name: "Somnath Express", time: "07:00 AM", number: "22958" },
        { name: "Veraval Express", time: "05:45 PM", number: "19120" },
      ],
    },
    {
      from: "Bhavnagar",
      to: "Vadodara",
      trains: [
        { name: "Bhavnagar Express", time: "01:00 PM", number: "12972" },
        { name: "Saurashtra Mail", time: "10:30 PM", number: "22945" },
      ],
    },
  ];