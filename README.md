
# 🚄 Gemini-Powered Train Booking Assistant

This is a simple Node.js command-line chatbot that uses **Google Gemini's Function Calling** to simulate a **train booking agent**. It helps users:

- 🧭 Find trains between two stations
- 📅 Check current time and date
- 🎟️ Book tickets (with PNR generation)
- 🔍 Retrieve ticket details using PNR

---

## 💡 Features

- 🌟 Gemini 2.0 Function Calling
- 🔁 Stateful Chat Experience
- 📦 Dummy Data for Gujarat City Routes
- 🎫 PNR-based Ticket Booking and Retrieval
- 🧪 Local Mock of Train Data (No external API)

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Google Generative AI (Gemini API)](https://ai.google.dev/)
- [TypeScript types via `@google/genai`](https://www.npmjs.com/package/@google/genai)
- `readline` for command-line interaction
- `.env` for secure API key management

---

## 🚀 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/train-booking-bot.git
cd train-booking-bot
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set your Gemini API key

Create a `.env` file:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Start the chatbot

```bash
node index.js
```

---

## 💬 Example Chat Flow

```text
💬 Welcome to The Train Booking Chatbot! Type 'exit' to end.

👤 User: Find me trains from Ahmedabad to Surat
🤖 Gemini: Sure! Here are the trains:
- Gujarat Superfast Express (22953) at 08:00 AM
- Saurashtra Express (19217) at 03:30 PM

👤 User: Book a ticket on Gujarat Superfast Express
🤖 Gemini: Ticket booked! Your PNR is **PNR345812**

👤 User: Show my ticket with PNR345812
🤖 Gemini: Here's your ticket:
- Train: Gujarat Superfast Express
- From: Ahmedabad
- To: Surat
- Time: 08:00 AM
- PNR: PNR345812
```

---

## 🛤️ Sample Gujarat Train Routes Used

```json
[
  { from: "Ahmedabad", to: "Surat" },
  { from: "Vadodara", to: "Rajkot" },
  { from: "Surat", to: "Bhuj" },
  { from: "Junagadh", to: "Ahmedabad" },
  { from: "Bhavnagar", to: "Vadodara" }
]
```

---

## 🧠 Future Ideas

* ✅ Add chat history persistence
* ✅ Improve UX with colorful CLI interface
* ⌛ Add payment simulation
* 🌐 Use real-time train data (e.g., IRCTC APIs)
* 📱 Create a web frontend

---

## 🧑‍💻 Author

Built with ❤️ by Rayhan – a passionate MERN developer learning AI integration.

---

## 📜 License

This project is just for educational purposes. No real bookings are made. 😊

