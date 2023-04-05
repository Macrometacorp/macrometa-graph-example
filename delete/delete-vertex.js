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

// Be sure that the graph, vertex collections, and edges have been created before running this script.
async function deleteVertex() {
  const responseCustomerVertex = await client.removeVertexFromVertexCollection(
    "grocery-graph",
    "groceryCustomers",
    "C16"
  );
  console.log(responseCustomerVertex);

  const responseItemVertex = await client.removeVertexFromVertexCollection(
    "grocery-graph",
    "groceryItems",
    "P21"
  );
  console.log(responseItemVertex);
}
deleteVertex();
