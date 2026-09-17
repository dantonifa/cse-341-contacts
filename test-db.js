const { MongoClient } = require("mongodb");
require("dotenv").config();

async function runTest() {
  console.log("Starting database discovery test...");
  console.log(
    "Using URI:",
    process.env.MONGODB_URI
      ? "URI detected successfully"
      : "No URI found in .env",
  );

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("=========================================");
    console.log("✅ SUCCESS: Connected to MongoDB Atlas!");

    // List all databases available with your credentials
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    console.log("\n1. Databases available on your cluster:");
    dbList.databases.forEach((db) => console.log(`   - ${db.name}`));

    // Test the specific database we want
    const targetDbName = "cse-341-contacts";
    const db = client.db(targetDbName);

    console.log(`\n2. Inspecting database: "${targetDbName}"`);
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log(`   ❌ WARNING: No collections found in "${targetDbName}"!`);
    } else {
      console.log(`   Available collections inside "${targetDbName}":`);
      for (let col of collections) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`   - ${col.name} (${count} documents found)`);
      }
    }
    console.log("=========================================");
  } catch (error) {
    console.error("❌ ERROR DURING TEST:", error.message);
  } finally {
    await client.close();
    process.exit();
  }
}

runTest();
