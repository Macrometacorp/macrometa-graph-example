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

// Please be sure that edge collection and edge have been created before running this script.
async function getEdgeFromEdgeCollection() {
  const response = await client.getEdge(
      "grocery-graph",
      "groceryOrders",
      "4117657859"
  )
  console.log(response)
}
getEdgeFromEdgeCollection();
