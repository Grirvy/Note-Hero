require ('./depend.js');

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
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(notes, null, 2));
  res.json(newNote);
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});