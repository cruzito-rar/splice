const Messages = require("../models/messageModel");

module.exports.addMessage = async (request, response, next) => {
  try {
    const { from, to, message } = request.body;
    const data = await Messages.create({
      users : [from, to],
      message : {
        text: message
      },
      sender : from
    });

    if(data) return response.json({message : "Message added successfully"});
    return response.json({message : "Failed to add message into the database"});
  } catch(ex) {
    next(ex)
  }
}

module.exports.getAllMessages = async (request, response, next) => {}