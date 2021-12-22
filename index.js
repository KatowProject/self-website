const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.set('view engine', 'ejs');

app.use(express.static('assets'));


app.get('/', (req, res) => {
    res.render('pages/index');
});


app.get('/:query', (req, res) => {
    const query = req.params.query;

    switch (query) {
        case 'komikato':
            res.render('pages/komikato');
            break;

        default:
            res.render('pages/404');
            break;
    }
});


app.get('*', (req, res) => {
    res.render('pages/404');
});
app.listen(9000, () => console.log('Server started on port 9000'));