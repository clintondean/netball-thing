# 🏐 Netball Thing

A bright and friendly Node.js web application for capturing netball game details, built with Express.js and Bootstrap.

## Features

- **📅 Game Date Tracking** - Record the date of your netball games
- **👥 Player Management** - Three-column layout for easy team player entry
- **🎯 Position Management** - All 7 netball positions (GS, GA, WA, C, WD, GD, GK)
- **🏆 Quarterly Scoring** - Track scores for each quarter with automatic totals
- **📊 Game Summary** - Instant winner calculation and display
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Enter Game Date** - Select the date when the game was played
2. **Add Players** - Enter player names for each position on both teams
3. **Record Scores** - Input the score for each quarter for both teams
4. **Save Game** - Click the save button to store the game data
5. **View Summary** - See the final scores and winning team

## Netball Positions

- **GS** - Goal Shooter
- **GA** - Goal Attack  
- **WA** - Wing Attack
- **C** - Centre
- **WD** - Wing Defence
- **GD** - Goal Defence
- **GK** - Goal Keeper

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating with Bootstrap 5
- **Styling**: Custom CSS with gradient backgrounds
- **Interactive Features**: Vanilla JavaScript

## Project Structure

```
netball-thing/
├── server.js              # Main Express server
├── package.json           # Project dependencies
├── views/
│   └── index.ejs          # Main HTML template
├── public/
│   ├── styles.css         # Custom CSS styles
│   └── script.js          # Client-side JavaScript
└── .github/
    └── copilot-instructions.md
```

## Features in Detail

### Responsive Design
- Mobile-first approach using Bootstrap 5
- Bright, modern color scheme
- Smooth animations and transitions
- Card-based layout for better organization

### Interactive Elements
- Real-time score calculation
- Form validation
- Auto-focus progression through inputs
- Hover effects and visual feedback

### User Experience
- Clear position labels with color coding
- Success messages after saving
- Game winner announcement
- Intuitive three-column layout

## 🚀 Deployment

### GitHub Pages (Static Demo)
This repository is configured with GitHub Actions for automatic deployment to GitHub Pages.

**Live Demo**: `https://[your-username].github.io/netball-thing/`

#### Setup GitHub Pages:
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as the source
3. Push to main/master branch to trigger deployment

The static version includes demo functionality and showcases the application's features.

### Production Deployment
For full functionality with data persistence:

#### Docker:
```bash
docker build -t netball-thing:latest .
docker run -p 3000:3000 netball-thing:latest
```

#### Manual:
```bash
npm run build:prod  # Creates production ZIP
# Extract and run start.bat (Windows) or start.sh (Linux/Mac)
```

## 📋 Build Scripts

- `npm start` - Run the development server
- `npm run build:static` - Build static site for GitHub Pages
- `npm run build:docker` - Build Docker image
- `npm run build:prod` - Create production distribution ZIP

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [ISC License](LICENSE).
