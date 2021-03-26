const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
// production 
db.sequelize.sync();
// dev
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.get("/", (req,res) => {
    res.json({ message: "Base route active"});
});

require("./app/routes/orders.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/items.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});