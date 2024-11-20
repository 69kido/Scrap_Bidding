const express = require("express");
require("./DB/Config");
const User = require("./DB/User");
const Scrap = require("./DB/Scrap");
const cors = require("cors");
const app = express();

const multer = require("multer");
const upload = multer({ dest: 'upload/' }); // Ensure 'upload/' directory exists

app.use(express.json());
app.use(cors());
app.use('/upload', express.static('upload'));


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "Wrong email or password" });
        }
    } else {
        res.send({ result: "Wrong email or password" });
    }
});

app.get("/", async (req, res) => {
    res.send("Working");
});

app.post("/Sell_Scrap", upload.single('file'), async (req, res) => {
    try {
        const scrap = new Scrap({
            userEmail: req.body.userEmail,
            scrapType: req.body.scrapType,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path // Path to the uploaded image
        });

        const result = await scrap.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ error: "Failed to save scrap data" });
    }
});

app.get('/Scrap_List',async(req,res)=>{
    const scraps = await Scrap.find();
    if(scraps.length !== 0){
        res.send(scraps)
    }else{
        res.send({result :"No available Scraps"});
    }
})

app.get('/Users_List',async(req,res)=>{
    const users = await User.find();
    if(users.length !== 0){
        res.send(users)
    }else{
        res.send({result :"No available Users"});
    }
})

app.delete('/confirmation/:id',async(req,res)=>{
    let result=await Scrap.deleteOne({_id:req.params.id});
    res.send(result)
})

app.get('/Search/:key',async(req,res)=>{
    let result=await Scrap.find({
        "$or":[
            {
                scrapType:{$regex:req.params.key}
            }
        ]
    });
    res.send(result)
})

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
