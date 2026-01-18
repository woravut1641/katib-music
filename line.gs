// Line API ---->
function sendMessage(userId, messages) {
  try {
    const url = "https://api.line.me/v2/bot/message/push";
    const data = {
      to: userId,
      messages:
        typeof messages === "string"
          ? [
              {
                type: "text",
                text: messages,
              },
            ]
          : messages,
    };
    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      payload: JSON.stringify(data),
    });
    if (response.getResponseCode() !== 200) {
      addLogError(
        "sendMessage...ErrorCode " + response.getResponseCode(),
        response,
      );
    }
  } catch (error) {
    addLogError("sendMessage...ErrorCatch", error.name + " : " + error.message);
  }
  return Logger.log("sendMessage...");
}

function sendMessages(userIdArr, messages) {
  try {
    const url = "https://api.line.me/v2/bot/message/multicast";
    const data = {
      to: userIdArr,
      messages:
        typeof messages === "string"
          ? [
              {
                type: "text",
                text: messages,
              },
            ]
          : messages,
    };
    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      payload: JSON.stringify(data),
    });
    if (response.getResponseCode() !== 200) {
      addLogError(
        "sendMessages...ErrorCode " + response.getResponseCode(),
        response,
      );
    }
  } catch (error) {
    addLogError(
      "sendMessages...ErrorCatch",
      error.name + " : " + error.message,
    );
  }
  return Logger.log("sendMessages...");
}

function replyMessages(token, messages) {
  if (!messages) {
    return false;
  }
  try {
    const url = "https://api.line.me/v2/bot/message/reply";
    const data = {
      replyToken: token,
      messages:
        typeof messages === "string"
          ? [
              {
                type: "text",
                text: messages,
              },
            ]
          : messages,
    };
    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      payload: JSON.stringify(data),
    });
    if (response.getResponseCode() !== 200) {
      addLogError(
        "replyMessages...ErrorCode " + response.getResponseCode(),
        response,
      );
    }
  } catch (error) {
    addLogError(
      "replyMessages...ErrorCatch",
      error.name + " : " + error.message,
    );
  }
  return Logger.log("replyMessages...");
}

function broadcastMessages(messages) {
  try {
    const url = "https://api.line.me/v2/bot/message/broadcast";
    const data = {
      messages: messages,
    };
    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      payload: JSON.stringify(data),
    });
    if (response.getResponseCode() !== 200) {
      addLogError(
        "broadcastMessages...ErrorCode " + response.getResponseCode(),
        response,
      );
    }
  } catch (error) {
    addLogError(
      "broadcastMessages...ErrorCatch",
      error.name + " : " + error.message,
    );
  }
  return Logger.log("broadcastMessages...");
}

function getUserProfiles(userId) {
  const url = "https://api.line.me/v2/bot/profile/" + userId;
  const responseJson = UrlFetchApp.fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
  });
  return JSON.parse(responseJson);
}
// Line API ---->
