## Packages
xlsx | Needed for Excel spreadsheet generation and download
file-saver | Triggers the file download in the user's browser
framer-motion | Provides smooth layout transitions and modal animations
@types/file-saver | TypeScript types for file-saver

## Notes
- This is a STRICTLY frontend-only application as requested.
- All state (CRUD operations) is managed in-memory using React state (`useState`).
- No backend API routes or react-query mutations are used for data persistence.
- Initial load contains a simulated 2-second delay to show the skeleton loader.
