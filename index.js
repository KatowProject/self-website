const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.render('pages/index', { data: require('./data/projects.json') });
});

app.get('/:query', async (req, res) => {
    const query = req.params.query;

    switch (query) {
        case 'projects':
            const projects = await fetch('https://api.github.com/users/KatowProject/repos');
            const projectsJSON = await projects.json();
            const filter = projectsJSON.filter(project => !project.fork && project.language !== null);

            res.render('pages/project', { data: filter });
            break;

        case 'about':
            res.render('pages/about');
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