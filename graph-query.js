const jsc8 = require("jsc8");

client = new jsc8({
  url: "https://play.macrometa.io/",
  apiKey:
    "dino.lozina_macrometa.com.GRAPH_TEST.EyGXWmQejr4U0nAvYgTc1oKforMbvJ23bsmS6AOmB2qEWI7YXGzHk0mpnQ7Lqd3ba5b8a0",
  fabricName: "_system",
});

async function queryGraph() {
  // Query has bind variables that we need to provide as a second argument
  response = await client.executeRestql("grocery-recomendations", {
    name: "peanut butter",
  });
  console.log(response.result);
}
queryGraph();
