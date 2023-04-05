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

// Be sure that the graph and vertex collections have been created before running this script.
async function createVertexOfGraph() {
  const responseCustomerVertex = await client.addVertexToVertexCollection(
    "grocery-graph",
    "groceryCustomers",
    {
      _key: "C16",
      name: "John Harris",
    }
  );
  console.log(responseCustomerVertex);

  const responseItemVertex = await client.addVertexToVertexCollection(
    "grocery-graph",
    "groceryItems",
    {
      _key: "P21",
      name: "Avocado",
    }
  );
  console.log(responseItemVertex);
}
createVertexOfGraph();
