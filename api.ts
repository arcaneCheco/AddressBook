import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import { randomUUID } from "crypto";

const app = express();

const PORT = 3001;

app.use(cors());

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  additionalFields: { [name: string]: string };
}

interface Data {
  contacts: Array<Contact>;
  additionalFields: Array<string>;
}

const jsonParser = bodyParser.json();

const readData = (): Data => {
  const data = fs.readFileSync("./data.json", { encoding: "utf8" });
  return JSON.parse(data);
};

const writeData = (data: Data) => {
  fs.writeFileSync("./data.json", JSON.stringify(data));
};

app.get("/getContacts", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/addContact", jsonParser, (req, res) => {
  const newContact: Contact = req.body;
  newContact.id = randomUUID();
  const data = readData();
  data.contacts.push(newContact);
  writeData(data);
  res.json("Added contact");
});

app.delete("/deleteContact", jsonParser, (req, res) => {
  const data = readData();
  const { id }: { id: string } = req.body;
  data.contacts = data.contacts.filter((contact) => contact.id !== id);
  writeData(data);
  res.json("Contact deleted");
});

app.put("/editContact", jsonParser, (req, res) => {
  const data = readData();
  const contactData: Contact = req.body.contact;

  for (let i = 0; i < data.contacts.length - 1; i++) {}
  const index = data.contacts.findIndex(
    (contact) => contact.id === contactData.id
  );
  data.contacts[index] = contactData;

  writeData(data);
  res.json("Contact edit saved");
});

app.post("/addField", jsonParser, (req, res) => {
  const newField: string = req.body.field;
  const data = readData();
  data.additionalFields.push(newField);
  data.contacts = data.contacts.map((contact) => {
    contact.additionalFields[newField] = "";
    return contact;
  });
  writeData(data);
  res.json("Added new field");
});

app.delete("/deleteField", jsonParser, (req, res) => {
  const fieldToDelete: string = req.body.field;
  const data = readData();
  const index = data.additionalFields.indexOf(fieldToDelete);
  data.additionalFields.splice(index, 1);

  data.contacts = data.contacts.map((contact) => {
    delete contact.additionalFields[fieldToDelete];
    return contact;
  });
  writeData(data);
  res.json("Deleted field");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
