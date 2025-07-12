const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
    try {
        require('dotenv').config();
    } catch (e) {
        // dotenv not installed, continue without it
    }
}

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// In-memory database for storing game results
let gameDatabase = [];
let gameIdCounter = 1;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Netball Thing',
        savedGame: null
    });
});

// View all previous games
app.get('/results', (req, res) => {
    // Sort games by date (most recent first) - create a new sorted array
    const sortedGames = [...gameDatabase].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.render('results', { 
        title: 'Game Results - Netball Thing',
        games: sortedGames
    });
});

// View specific game details
app.get('/game/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = gameDatabase.find(g => g.id === gameId);
    
    if (!game) {
        return res.status(404).render('error', { 
            title: 'Game Not Found - Netball Thing',
            message: 'The requested game could not be found.' 
        });
    }
    
    res.render('game-detail', { 
        title: `Game Details - ${game.date} - Netball Thing`,
        game: game
    });
});

app.post('/save-game', (req, res) => {
    const gameData = {
        id: gameIdCounter++,
        date: req.body.gameDate,
        createdAt: new Date().toISOString(),
        players: {
            team1: {
                GS: req.body.team1_GS || '',
                GA: req.body.team1_GA || '',
                WA: req.body.team1_WA || '',
                C: req.body.team1_C || '',
                WD: req.body.team1_WD || '',
                GD: req.body.team1_GD || '',
                GK: req.body.team1_GK || ''
            },
            team2: {
                GS: req.body.team2_GS || '',
                GA: req.body.team2_GA || '',
                WA: req.body.team2_WA || '',
                C: req.body.team2_C || '',
                WD: req.body.team2_WD || '',
                GD: req.body.team2_GD || '',
                GK: req.body.team2_GK || ''
            }
        },
        scores: {
            team1: {
                quarter1: parseInt(req.body.team1_q1) || 0,
                quarter2: parseInt(req.body.team1_q2) || 0,
                quarter3: parseInt(req.body.team1_q3) || 0,
                quarter4: parseInt(req.body.team1_q4) || 0
            },
            team2: {
                quarter1: parseInt(req.body.team2_q1) || 0,
                quarter2: parseInt(req.body.team2_q2) || 0,
                quarter3: parseInt(req.body.team2_q3) || 0,
                quarter4: parseInt(req.body.team2_q4) || 0
            }
        }
    };

    // Calculate total scores
    gameData.scores.team1.total = 
        gameData.scores.team1.quarter1 + 
        gameData.scores.team1.quarter2 + 
        gameData.scores.team1.quarter3 + 
        gameData.scores.team1.quarter4;
    
    gameData.scores.team2.total = 
        gameData.scores.team2.quarter1 + 
        gameData.scores.team2.quarter2 + 
        gameData.scores.team2.quarter3 + 
        gameData.scores.team2.quarter4;

    // Determine winner
    if (gameData.scores.team1.total > gameData.scores.team2.total) {
        gameData.winner = 'team1';
    } else if (gameData.scores.team2.total > gameData.scores.team1.total) {
        gameData.winner = 'team2';
    } else {
        gameData.winner = 'draw';
    }

    // Store in database
    gameDatabase.push(gameData);

    console.log('Game saved to database:', gameData);
    console.log('Total games in database:', gameDatabase.length);
    
    res.render('index', { 
        title: 'Netball Thing',
        savedGame: gameData,
        message: `Game data saved successfully! (Game ID: ${gameData.id})`
    });
});

app.listen(PORT, () => {
    console.log(`Netball Thing server running on http://localhost:${PORT}`);
});
