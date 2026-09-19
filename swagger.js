const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "Contacts API Documentation",
  },
  host: "cse-341-contacts-457w.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"]; // Make sure this points to your main routes file

// Generate the JSON file and then start the project
swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./index.js");
});
