const TOKEN =
  "Bearer iVv1T+452hCqNg2Tg2Z054v458N+TgaI1sOgjUUpIyRGTxoOsCIX6fe786u6YgiOp4Cvfie9u1YWsQ6uQOifIqAtgwJjTrVdhqeJ5zFmf7PPDgDJoE5tx7ItrNfr3QAOrEkEChF3cYs8GJAdJW56BQdB04t89/1O/w1cDnyilFU=";
const VERSION = 1;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const events = data.events;
    if (events) {
      events.forEach((event) => {
        addLog(event);
        if (event.type === "follow") {
          follow(event);
        } else if (event.type === "message") {
          message(event);
        }
      });
    }
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    addLogError(
      "doPost...ErrorCatch",
      error.name + " : " + error.message + " : " + error.stack,
    );
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const text = getUserProfiles("U3501afcbc63220dea81088f18475fcfd");
    Logger.log(text);
    return ContentService.createTextOutput(
      JSON.stringify(text),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    addLogError(
      "doPost...ErrorCatch",
      error.name + " : " + error.message + " : " + error.stack,
    );
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

