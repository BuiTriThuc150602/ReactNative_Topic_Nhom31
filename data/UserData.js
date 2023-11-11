import { v4 as uuidv4 } from "uuid";
var usersArray = [
  {
    id: uuidv4(),
    name: "Bui Tri Thuc",
    dob: "15/06/2002",
    email: "trithuc@gmail.com",
    password: "123456",
  },
];
// actions
export const addUser = (user) => {
    user.id = uuidv4();
    usersArray.push(user);
};

export const deleteUser = (id) => {
    usersArray = usersArray.filter((user) => user.id !== id);
};

export const editUser = (id, user) => {
    const index = usersArray.findIndex((user) => user.id === id);
    usersArray[index] = user;
};
