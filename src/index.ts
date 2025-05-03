import { GoogleGenAI, Type } from "@google/genai";
import readline from "readline";
import "dotenv/config";   
import {
  getBookedTicketDetailsFunction,
  getCurrentTimeAndDateFunction,
  trainBookingFunction,
  getTrainsBetweenStationsFunction,
} from "./controllers/functionDefinitions";


//variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



// --- Function Declarations ---
const trainBookingFunctionDeclaration: object = {
  name: "train_booking",
  description: "Book a train ticket.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      fromStation: {
        type: Type.STRING,
        description: "The starting station.",
      },
      toStation: {
        type: Type.STRING,
        description: "The destination station.",
      },
      trainNumber: {
        type: Type.STRING,
        description: "The train number.",
      },
      date: {
        type: Type.STRING,
        description: "The date of travel.",
      },
      time: {
        type: Type.STRING,
        description: "The time of travel.",
      },
    },
    required: ["fromStation", "toStation", "trainNumber", "date", "time"],
  },
};  

const getBookedTicketDetailsFunctionDeclaration: object = {
  name: "get_booked_ticket_details",
  description: "Get details of a booked ticket.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      pnr: {
        type: Type.STRING,
        description: "The PNR of the ticket.",
      },
    },
    required: ["pnr"],
  },
};

const getCurrentTimeAndDateFunctionDeclaration: object = {
  name: "get_current_time_and_date",
  description: "Gives the current time and date.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      dateAndTime: {
        type: Type.STRING,
        description: "The current time and date.",
      },
    },
    required: ["dateAndTime"],
  },
};

const getTrainsBetweenStationsFunctionDeclaration: object = {
  name: "get_trains_between_stations",
  description: "Get trains between two stations.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      fromStation: {
        type: Type.STRING,
        description: "The starting station.",
      },
      toStation: {
        type: Type.STRING,
        description: "The destination station.",
      },
    },
    required: ["fromStation", "toStation"],
  },
};




// --- Config ---
const config = {
  tools: [
    {
      functionDeclarations: [
        getCurrentTimeAndDateFunctionDeclaration,
        getTrainsBetweenStationsFunctionDeclaration,
        trainBookingFunctionDeclaration,
        getBookedTicketDetailsFunctionDeclaration,
      ],
    },
  ],
  systemInstruction:
    "You are a train booking agent for Gujarat. Help users with train schedules, bookings, and time queries. You may call tools to answer properly.",
  temperature: 0.7,
};

const contents = [
  { role: "model", parts: [{ text: "Hi! I'm your Gujarat Train Assistant. How can I help you?" }] },
];

async function handleUserInput(input: string) {
  contents.push({ role: "user", parts: [{ text: input }] });

  const chat = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents,
    config,
  });

  const tool_call = chat.functionCalls?.[0];
  const tool_call_name = tool_call?.name;
  const tool_call_args = JSON.stringify(tool_call?.args);

  let result;

  if (tool_call && tool_call.name === "get_current_time_and_date") {
    result = await getCurrentTimeAndDateFunction();
  } else if (tool_call && tool_call.name === "get_trains_between_stations") {
    result = await getTrainsBetweenStationsFunction(tool_call_args);
  } else if (tool_call && tool_call.name === "train_booking") {
    result = await trainBookingFunction(tool_call_args);
  } else if (tool_call && tool_call.name === "get_booked_ticket_details") {
    result = await getBookedTicketDetailsFunction(tool_call_args);
  }

  if (tool_call && result) {
    const function_response_part = {
      name: tool_call.name,
      response: { result },
    };

    contents.push({
      role: "model",
      parts: [{ text: JSON.stringify({ functionCall: tool_call }) }],
    });

    contents.push({
      role: "user",
      parts: [{ text: JSON.stringify({ functionResponse: function_response_part }) }],
    });

    const final_response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
      config,
    });

    contents.push({ role: "model", parts: [{ text: final_response.text! }] });
    console.log(`🤖 ${final_response.text}`);
  } else {
    contents.push({ role: "model", parts: [{ text: chat.text! }] });
    console.log(`🤖 ${chat.text}`);
  }
}

function startChatLoop() {
  console.log("💬 Welcome to Gujarat Train Assistant! Type 'exit' to quit.\n");
  console.log("🤖 Hi! I'm your Gujarat Train Assistant. How can I help you?");

  rl.prompt();

  rl.on("line", async (line) => {
    const input = line.trim();
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    await handleUserInput(input);
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("👋 Goodbye!");
    process.exit(0);
  });
}

startChatLoop();
