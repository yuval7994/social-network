const dotenv = require("dotenv")

dotenv.config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected 🌍"))

mongoose.set("debug", true)

app.use(require("./routes"))

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`))
