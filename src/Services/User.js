class User {
    constructor(email,password,role){
        this.email = email;
        this.password = password;
        this.role = role
    }
}
export let data = [
    new User(
        "admin@gmail.com",
        "123",
        "Admin"
    ),
    new User(
        "passenger@gmail.com",
        "123",
        "Passenger"
    ),
    new User(
        "driver@gmail.com",
        "123",
        "Driver"
    ),
];

export const saveData = (userData) => {
    console.log('Registration data saved:', userData);
    data.push(new User(userData.email, userData.pass, userData.role));
};

