# ✨ Macrometa Graph Example with JavaScript SDK ✨

This example demonstrates the ability of graph databases in analyzing and
offering recommendations for items that are commonly purchased together. By
establishing connections between customer and item vertices using edge
collections, the graph is able to seamlessly and accurately deliver tailored
recommendations to customers who have bought a particular item.

![graph-image](/images/graph-image.png)

Customers Dino and Durga bought the same items. We are able to traverse the
graph and recommend items to Dallas based on the items that Dino and
Durga bought. This is a simple example of how graph databases can be used to
offer recommendations to customers.

## ❓ How to use this demo

You can use this demo to understand how to use Macrometa SDK to create graph
database and perform operations on it. In the sample data folder, you will find
sample data that you can use to import in Macrometa GDN. We suggest that you
follow the steps explained in [Graph data setup](#graph-data-setup) section to import data and
create a graph. After that,  you can interact with the graph using the scripts in `create`,
`read`, `update`, and `delete` folders. (CRUD operations on graph)

## 🚀 Run It Locally

### Prerequisites

- Create a free [Macrometa account](https://auth-play.macrometa.io/sign-up)
- You need **Node.js 14 (or later)** installed in your system. Run
   the following command in your CLI to check your Node.js version.

```
node -v
```

### Initial Setup

In this paragraph, we will explain how to clone this repository and set up environment variables.

1. Open a terminal window and run the command below to clone this repository. You can do:

```
git clone https://github.com/Macrometacorp/macrometa-graph-example.git
```

or

```
git clone git@github.com:Macrometacorp/macrometa-graph-example.git
```

depending on your GitHub authentication method.

2. Create a new `.env` file and add your environment variables on your selected
   path.  
   Here is how `.env` file should look like:

```
BASE_URL=https://play.paas.macrometa.io/
API_KEY=<your-api-key>
FABRIC=<your-fabric-name> (default: _system)
```

**Note**: `.env.sample` is only a sample file that you can also use as a guide to create your own `.env`.

3. Install the project dependencies with:

```
npm install
```

### Graph Data Setup

1. Create two document collections in Macrometa GDN using Macrometa console.

   - `groceryItems`
   - `groceryCustomers`

2. Create one edge collection in Macrometa GDN using Macrometa console.

   - `groceryOrders`

3. Import test data from `sample-data` folder in Macrometa GDN.

4. Import `sample-data/import-query.json` in Macrometa GDN using Macrometa
   console.

Example how to import data in Macrometa GDN using Macrometa console:
![Create Collection](/images/create-collection.png)

![Import Data](/images/import-data.png)

Example how to import query in Macrometa GDN using Macrometa console:

![Import Query](/images/import-query-1.png)

![Import Query](/images/import-query-2.png)

### Create Graph and Run Queries with JavaScript SDK

You can run the following scripts in terminal or in your preferred IDE.

Example how to run scripts in terminal (please make sure that you are in root):

```bash
node create/create-graph.js
```

```bash
node graph-query.js
```

> **Note**: Please make sure that you have created graph and imported data in and run commands in order.
> First we need to create a graph than query the graph, otherwise you will get error.



1. Run `create/create-graph.js` to create graph in Macrometa GDN.
    - This script will create a graph with name `grocery-graph` and add two
      vertex collections (`groceryItems` and `groceryCustomers`) and one edge
      collection (`groceryOrders`) to it.

2. Run `graph-query.js` to run graph query and get recommendations.
    - This script will run a graph query to get recommendations for item
      `peanut butter`. You can change the item name in the script to get
      recommendations for other items.

### Adding Additional Vertex and Edge

In this section, we will demonstrate how to add a new vertex and edge to the graph. You can execute the following scripts in the terminal or your preferred IDE.

1. Execute `create/create-vertex.js` to add a new vertex to Macrometa GDN.
    - This script will insert a new vertex into both the `groceryCustomers` and `groceryItems` collections.
    - Example data for `groceryCustomers`: `{_key: "C16", name: "John Harris"}`
    - Example data for `groceryItems`: `{_key: "P21", name: "Avocado"}`

2. Execute `create/create-edge.js` to add a new edge to Macrometa GDN.
    - This script will insert a new edge into the `groceryOrders` collection.
    - Example data for `groceryOrders`: `{_key: "4117657859", _from: "groceryCustomers/C16", _to: "groceryItems/P21"}`

> **Note**: If you run these scripts multiple times, you may encounter an error. This is because we are using the same vertex and edge names. To avoid this error and add new data to the graph, you can modify the names of the vertex and edge within the script. To execute this code without an error, you need to delete the existing vertex and edge from the graph first (if using the same names).

## ❓ Explanation of the Query 

In this section we will explain the query that we have used to get recommendations.

### Query

```
// Query: Find the most popular item in the grocery store based on the number of users who purchased it
LET doc = (FOR d in groceryItems FILTER d.name == @name RETURN d)[0]
FOR user IN 1..1 INBOUND doc groceryOrders
    FOR item IN 1..1 OUTBOUND user groceryOrders
        COLLECT i=item.name WITH COUNT INTO c
        FILTER i != @name
        SORT c DESC
        // LIMIT 2
        RETURN {"item": i, "count": c}   // item -> number of users who purchased it
                                         // count -> number of times it was purchased
```

@name is a bind variable that can be set to any item name. In this example we
have set it to `peanut butter`. First we are filtering by item name and then
collecting all the users who purchased that item. Then we are collecting all the
items that were purchased by those users. We are filtering out the item that we
are looking (`peanut butter`) for and sorting the result by the number of times
it was purchased.

### Result

If bind variable `@name` is set to `peanut butter` then result will be:

```
[
  { item: 'jelly', count: 2 },
  { item: 'napkins', count: 2 },
  { item: 'strawberry', count: 2 },
  { item: 'banana', count: 1 },
  { item: 'milk', count: 1 },
  { item: 'celery', count: 1 },
  { item: 'bread', count: 1 },
  { item: 'white claw', count: 1 },
  { item: 'kiwi', count: 1 },
  { item: 'ketchup', count: 1 },
  { item: 'apple', count: 1 }
]
```

First recommendation according to this query is `jelly` which is purchased by 2
users. Second recommendation is `napkins` which is purchased by 2 users. Third
recommendation is `strawberry` which is purchased by 2 users.

## Example of Dataset

Grocery Customers collection sample. (`groceryCustomers`)

```
{
    "_key": "C01",
    "name": "John Doe"
},
{
    "_key": "C02",
    "name": "Jane Smith"
},
{
    "_key": "C03",
    "name": "David Lee"
},
{
    "_key": "C04",
    "name": "Amanda Chen"
}
...
```

Grocery Items collection sample. (`groceryItems`)

```
{
    "_key": "P01",
    "name": "orange"
},
{
    "_key": "P02",
    "name": "strawberry"
},
{
    "_key": "P07",
    "name": "apple"
},
{
    "_key": "P05",
    "name": "beer"
}
...
```

Grocery Orders collection sample. (`groceryOrders` -> this is an edge
collection)

**Note**: `_from` and `_to` are specific fields of edge collection.

```
{
    "_from": "groceryCustomers/C01",
    "_key": "4117657795",
    "_to": "groceryItems/P03"
},
{
    "_from": "groceryCustomers/C02",
    "_key": "4117657796",
    "_to": "groceryItems/P10"
},
{
    "_from": "groceryCustomers/C03",
    "_key": "4117657797",
    "_to": "groceryItems/P02"
},
{
    "_from": "groceryCustomers/C04",
    "_key": "4117657798",
    "_to": "groceryItems/P09"
}
...
```

## 🆘 Macrometa Support

If you have any trouble or need help while using demo contact
[support@macrometa.com](mailto:support@macrometa.com).

## 📜 License

This demo is distributed under the MIT license found in the
[LICENSE](LICENSE.md) file.
