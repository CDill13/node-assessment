const express = require('express');
const bodyParser = require('body-parser');
const userCtrlr = require("./usersCtrl.js");

const app = express();

app.use(bodyParser.json());

// general
app.get('/api/users/:userId', userCtrlr.getUserById);
app.get('/api/users', userCtrlr.getAllUsers);

// by user type
app.get('/api/admins', userCtrlr.getAdmins);
app.get('/api/nonadmins', userCtrlr.getNonAdmins);
app.get('/api/user_type/:type', userCtrlr.getUsersByType);

// update
app.put('/api/users/:userId', userCtrlr.updateUser);

// create
app.post('/api/users', userCtrlr.createUser);

// delete
app.delete('/api/users/:userId', userCtrlr.deleteUser);

const port = 3000;

app.listen( port, () => console.log('Things and stuff on port: ' + port));