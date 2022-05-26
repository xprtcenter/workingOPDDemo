const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// * BorderParser Middleware
app.use(express.json());

// * Load Env
dotenv.config({ path: "./config.env" });

//* Log route actions
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

//* Use Routes
app.use("/api/patreg", require("./routes/patreg"));
app.use("/api/docspec", require("./routes/docspec"));
app.use("/api/docmaster", require("./routes/docmaster"));
app.use("/api/patvisit", require("./routes/patvisit"));
app.use("/api/appconfig", require("./routes/appconfig"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
