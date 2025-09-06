const express = require('express');
const app = express();

// MY ROUTES
app.get('/', (req,res)=>{
    res.send('index');
});


app.use((req,res) => {
    res.status(404).send('404 damn,shit aint working');
});
// this should always be last
app.listen(3001, () => console.log('listen on port 3001'));