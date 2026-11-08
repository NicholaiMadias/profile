const fs = require("fs");
const yaml = require("js-yaml");

const properties = yaml.load(
  fs.readFileSync("data/properties.yml", "utf8")
);

for (const property of properties) {
  if (
    !property.address ||
    !property.city ||
    !property.state ||
    !property.zip
  ) {
    throw new Error(
      `Incomplete property definition: ${property.address}`
    );
  }
}

console.log(`Validated ${properties.length} properties.`);
