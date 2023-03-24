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

// Please be sure that the vertex exists in collection before running this script.
async function updateVertex() {
  const response = await client.updateVertexFromVertexCollection(
    "grocery-graph",
    "groceryCustomers",
    "C16",
    {name: "Olivia Thompson"}
  )
  console.log(response)
}
updateVertex();
