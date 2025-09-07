# EcommerceMERN

{
    "email": "sneha@gmail.com",
    "name": "Sneha Chatterjee",
    "password": "snehaa@1234",
    "phone": "6585407489",
    "role": "admin"
}


{
    "email": "pritha@gmail.com",
    "name": "Pritha Gomes",
    "password": "pritha@1234",
    "phone": "6445407489",
    "role": "customer"
}


{
    "email": "Sreetama@gmail.com",
    "name": "Sreetama Ray",
    "password": "sree@1234",
    "phone": "8908938743",
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


//index got created for an non-required field. fixed that with:


Atlas atlas-5fna4v-shard-0 [primary] Ecommerceshop> db.carts.dropIndex("user_1")
{
  nIndexesWas: 2,
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1756842657, i: 2 }),
    signature: {
      hash: Binary.createFromBase64('CVboGSDIzRHMXw/Xupn4SW1TuHI=', 0),
      keyId: Long('7512550060207374342')
    }
  },
  operationTime: Timestamp({ t: 1756842657, i: 2 })
}





Cart and User Flow:

user logs in, 
tries to add item to the cart
cart gets created and mapped to user in cart model
cart status set to active and user adds items into it
user places order, orderId mapped to cartId in placeOrder api, into cart model
cart statusupdated to order_in_progress
order delivered
cart status changed to completed and saved in db

repeats....

