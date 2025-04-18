# CodeLink

CodeLink is a comprehensive code review and visualization tool designed to help developers understand code changes, their impacts, and related documentation. It provides an intuitive interface for exploring repository branches, commits, and file changes with detailed explanations and analysis.

![CodeLink Screenshot](public/placeholder.svg)

---

## 🚀 Features

- **Branch and Commit Explorer**: Navigate through repository branches and commits.
- **Code Change Visualization**: View file changes with syntax highlighting.
- **Feature Explanations**: Understand the purpose and impact of code changes.
- **Unit Test Integration**: View and run tests associated with code changes.
- **Impact Analysis**: Identify potential impacts of changes on other parts of the codebase.
- **Test Status Tracking**: Track the testing status of changes across branches.

---

## 🖥️ System Requirements

### Frontend
- Node.js `16.x` or higher
- npm `7.x` or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Backend
- Python `3.9` or higher
- FastAPI
- uvicorn

---

## ⚙️ Setup Instructions

### Backend Setup (FastAPI)

```bash
cd server

# Create virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
```

`.env`
```env
ENABLE_DETAILED_LOGGING=True
API_RESPONSE_DELAY=0.3
EDGE_CASES_SUBMISSION_DELAY=0.5
TEST_STATE_SYNC_DELAY=0.3
```

```bash
# Start the FastAPI server
python main.py
```

📍 Access API: [http://localhost:8000](http://localhost:8000)  
📚 Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Frontend Setup (Next.js)

```bash
# From project root
npm install

# Create environment config
```

`.env.local`
```env
API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

```bash
# Start the development server
npm run dev
```

🌐 Access frontend at: [http://localhost:3000](http://localhost:3000)

---

## 🗂 Project Structure

```
codelink/
├── app/                  # Next.js app directory
│   ├── api/              # API routes for proxying requests to backend
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── test/             # Test page for API testing
├── components/           # React components
├── context/              # React context providers
├── lib/                  # Utility functions and types
├── public/               # Static assets (e.g., screenshots)
├── server/               # FastAPI backend
│   ├── data/             # JSON data files
│   ├── main.py           # FastAPI application entrypoint
│   └── requirements.txt  # Python dependencies
└── README.md             # Project documentation
```

---

## 🧑‍💻 Usage Guide

### 🔍 Exploring Branches and Commits
- Use the sidebar to navigate through branches.
- Click on a commit to view file-level changes.

### 📝 Viewing Code Changes
- Syntax-highlighted code diff view in the main panel.
- Expand for detailed context.

### 🧠 Understanding Changes
- Explanations outline purpose and rationale.
- Technical deep dives available for selected changes.
- Impact analysis shows ripple effects in the codebase.

### ✅ Working with Tests
- Browse unit tests linked to changes.
- Mark tests as passed/failed.
- Submit edge cases for additional validation.

---

## 🧩 Development Notes

### Adding New Projects

1. Create a new folder under `server/data/` with your project name.
2. Include these files:
   - `branches.json`
   - `file-changes.json`
   - `explanations.json`
   - `unit-tests.json`
   - `impacts.json`
   - `test-state.json`
   - `deep-dive-analysis.json`

3. Modify `getCurrentProject()` in `server/utils.ts` to include the new project.

### API Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| `/api/branches` | Get all branches and commits |
| `/api/commits/{commit_id}/changes` | File changes for a commit |
| `/api/changes/{change_id}/explanation` | Explanation for a change |
| `/api/changes/{change_id}/tests` | Unit tests for a change |
| `/api/changes/{change_id}/impacts` | Code impacts |
| `/api/impacts/{impact_id}/deep-dive` | Technical deep dive |
| `/api/changes/{change_id}/edge-cases` | Submit edge cases |
| `/api/test-state` | Get or update test state |

---

## 🛠 Troubleshooting

### Backend Connection Issues
- Confirm FastAPI is running on [http://localhost:8000](http://localhost:8000)
- Visit `/health` endpoint for a quick check
- Verify `.env.local` config matches API location
- Check browser console for CORS errors

### Data Not Loading
- Look at server logs for error traces
- Ensure proper structure in `server/data` files
- Use test page at [http://localhost:3000/test](http://localhost:3000/test) for debugging
