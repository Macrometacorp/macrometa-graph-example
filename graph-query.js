const jsc8 = require("jsc8");
const dotenv = require("dotenv");

dotenv.config();

client = new jsc8({
  url: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  fabricName: process.env.FABRIC,
});

async function queryGraph() {
  // Query has bind variables that we need to provide as a second argument
  response = await client.executeRestql("grocery-recomendations", {
    name: "peanut butter",
  });
  console.log(response.result);
}
queryGraph();
