# Excel Manager (Frontend)

A simple React-based tool to manage records and export them as Excel spreadsheets.
The application runs completely in the browser and focuses on a clean interface with smooth interactions.

## Features

* Add, edit, and delete records easily
* Export data to Excel format
* Smooth UI animations and transitions
* Simple and responsive layout
* Fast client-side processing with no server dependency

## Tech Stack

* React
* TypeScript
* Framer Motion
* XLSX
* File Saver

## Installation

Clone the repository and install the required dependencies.

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Then open your browser and visit:

```
http://localhost:5173
```

## Exporting Data

The application allows users to download records as an Excel spreadsheet.
Simply click the **Export to Excel** button and the file will be generated automatically.

## Project Structure

```
src/
 ├─ components/
 ├─ pages/
 ├─ hooks/
 ├─ utils/
 └─ App.tsx
```

## Dependencies

* **xlsx** – used for generating Excel files
* **file-saver** – handles file downloads in the browser
* **framer-motion** – adds animations and UI transitions
* **@types/file-saver** – TypeScript definitions for file-saver

## Notes

* The project runs entirely on the client side.
* All operations such as creating, updating, and deleting records are handled directly in the browser.
* No external APIs or backend services are required.

## License

This project is open-source and available under the MIT License.
