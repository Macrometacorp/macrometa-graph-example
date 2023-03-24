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

// This method will give us the edge collections of the graph and the from and to vertices of the edges.
// Example:
// {
//   collection: 'groceryOrders',
//   from: [ 'groceryCustomers' ],
//   to: [ 'groceryItems' ]
// }
async function getEdgesOfGraph() {
  const response = await client.getEdges("grocery-graph");
  console.log(response);
}
getEdgesOfGraph();
