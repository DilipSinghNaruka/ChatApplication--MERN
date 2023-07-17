const express = require("express");
const  {Chats}  = require("./data/data");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(express.json());
require("./config/db");


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, console.log(`server is start ${PORT}`));





// app.post("/register", async (req, res) => {
//   const { name, email, password, cpassword } = req.body;
//   if (!name || !email || !password || !cpassword) {
//     return res.status(422).json({ error: "Fill All Input Columns" });
//   }

//   try {
//     const userExits = await User.findOne({ email: email });
//     if (userExits) {
//       return res.status(422).json({ error: "Email Already Exits" });
//     } else if (password != cpassword) {
//       return res
//         .status(422)
//         .json({ error: "Password and Cpassword is not matched" });
//     } else {
//       const user = new User({ name, email, password, cpassword });
//       await user.save();
//       console.log(user);
//       res.status(201).json({ message: "User Successfully Register" });
//     }
//   } catch (error) {
//     console.log(err);
//   }
// });

