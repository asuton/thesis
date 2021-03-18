import app from "./app";
import connectDB from "./config/database";
import { PORT } from "./utils/constants";

connectDB();

app.listen(PORT || 5000, () => console.log(`Server started on port ${PORT}`));
