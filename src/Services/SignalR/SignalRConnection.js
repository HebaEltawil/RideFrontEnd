import * as signalR from "@microsoft/signalr";

const URL = 'https://localhost:7115/realTime'; // or whatever your backend port is

class Connector {
    connection;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start()
            .then(() => console.log('Connection established'))
            .catch(err => console.error('Error establishing connection:', err));
    }
    onPendingAccountRecieved(onPendingAccountRecieved) {
        this.connection.on("UpdatePending", account => {
            onPendingAccountRecieved(account);
        });
    }
    onRidesUpdated(onRidesUpdated)
    {
        this.connection.on("ridesUpdated",rideToParse=>{
            onRidesUpdated(rideToParse);
        })
    }
    onDriversUpdated(onDriversUpdated)
    {
        this.connection.on("driversUpdated",m=>{
            onDriversUpdated(m);
        })
    }
    passWatchRideUpdated(email,passWatchRideUpdated)
    {
        this.connection.on(email,ride=>{
            passWatchRideUpdated(ride);
        })
    }
    static getInstance() {
        if (!Connector.instance) {
            Connector.instance = new Connector();
        }
        return Connector.instance;
    }
}

export default Connector.getInstance();
