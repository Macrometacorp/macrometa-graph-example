# ✨ Macrometa Gaph Example with JavaScript SDK ✨

## 👀 Overview
This example demonstrates the ability of graph databases in analyzing and offering recommendations for items that are commonly purchased together. By establishing connections between customer and item vertices using edge collections, the graph is able to seamlessly and accurately deliver tailored recommendations to customers who have bought a particular item.

![graph-image](https://user-images.githubusercontent.com/113168755/227571338-408c956b-7139-4250-b11e-f773b1f94650.png)

In the graph that we created customers Dino and Durga bought the same items. The graph is able to recommend items to Dallas based on the items that Dino and Durga bought. This is a simple example of how graph databases can be used to offer recommendations to customers.

## ❓ How to use this demo
You can use this demo to understand how to use Macrometa SDK to create graph database and perform operations on it.
In sample data folder you will find sample data that you can use to import in Macrometa GDN. We suggest that you follow steps explained in [Graph setup](#graph-setup) section to import data and create graph. After that you can interact with graph using scripts in `create`, `read`, `update` and `delete` folders. (CRUD operations on graph) 

## 🚀 Run it Locally

### Prerequisites

1. Create a free [Macrometa account](https://auth-play.macrometa.io/sign-up)
2. You will have to have **Node.js 14 (or later)** installed in your system. Run the following command in your CLI to check your Node.js version.

```
node -v
```

### Initial setup

1. Open a CLI and run the command below to clone this repository. You can do:

```
git clone https://github.com/Macrometacorp/macrometa-graph-example.git
```

or

```
git clone git@github.com:Macrometacorp/macrometa-graph-example.git
```

depending on your GitHub authentication method.

2. Create a new `.env` file and add your environment variables on your selected path.  
Here is how `.env` file should look like:

```
BASE_URL=https://play.paas.macrometa.io/
API_KEY=<your-api-key>
FABRIC=<your-fabric-name> (default: _system)
```

**Note**: `.env.sample` is only a sample file that you can also use as a guide.

3. Install the project dependencies with:

```
npm install
```
### Graph setup

1. Create two document collections in Macrometa GDN using Macrometa console.
    - `groceryItems`
    - `groceryCustomers`

2. Create one edge collection in Macrometa GDN.
    - `groceryOrders`

3. Import test data from `sample-data` folder in Macrometa GDN.

4. Import `sample-data/import-query.json` in Macrometa GDN using Macrometa console.

5. Run `create/create-graph.js` to create graph in Macrometa GDN.

6. Run `graph-query.js` to run graph query and get recommendations.

## ❓ Query explanation

@name is a bind variable that can be set to any item name. In this example we have set it to `peanut butter`.
First we are filtering by item name and then collecting all the users who purchased that item. Then we are collecting all the items that were purchased by those users. We are filtering out the item that we are looking (`peanut butter`) for and sorting the result by the number of times it was purchased.

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

First recommendation according to this query is `jelly` which is purchased by 2 users. Second recommendation is `napkins` which is purchased by 2 users. Third recommendation is `strawberry` which is purchased by 2 users.

## Dataset

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

Grocery Orders collection sample. (`groceryOrders`)
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
If you have any trouble or need help while using demo contact [product@macrometa.com](mailto:support@macrometa.com).

## 📜 License
This demo is distributed under the MIT license found in the [LICENSE](LICENSE.md) file.
