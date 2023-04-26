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

// Be sure that edge collection and edge have been created before running this script.
async function getEdgeFromEdgeCollection() {
  const response = await client.getGraph("grocery-graph");
  console.log(response);
}
getEdgeFromEdgeCollection();
