const fs = require('fs');
const User = require('../models/user'); 
const dataPath = 'data.json';
const data = require('../data.json');

const updateData = () => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const usersController = {
    addUser: (req, res) => {
        const { id, cash = 0, credit = 0, isActive = true } = req.body;
        const newUser = new User(id, cash, credit, isActive);
        
        const existingUser = data.users.find((user) => user.id === newUser.id);
       

        data.users.push(newUser);
        updateData();
        res.status(201).send(newUser);
    },

    deposit: (req, res) => {
        const { id } = req.params;
        const { amount } = req.body;
        const user = data.users.find((u) => u.id === id);


        user.deposit(amount);
        updateData();
        res.send(user);
    },

    updateCredit: (req, res) => {
        const { id } = req.params;
        const { credit } = req.body;
        const user = data.users.find((u) => u.id === id);

        user.updateCredit(credit);
        updateData();
        res.send(user);
    },

    withdraw: (req, res) => {
        const { id } = req.params;
        const { amount } = req.body;
        const user = data.users.find((u) => u.id === id);

        const success = user.withdraw(amount);

        if (success) {
            updateData();
            res.send(user);
        }
    },


    transfer: (req, res) => {
        const { id, receiverId } = req.params;
        const { amount } = req.body;

        const sender = data.users.find((u) => u.id === id);
        const receiver = data.users.find((u) => u.id === receiverId);

    
        const success = sender.transfer(amount, receiver);

        if (success) {
            updateData();
            res.send(sender);
        } 
    },

    getUserDetails: (req, res) => {
        const { id } = req.params;
        const user = data.users.find((u) => u.id === id);

        res.send(user);
    },

    getAllUsers: (req, res) => {
        res.send(data.users);
    },
};

module.exports = usersController;
