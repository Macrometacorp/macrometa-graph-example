# ✨ Macrometa Gaph Example with JavaScript SDK ✨

## 👀 Overview
This example demonstrates the ability of graph databases in analyzing and offering recommendations for items that are commonly purchased together. By establishing connections between customer and item vertices using edge collections, the graph is able to seamlessly and accurately deliver tailored recommendations to customers who have bought a particular item.

![graph-image](https://user-images.githubusercontent.com/113168755/227571338-408c956b-7139-4250-b11e-f773b1f94650.png)

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

1. Create two document collections in Macrometa GDN.
    - `groceryItems`
    - `groceryCustomers`

2. Create one edge collection in Macrometa GDN.
    - `groceryOrders`

3. Import test data from `sample-data` folder in Macrometa GDN.

4. Import `sample-data/import-query.json` in Macrometa GDN.

5. Run `create/create-graph.js` to create graph in Macrometa GDN.

6. Run `graph-query.js` to run graph query and get recommendations.

## 🆘 Macrometa Support
If you have any trouble or need help while using demo contact [product@macrometa.com](mailto:support@macrometa.com).

## 📜 License
This demo is distributed under the MIT license found in the [LICENSE](LICENSE.md) file.
