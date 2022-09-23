require('dotenv').config();

const axios = require("axios");

const today = new Date();

const openings = [
  "Well, hello there!",
  "Greetings, Earthlings!",
  "Pens at the ready!",
  "Hope you're ready for some inking!",
  "Beep! Boop! Time to ink!",
  "Beep! Boop! Time to ink!"
];

const topics = {
@@ -48,14 +51,15 @@ const finishings = [
  "Draw on inkers!",
  "The journey is as important as the destination.",
  "There is no competition - show us what you made.",
  "1... 2... 3... Ink!"
];

function constructMessage() {
  return `${selectRandomFrom(
    openings
  )} It is the ${getDate()} of Inktober and today's theme is ${
    topics[today.getDate()]
  }. ${selectRandomFrom(finishings)}`;
  const opening = selectRandomFrom(openings);
  const date = getDate();
  const theme = topics[today.getDate()];
  const closing = selectRandomFrom(finishings);
  return `${opening} It is the ${date} of Inktober and today's theme is **${theme}**. ${closing}`;
}

function selectRandomFrom(selection) {
@@ -92,12 +96,12 @@ const params = {
  content: constructMessage(),
};

function triggerWebhook() {
async function triggerWebhook() {
  return axios.post(process.env.DISCORD_WEB_HOOK, params);
}

exports.handler = async (event, context, callback) => {
  return triggerWebhook()
exports.handler = (event, context, callback) => {
  triggerWebhook()
    .then(() => {
      callback(null, {
        statusCode: 200,
@@ -113,4 +117,4 @@ exports.handler = async (event, context, callback) => {
        body: "Message failed with this error: " + err,
      });
    });
};
};
