# CodeLink

CodeLink is a comprehensive code review and visualization tool designed to help developers understand code changes, their impacts, and related documentation. It provides an intuitive interface for exploring repository branches, commits, and file changes with detailed explanations and analysis.

![CodeLink Screenshot](/placeholder.svg?height=400&width=800)

## Features

- **Branch and Commit Explorer**: Navigate through repository branches and commits
- **Code Change Visualization**: View file changes with syntax highlighting
- **Feature Explanations**: Understand the purpose and impact of code changes
- **Unit Test Integration**: View and run tests associated with code changes
- **Impact Analysis**: Identify potential impacts of changes on other parts of the codebase
- **Test Status Tracking**: Track the testing status of changes across branches

## System Requirements

- **Frontend**:
  - Node.js 16.x or higher
  - npm 7.x or higher
  - Modern web browser (Chrome, Firefox, Safari, Edge)

- **Backend**:
  - Python 3.9 or higher
  - FastAPI
  - uvicorn

## Setup Instructions

### Backend Setup (FastAPI)

1. Navigate to the server directory:
   \`\`\`bash
   cd server
   \`\`\`

2. Create and activate a virtual environment:
   \`\`\`bash
   # Create virtual environment
   python -m venv venv

   # Activate on Windows
   venv\Scripts\activate

   # Activate on macOS/Linux
   source venv/bin/activate
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. Create a `.env` file in the server directory with the following content:
   \`\`\`
   ENABLE_DETAILED_LOGGING=True
   API_RESPONSE_DELAY=0.3
   EDGE_CASES_SUBMISSION_DELAY=0.5
   TEST_STATE_SYNC_DELAY=0.3
   \`\`\`

5. Start the FastAPI server:
   \`\`\`bash
   python main.py
   \`\`\`

   The backend will be available at http://localhost:8000. You can access the API documentation at http://localhost:8000/docs.

### Frontend Setup (Next.js)

1. From the project root, install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a `.env.local` file in the project root with the following content:
   \`\`\`
   API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will be available at http://localhost:3000.

## Project Structure

\`\`\`
codelink/
├── app/                  # Next.js app directory
│   ├── api/              # API routes for proxying requests to backend
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── test/             # Test page for API testing
├── components/           # React components
├── context/              # React context providers
├── lib/                  # Utility functions and types
├── public/               # Static assets
├── server/               # FastAPI backend
│   ├── data/             # JSON data files
│   ├── main.py           # FastAPI application
│   └── requirements.txt  # Python dependencies
└── README.md             # Project documentation
\`\`\`

## Usage

1. **Exploring Branches and Commits**:
   - Use the left sidebar to navigate through branches and commits
   - Click on a commit to view its changes

2. **Viewing Code Changes**:
   - The main panel displays file changes for the selected commit
   - Use the navigation controls to move between changes
   - Click the expand button to see more code context

3. **Understanding Changes**:
   - Feature explanations provide context about the purpose of changes
   - Technical details explain implementation specifics
   - Impact analysis shows how changes affect other parts of the codebase

4. **Working with Tests**:
   - View unit tests associated with changes
   - Mark tests as passed or failed using the status indicators
   - Submit edge cases for consideration

## Development Notes

### Adding New Projects

To add a new project to CodeLink:

1. Create a new directory in `server/data/` with the project name
2. Add the required JSON files with the appropriate structure:
   - `branches.json`: Repository branches and commits
   - `file-changes.json`: Code changes for each commit
   - `explanations.json`: Feature explanations for each change
   - `unit-tests.json`: Unit tests for each change
   - `impacts.json`: Code impacts for each change
   - `test-state.json`: Test status for branches, commits, and changes
   - `deep-dive-analysis.json`: Detailed technical analysis for impacts

3. Update the `getCurrentProject()` function in `server/utils.ts` to return the new project name

### API Integration

The frontend communicates with the backend through a set of API endpoints:

- `/api/branches`: Get all branches and commits
- `/api/commits/{commit_id}/changes`: Get file changes for a specific commit
- `/api/changes/{change_id}/explanation`: Get explanation for a specific file change
- `/api/changes/{change_id}/tests`: Get unit tests for a specific file change
- `/api/changes/{change_id}/impacts`: Get code impacts for a specific file change
- `/api/impacts/{impact_id}/deep-dive`: Get deep dive analysis for a specific impact
- `/api/changes/{change_id}/edge-cases`: Submit edge cases for a specific file change
- `/api/test-state`: Get or update the test state

## Troubleshooting

### Backend Connection Issues

If you see "Failed to fetch" errors:

1. Ensure the FastAPI backend is running at http://localhost:8000
2. Check the backend health at http://localhost:8000/health
3. Verify your `.env.local` file has the correct API_BASE_URL
4. Check for CORS issues in the browser console

### Data Not Loading

If data isn't loading properly:

1. Check the server logs for errors
2. Verify the JSON data files exist in the correct location
3. Use the test page at http://localhost:3000/test to test individual API endpoints

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
