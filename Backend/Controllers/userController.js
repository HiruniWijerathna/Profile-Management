const user = require('../Model/userModel');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await user.find();
    } catch (err) {
        console.log(err);
    }
    //null check
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    //display users
    return res.status(200).json({ users });
}

//datas export
const addUser = async (req, res, next) => {
    const { firstname, lastname, email, address, phone } = req.body;    
    let users;
    try {
        users = new user({
            firstname,
            lastname,
            email,
            address,
            phone
        });
        await users.save();
    } catch (err) {
        console.log(err);
    }
    //data null check
    if (!users) {
        return res.status(500).json({ message: "Unable to add user" });
    }
    return res.status(201).json({ users });
}

//get by ID function
const getById = async (req, res, next) => {
    const id = req.params.id;
    let users;  
    try {
        users = await user.findById(id);
    } catch (err) {
        console.log(err);
    }
    //null check
    if (!users) {
        return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ users });
}

//update user function 
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { firstname, lastname, email, address, phone } = req.body;
    let users;
    try {
        users = await user.findByIdAndUpdate(id, {
            firstname,
            lastname,
            email,
            address,
            phone
        });
        users = await users.save();
    } catch (err) {
        console.log(err);
    }
    //null check
    if (!users) {
        return res.status(404).json({ message: "Unable to update user details" });
    }
    return res.status(200).json({ users });;
}

//delete user function
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let users;
    try {
        users = await user.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    //null check
    if (!users) {
        return res.status(404).json({ message: "Unable to delete user" });
    }
    return res.status(200).json({ message: "User successfully deleted" });
}


exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getById = getById;
exports.addUser = addUser;
exports.getAllUsers = getAllUsers;