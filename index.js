import { app } from "./app.js";
import { dbConnect } from "./config/dbConnect.js";

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
  dbConnect()
})