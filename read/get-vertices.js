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

// This method will give us the vertex collections of the graph.
// Example: [ 'groceryCustomers', 'groceryItems' ]
async function getVerticesOfGraph() {
  const response = await client.listVertexCollections("grocery-graph");
  console.log(response);
}
getVerticesOfGraph();
