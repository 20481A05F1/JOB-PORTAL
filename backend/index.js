// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PDFDocument = require('pdfkit');

// Initialize express app
const app = express();

// Use necessary middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Define database connection
mongoose.connect('mongodb://127.0.0.1/jobportal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Listen to database events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database Connected Successfully!!!");
});

// Define schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    usertype: String,
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})

const profileSchema = new mongoose.Schema({
    fullname: String,
    location: String,
    email: String,
    phonenumber: String,
    totalexperience: Number,
    resume: Buffer
});

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    salary: Number,
    applylink: String,
    company: String,
    jobtype: String,
    experience: String,
});

// Define models
const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Job = mongoose.model('Job', jobSchema);
const Contact = mongoose.model('Contact', contactSchema);
app.post('/register',async(req,res)=>{
    const {username,password,usertype}=req.body;
    const existingUser=await User.findOne({username});
    if (existingUser){
        return res.status(409).json({mesage:'user already exists'});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        password:hashedPassword,
        usertype
    });
    try {
        await newUser.save();
        res.status(201).json({mesage:'Registration Sucessful'});
    }
    catch(error){
        res.status(500).json({message:'Registration failed',error});
    }
});
app.post('/contact', async(req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });
        await contact.save();
        res.json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define API routes
app.post('/login', async(req, res) => {
    const { username, password, usertype } = req.body;
    const user = await User.findOne({ username, usertype });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.cookie('token', token, { httpOnly: true });
    res.json({ user });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/jobs', async(req, res) => {
    try {
        const jobs = await Job.find();
        const formattedJobs = jobs.map((job) => ({
            id: job._id,
            title: job.title,
            description: job.description,
            location: job.location,
            salary: job.salary,
            applylink: job.applylink,
            company: job.company,
            jobtype: job.jobtype,
            experience: job.experience,
        }));
        res.json(formattedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/jobs', async(req, res) => {
    const { title, description, location, salary, applylink, company, jobtype, experience } = req.body;
    try {
        const job = new Job({
            title,
            description,
            location,
            salary,
            applylink,
            company,
            jobtype,
            experience,
        });
        await job.save();
        res.json({ message: 'Job added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/profile/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ _id: userId });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/profile', async(req, res) => {
    const { fullname, location, email, phonenumber, totalexperience, resume } = req.body;
    try {
        const profile = new Profile({
            fullname,
            location,
            email,
            phonenumber,
            totalexperience,
            resume,
        });
        await profile.save();
        res.json({ message: 'Profile added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/resume/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ _id: userId });
        if (!profile || !profile.resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        const doc = new PDFDocument();
        doc.pipe(res);
        doc.end(profile.resume);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});





// Start the server

//End of the code.
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));