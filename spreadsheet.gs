// SpreadsheetApp ---->

// AddFunction
function addLog(event) {
  const sheetFile = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetFile.getSheetByName("logs");
  const isRow = sheet.getLastRow() + 1;
  sheet.getRange(isRow, 1).setValue(dateTimeNow());
  sheet.getRange(isRow, 2).setValue(VERSION);
  sheet.getRange(isRow, 3).setValue(event.type);
  sheet.getRange(isRow, 4).setValue(event.source.type);
  if (event.source.type == "group") {
    sheet.getRange(isRow, 5).setValue(event.source.groupId);
  } else if (event.source.type == "user") {
    sheet.getRange(isRow, 5).setValue(event.source.userId);
  }
  sheet.getRange(isRow, 6).setValue(JSON.stringify(event));
}

function addLogError(title, data) {
  const sheetFile = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetFile.getSheetByName("errorLogs");
  const isRow = sheet.getLastRow() + 1;
  sheet.getRange(isRow, 1).setValue(dateTimeNow());
  sheet.getRange(isRow, 2).setValue(VERSION);
  sheet.getRange(isRow, 3).setValue(title);
  sheet.getRange(isRow, 4).setValue(JSON.stringify(data));
}

function addMember(userProfiles) {
  const sheetFile = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetFile.getSheetByName("members");
  const lastRow = sheet.getLastRow();

  // ดึงข้อมูล
  const members = sheet
    .getRange(2, 1, lastRow, sheet.getLastColumn())
    .getValues();

  let isRow = lastRow + 1;
  let isNewUser = true;

  // every - some - forEach
  members.some((member, index) => {
    if (member[0] === userProfiles.userId) {
      isRow = index + 2;
      isNewUser = false;
      return true;
    }
  });

  // เพื่ม หรืออับเดต
  sheet.getRange(isRow, 1).setValue(userProfiles.userId);
  sheet.getRange(isRow, 2).setValue(userProfiles.displayName);
  sheet.getRange(isRow, 3).setValue(userProfiles.pictureUrl);
  sheet.getRange(isRow, 4).setFormula("=image(C" + isRow + ")");
  sheet.getRange(isRow, 5).setValue(JSON.stringify(userProfiles));
}

function addMusic() {
  //
}

// GetFunction
function getMusic(text) {
  const sheetFile = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetFile.getSheetByName("music");
  const lastRow = sheet.getLastRow();

  // ดึงข้อมูล
  const musics = sheet
    .getRange(2, 1, lastRow, sheet.getLastColumn())
    .getValues();

  let musicData = null;

  // every - some - forEach
  musics.some((music, index) => {
    if (music[0] === text || music[1].includes(text)) {
      musicData = music;
      return true;
    }
  });

  if (!musicData) {
    return musicData;
  }

  musics.some((music, index) => {
    if (music[1].includes(text)) {
      musicData = music;
      return true;
    }
  });

  return musicData;
}

// SetFunction
// function setPromptPay(userId, number) {
//   const sheetFile = SpreadsheetApp.getActiveSpreadsheet();
//   const sheet = sheetFile.getSheetByName("members");
//   const lastRow = sheet.getLastRow();

//   let isRow = lastRow + 1;

//   // ดึงข้อมูล
//   const members = sheet
//     .getRange(2, 1, lastRow, sheet.getLastColumn())
//     .getValues();
//   // every - some - forEach
//   members.some((member, index) => {
//     if (member[0] === userId) {
//       isRow = index + 2;
//       return true;
//     }
//   });

//   sheet.getRange(isRow, 7).setValue(String(number));
// }

// DateFunction
function dateTimeNow(date = new Date()) {
  // const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
}

// SpreadsheetApp ---->
