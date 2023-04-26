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

// Be sure that the graph, edge collections, and vertices have been created before running this script.
async function createEdgeOfGraph() {
  const response = await client.addEdgeToEdgeCollection(
    "grocery-graph",
    "groceryOrders",
    {
      _key: "4117657859",
      _from: "groceryCustomers/C16",
      _to: "groceryItems/P21",
    }
  );
  console.log(response);
}
createEdgeOfGraph();
