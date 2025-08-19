# EcommerceMERN

{
    "email": "priya@gmail.com",
    "name": "Priya Chatterjee",
    "password": "priyaa@1234"
}


{
    "email": "pooja@gmail.com",
    "name": "Pooja Gomes",
    "password": "pooja@1234",
    "phone": "9348938743",
    "role": "customer"
}


{
    "email": "Sreetama@gmail.com",
    "name": "Sreetama Ray",
    "password": "sree@1234",
    "phone": "9908938743",
    "role": "manager"
}


C:\Users\barna>mongosh "mongodb+srv://cluster0.7xnat.mongodb.net/Ecommerceshop" --username bsikdar
Enter password: *********
Current Mongosh Log ID: 68736948f157fa4cf586b01c
Connecting to:          mongodb+srv://<credentials>@cluster0.7xnat.mongodb.net/Ecommerceshop?appName=mongosh+2.3.2
Using MongoDB:          8.0.11
Using Mongosh:          2.3.2
mongosh 2.5.5 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

Atlas atlas-5fna4v-shard-0 [primary] Ecommerceshop> db.runCommand({ connectionStatus: 1 })
{
  authInfo: {
    authenticatedUsers: [ { user: 'bsikdar', db: 'admin' } ],
    authenticatedUserRoles: [ { role: 'readWriteAnyDatabase', db: 'admin' } ]
  },
  ok: 1
}
Atlas atlas-5fna4v-shard-0 [primary] Ecommerceshop> use Ecommerceshop
already on db Ecommerceshop
Atlas atlas-5fna4v-shard-0 [primary] Ecommerceshop> db.orders.deleteMany({});
{ acknowledged: true, deletedCount: 39 }

db.orders.deleteOne({ _id: ObjectId("your-order-id-here") });