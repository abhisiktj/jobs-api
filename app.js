require('dotenv').config();
const express=require('express');
const errorHandler=require('./middlewares/errorHandler');
require('express-async-errors');
const authRouter=require('./routes/auth');
const jobsRouter=require('./routes/jobs');
const helmet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const rateLimit=require('express-rate-limit');
const connectDB=require('./db/connect');


const app=express();
app.set('trust proxy',1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss())

app.get('/',(req,res)=>{
  res.send("Jobs Api");
})
app.use('/auth',authRouter);
app.use('/jobs',jobsRouter);
app.use(errorHandler);



const PORT=process.env.PORT || 3000;
const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Server started on ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();