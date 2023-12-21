require('./depend.js');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  // Read existing data from the db file
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));

  // Add the new note to the array
  notes.push(newNote);

  // Write the updated notes back to the db file
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2));

  // Send the new note as a response
  res.json(newNote);
});

  // Make sure the server is running
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});