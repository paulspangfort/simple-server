import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import Game from './models/game';
import {randomID} from './utils/helpers';
import * as Notes from './controllers/note_controller';

// add server and io initialization after app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// enable/disable cross origin resource sharing if necessary
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static('static'));
// enables static assets from folder static
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let ids = Object.keys(io.sockets.clients().connected);

let pokerGame = new Game();

// default index route
app.get('/', (req, res) => {
  res.send(ids);
});

io.on('connection', (socket) => {
  // on first connection emit notes
  pokerGame.addPlayer({id: socket.id, name: 'hey'});
  ids = Object.keys(io.sockets.clients().connected);

  console.log('howd',socket.id);

  // pushes notes to everybody
  const pushNotes = () => {
    Notes.getNotes().then((result) => {
      // broadcasts to all sockets including ourselves
      io.sockets.emit('notes', result);
    });
  };

  socket.on('connect', () => {
    io.emit(ids);
  });
});


// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
server.listen(port);

console.log(`listening on: ${port}`);
