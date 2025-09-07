import express from "express";
//your Node.js project is using ES module syntax instead of CommonJS. When "type": "module" is defined in the package.json file, Node.js treats .js files as ES modules. This means you need to use import statements instead of require().
//Remove or comment out "type": "module"
import cors from 'cors';
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/OrderRoute.js";
import cartRoutes from './routes/CartRoute.js';
import http from "http";
import { Server } from "socket.io";
import workflowRoutes from "./routes/WorkflowRoutes.js";

const port = 5000;
connectDB();
const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);
});

app.use(cors(
    // {
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     // origin: 'http://localhost:3000',
    //     credentials: true
    // }
));
app.use(express.json());
app.use('/api/auth',UserRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/carts',cartRoutes);
app.use('/api/workflow',workflowRoutes);
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


server.listen(port,()=>
{
    console.log(`Server running on port ${port}`);
})