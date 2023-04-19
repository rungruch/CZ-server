let data =
[
{
    "Transactionid":'10001',
    "id": "1",
    "Ticketid": "Individual",
    quantity: 1,
    TotalPrice:400,
    VisitDate: "2023-04-23",
    Timestamp: "2023-04-23T18:25:43.511Z",
},
{
    "Transactionid":'10002',
    "id": "1",
    "Ticketid": "Family",
    quantity: 1,
    TotalPrice:1000,
    VisitDate: "2023-04-23",
    Timestamp: "2023-04-23T18:25:43.511Z",
},
{
    "Transactionid":'10003',
    "id": "1",
    "Ticketid": "Family",
    quantity: 1,
    TotalPrice:1000,
    VisitDate: "2023-05-10",
    Timestamp: "2023-04-23T18:25:43.511Z",
},
];


let Transaction = {
    find: () => new Promise((resolve, reject) => resolve(data) ),
    findTicket: ({id}) => {
        return new Promise((resolve, reject) => {
            const result = data.filter(e => e.id === id)
            if (result.length === 0) {
                reject({error: "No ticket found with id: " + id});
            } else {
                resolve(result);
            }
        });
    },

    insert: (trans) => {
        return new Promise((resolve, reject) => {
            data.push(trans);
            resolve(data[data.length-1]);
        }
    )},
     } 
export default Transaction;