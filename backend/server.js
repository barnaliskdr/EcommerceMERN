import express from "express";
//your Node.js project is using ES module syntax instead of CommonJS. When "type": "module" is defined in the package.json file, Node.js treats .js files as ES modules. This means you need to use import statements instead of require().
//Remove or comment out "type": "module"
import cors from 'cors';
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";


const port = 5000;
connectDB();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth',UserRoutes);
app.use('/api/products',productRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
    // res.json(products);
});

// app.get("/api/products", (req, res) => {
//     res.json(products);
// })

// app.get("/api/products/:id", (req, res) => {
//     const product = products.find(p => p.id === req.params.id);
//     res.json(product);
// })

// app.get("/api/products/:name", (req, res) => {
//     const product = products.find(p => p.name === req.params.name);
//     res.json(product);
// })


app.listen(port,()=>
{
    console.log(`Server running on port ${port}`);
})