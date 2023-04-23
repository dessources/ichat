/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("ichat");
db.users.deleteMany({ id: { $exists: true } });
// db.users.dropIndex({ username: 1 }, { unique: true });
// db.users.createIndex(
//   { username: 1 },
//   { unique: true, collation: { locale: "en_US", strength: 2 } }
// );
// db.users.insertOne({ username: "Da_KOder", name: "hacker", password: "thisnuts" });
// Inserrt a few documents into the sales collection.
// validator["$or"] = []

// validator["$or"].push(
//   {
//     profilePicture: {
//       $type: "string",
//     },
//   },
//   {
//     chats: {
//       $type: "array",
//     },
//   }
// );

// db.runCommand({
//   collMod: "users",
//   validator: validator,
//   validationLevel: "strict",
// });
// db.getCollectionInfos({ name: "users" })[0].options.validator;
// db.users.insertOne({
//   name: " user",
//   username: "user",
//   password: "password",
//   profilePicture: "someurl",
// });

// db.runCommand({
//   collMod: "users",
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["username", "password", "name"],
//       properties: {
//         username: {
//           bsonType: "string",
//           minLength: 2,
//           description: "must be a string and is required",
//         },
//         password: {
//           bsonType: "string",
//           minLength: 8,
//           description: "must be a string  and is required",
//         },
//         name: {
//           bsonType: "string",
//           minLength: 2,
//           description: "must be a string  and is required",
//         },

//         profilePicture: {
//           bsonType: "string",
//           description: "must be a string",
//         },
//         chats: {
//           bsonType: "array",

//           description: "must be a string",
//         },
//         online: {
//           bsonType: "bool",
//           description: "must be a boolean",
//         },
//       },
//     },
//   },
// });
// db.getCollectionInfos({ name: "users" })[0];
