📧 Inbox Whisper: AI-Powered Email Assistant
Inbox Whisper is a full-stack AI productivity tool designed to streamline professional communication. It consists of a Spring Boot backend leveraging the Google Gemini AI API, a modern React + Vite dashboard, and a Chrome Extension that injects AI capabilities directly into the Gmail interface.

🚀 Key Features
AI-Generated Replies: Automatically generates professional email responses based on the context of the received message.

Gmail Integration: A custom Chrome Extension that injects an "AI Reply" button directly into the Gmail compose toolbar.

Tone Customization: Support for generating replies with specific professional tones (e.g., Professional, Casual, Urgent).

Modern Web Dashboard: A clean, responsive UI built with React and shadcn/ui for managing email templates and previews.

Reactive Backend: High-performance backend built with Spring Boot 3 and WebFlux for non-blocking API calls to Gemini AI.

🛠️ Tech Stack
Backend
Java 21 & Spring Boot 3: Core application framework.

Spring WebFlux: For reactive, non-blocking communication with the AI API.

Google Gemini API: Powering the natural language generation.

Maven: Dependency management and build automation.

Lombok: To reduce boilerplate code.

Frontend (Dashboard)
React + TypeScript: Type-safe frontend development.

Vite: Fast build tool and development server.

Tailwind CSS & shadcn/ui: For a modern, accessible, and responsive design.

Lucide React: For consistent, high-quality iconography.

Chrome Extension
JavaScript (Manifest V3): The latest standard for secure and performant extensions.

DOM Manipulation & MutationObserver: Used to dynamically inject buttons into the Gmail UI as windows are opened.

📂 Project Structure
Plaintext
├── backend/                  # Spring Boot Application
│   ├── src/main/java/        # Java source code (Controllers, Services, DTOs)
│   ├── src/main/resources/   # App properties and API configurations
│   └── pom.xml               # Maven configuration
├── frontend/                 # Chrome Extension
│   ├── manifest.json         # Extension configuration
│   └── content.js            # Gmail DOM injection logic
└── inbox-whisper-reply-main/ # React Dashboard
    ├── src/components/       # Reusable UI components (shadcn)
    └── package.json          # Node dependencies


1. Backend Setup
Navigate to the backend directory.

Update src/main/resources/application.properties with your Gemini API Key:

Properties
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
gemini.api.key=YOUR_API_KEY_HERE

Run the application:

Bash
./mvnw spring-boot:run

2. Extension Installation
Open Chrome and navigate to chrome://extensions/.

Enable Developer Mode (top right).

Click Load unpacked and select the frontend folder.

Open Gmail; you will now see an AI Reply button in your compose window.

3. Dashboard Setup
Navigate to the inbox-whisper-reply-main directory.

Install dependencies: npm install.

Start the dev server: npm run dev.

🧠 Technical Highlights 
API Design: Implemented a clean RESTful API in Spring Boot to bridge the gap between a browser extension and advanced LLMs.

Dynamic DOM Injection: Used MutationObserver in the Chrome Extension to ensure the AI button is correctly injected even when Gmail's single-page app (SPA) updates dynamically.

Security & Permissions: Configured manifest.json with strict host_permissions for mail.google.com and localhost, following extension security best practices.

Component-Driven UI: Utilized a modern component-based architecture with React and shadcn/ui to ensure the dashboard is both maintainable and visually polished.
