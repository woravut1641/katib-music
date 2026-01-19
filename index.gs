const TOKEN =
  "Bearer iVv1T+452hCqNg2Tg2Z054v458N+TgaI1sOgjUUpIyRGTxoOsCIX6fe786u6YgiOp4Cvfie9u1YWsQ6uQOifIqAtgwJjTrVdhqeJ5zFmf7PPDgDJoE5tx7ItrNfr3QAOrEkEChF3cYs8GJAdJW56BQdB04t89/1O/w1cDnyilFU=";
const VERSION = 2;

const basicChords = [
  // Major
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C#",
  "D#",
  "F#",
  "G#",
  "A#",
  "Db",
  "Eb",
  "Gb",
  "Ab",
  "Bb",

  // Minor
  "Cm",
  "Dm",
  "Em",
  "Fm",
  "Gm",
  "Am",
  "Bm",
  "C#m",
  "D#m",
  "F#m",
  "G#m",
  "A#m",
  "Dbm",
  "Ebm",
  "Gbm",
  "Abm",
  "Bbm",
];

const seventhChords = [
  "C7",
  "D7",
  "E7",
  "F7",
  "G7",
  "A7",
  "B7",
  "C#7",
  "D#7",
  "F#7",
  "G#7",
  "A#7",
  "Db7",
  "Eb7",
  "Gb7",
  "Ab7",
  "Bb7",
];

const minor7Chords = [
  "Cm7",
  "Dm7",
  "Em7",
  "Fm7",
  "Gm7",
  "Am7",
  "Bm7",
  "C#m7",
  "D#m7",
  "F#m7",
  "G#m7",
  "A#m7",
  "Dbm7",
  "Ebm7",
  "Gbm7",
  "Abm7",
  "Bbm7",
];

const major7Chords = [
  "Cmaj7",
  "Dmaj7",
  "Emaj7",
  "Fmaj7",
  "Gmaj7",
  "Amaj7",
  "Bmaj7",
  "C#maj7",
  "D#maj7",
  "F#maj7",
  "G#maj7",
  "A#maj7",
  "Dbmaj7",
  "Ebmaj7",
  "Gbmaj7",
  "Abmaj7",
  "Bbmaj7",
];

const susChords = [
  // sus2
  "Csus2",
  "Dsus2",
  "Esus2",
  "Fsus2",
  "Gsus2",
  "Asus2",
  "Bsus2",

  // sus4
  "Csus4",
  "Dsus4",
  "Esus4",
  "Fsus4",
  "Gsus4",
  "Asus4",
  "Bsus4",
];

const dimAugChords = [
  // Diminished
  "Cdim",
  "Ddim",
  "Edim",
  "Fdim",
  "Gdim",
  "Adim",
  "Bdim",

  // Augmented
  "Caug",
  "Daug",
  "Eaug",
  "Faug",
  "Gaug",
  "Aaug",
  "Baug",
];

const extendedChords = [
  "Cadd9",
  "Dadd9",
  "Eadd9",
  "Fadd9",
  "Gadd9",
  "Aadd9",
  "Badd9",
  "C6",
  "D6",
  "E6",
  "F6",
  "G6",
  "A6",
  "B6",
  "C9",
  "D9",
  "E9",
  "F9",
  "G9",
  "A9",
  "B9",
];

const allGuitarChords = [
  ...basicChords,
  ...seventhChords,
  ...minor7Chords,
  ...major7Chords,
  ...susChords,
  ...dimAugChords,
  ...extendedChords,
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const events = data.events;
    if (events) {
      events.forEach((event) => {
        addLog(event);
        if (event.type === "follow") {
          follow(event);
        } else if (event.type === "join") {
          join(event);
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

// function doGet(e) {
//   try {
//     const text = getMusic("BIRDS");
//     Logger.log(text);
//     return ContentService.createTextOutput(
//       JSON.stringify(text),
//     ).setMimeType(ContentService.MimeType.JSON);
//   } catch (error) {
//     addLogError(
//       "doPost...ErrorCatch",
//       error.name + " : " + error.message + " : " + error.stack,
//     );
//     return ContentService.createTextOutput(
//       JSON.stringify({ status: "error", message: error.message }),
//     ).setMimeType(ContentService.MimeType.JSON);
//   }
// }

function test() {
  const rehearsals = getRehearsals();
  if (!rehearsals) {
    return Logger.log("ไม่พบวันซ้อม");
  }

  const tz = Session.getScriptTimeZone();
  let arrRehearsals = [];

  rehearsals.forEach((rehearsal) => {
    const date = Utilities.formatDate(rehearsal[0], tz, "yyyy-MM-dd");
    const start = rehearsal[1];
    const end = rehearsal[2];

    const startTime = Utilities.formatDate(start, tz, "HH:mm:ss");
    const endTime = Utilities.formatDate(end, tz, "HH:mm:ss");
    const hours = (end - start) / (1000 * 60 * 60);

    const arr = [
      "วันที่: " + date,
      "จำนวน: " + hours + " ชั่วโมง",
      "เริ่ม: " + startTime,
      "ถึง: " + endTime,
    ];

    arrRehearsals.push(arr.join("\n"));
  });

  return Logger.log(arrRehearsals.join("\n\n"));
}
