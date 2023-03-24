const jsc8 = require("jsc8");
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

client = new jsc8({
  url: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  fabricName: process.env.FABRIC,
});

// Please be sure that the edge exists in edge collection before running this script.
async function updateEdge() {
// We can update _from and _to fields of an edge and also add new fields to the edge. 
  const response = await client.updateEdge(
      "grocery-graph",
      "groceryOrders",
      "4117657859",
    {_from: "groceryCustomers/C15", _to: "groceryItems/P20"}
  )
  console.log(response);
}
updateEdge();
