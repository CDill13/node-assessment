let userData = require('./userData.json');
let nextId = (userData[userData.length -1].id + 1);
// In the event of creating or deleting users, there will still be serialized id

module.exports = {

    getAllUsers: (req, res) => {
        let request = req.query;
        let queryParam = "";

        // This defines what is being being asked for if there is a query
        Object.keys(request).forEach(key => {
            if (request[key]) {
                queryParam = key;
            }
        })

        switch(queryParam) {
            case 'age' :
                let usersUnderAge = userData.filter(user => user.age < request.age);
                res.status(200).send(usersUnderAge);
                break;
            case 'email' :
                let usersByEmail = userData.filter(user => user.email === request.email);
                res.status(200).send(usersByEmail);
                break;
            case 'lastname' :
                let usersByLastname = userData.filter(user => user.last_name === request.lastname);
                res.status(200).send(usersByLastname);
                break;
            case 'favorites' :
                let usersByFavorite = userData.filter(user => user.favorites.includes(request.favorites));
                res.status(200).send(usersByFavorite);
                break;
            default : 
                // If queryParam is still an empty string all user data is sent
                res.status(200).send(userData);
        };
    },

    getUserById : (req, res) => {
        let id = +req.params.userId;
        let userById = null;

        if(id < userData.length) {
            userById = userData.filter(user => user.id === id);
            res.status(200).send(userById[0])
        } else res.status(404).json(userById);
    },

    getAdmins: (req, res) => {
        let admins = userData.filter(user => user.type === 'admin');
        res.status(200).send(admins);
    },

    getNonAdmins: (req, res) => {
        let nonAdmins = userData.filter(user => user.type !== 'admin');
        res.status(200).send(nonAdmins);
    },

    getUsersByType : (req, res) => {
        let usersByType = userData.filter(user => user.type === req.params.type);
        res.status(200).send(usersByType);
    },

    updateUser: (req, res) => {
        let id = +req.params.userId;
        let userUpdate = req.body;

        for(let i = 0; i < userData.length; i++) {
            if(userData[i].id === id){userData[i] = userUpdate};
        };
        
        res.status(200).send(userData);
    },

    createUser: (req, res) => {
        let newUser = req.body;

        newUser.id = nextId;
        nextId++;
        userData.push(newUser);

        res.status(200).send(userData);
    },

    deleteUser: (req, res) => {
        let id = +req.params.userId;
        let deleteIndex = userData.findIndex( user => user.id === id);

        userData.splice(deleteIndex, 1);
        res.status(200).send(userData);
    }
}