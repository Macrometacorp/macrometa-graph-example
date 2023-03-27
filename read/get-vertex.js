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

// Please be sure that vertex collection and vertex have been created before running this script.
async function getVertexFromVertexCollection() {
  const response = await client.getVertexFromVertexCollection(
    "grocery-graph",
    "groceryCustomers",
    "C16"
  );
  console.log(response);
}
getVertexFromVertexCollection();
