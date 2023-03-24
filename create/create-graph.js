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

// Please be sure that edge collections and vertices have been created before running this script.
async function createGraph() {
  const response = await client.createGraph("grocery-graph", {
    edgeDefinitions: [
      {
        // Edge collection name --> This collection holds relationships between vertices
        collection: "groceryOrders",
        // Vertex collection that is used as the start vertex of the edge
        from: ["groceryCustomers"],
        // Vertex collection that is used as the start vertex of the edge
        to: ["groceryItems"],
      },
    ],
  });
  console.log(response);
}
createGraph();
