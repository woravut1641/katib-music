function follow(event) {
  let userId = event.source.userId;
  let userProfiles = getUserProfiles(userId);
  let replyText =
    "สวัสดีคุณ " + userProfiles.displayName + " ให้น้องช่วยอะไรดีคะ";
  addMember(userProfiles);
  return replyMessages(event.replyToken, replyText);
}

function join(event) {
  let replyText = "สวัสดีพี่ๆทุกคน ให้น้องช่วยอะไรดีคะ";
  return replyMessages(event.replyToken, replyText);
}

function message(event) {
  const text = event.message.text;
  const userId = event.source.userId;
  const isGroup = event.source.type === "group";
  return keywords(userId, text, event.replyToken, isGroup);
}

function keywords(userId, text, replyToken = null, isGroup = false) {
  if (text === "userId") {
    return replyMessages(replyToken, "userId ของคุณคือ \n" + userId);
  } else if (text === "เมนู" || text === "น้องๆ") {
    // แสดงเมนูให้เลือก
    return replyMessages(replyToken, [
      {
        type: "text",
        text:
          text === "เมนู"
            ? "เลือกเมนูที่ต้องการได้เลยจ้า"
            : "สวัสดีคุณพี่ รับอะไรดีคะ",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "วิธีจับคอร์ด",
                text: "จับคอร์ด {{ชื่อคอร์ด}}",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "หาคอร์ดเพลง",
                text: "คอร์ด {{ชื่อเพลง}}",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "สุ่มเพลง",
                text: "สุ่มเพลง",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "วันซ้อม",
                text: "วันซ้อม",
              },
            },
          ],
        },
      },
    ]);
  } else if (text === "สุ่มเพลง") {
    const music = getMusicRandom();
    if (!music) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "ไม่พบคอร์ดเพลง ไปเพิ่มด้วยอย่าขี้เกียจ",
        },
      ]);
    }

    const arr = [
      "Chord: " + music[0],
      "Metronome: " + music[4],
      "Link: " + music[2],
    ];
    return replyMessages(replyToken, [
      {
        type: "text",
        text: arr.join("\n"),
      },
      {
        type: "image",
        originalContentUrl: music[3],
        previewImageUrl: music[3],
      },
    ]);
  } else if (text === "วันซ้อม") {
    const rehearsals = getRehearsals();
    if (!rehearsals) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "ไม่พบวันซ้อม จองดิรอไร",
        },
      ]);
    }

    const tz = Session.getScriptTimeZone();
    let arrRehearsals = [];

    rehearsals.forEach((rehearsal) => {
      const date = Utilities.formatDate(rehearsal[0], tz, "yyyy-MM-dd");
      const start = rehearsal[1];
      const end = rehearsal[2];

      const startTime = Utilities.formatDate(start, tz, "HH:mm");
      const endTime = Utilities.formatDate(end, tz, "HH:mm");
      const hours = (end - start) / (1000 * 60 * 60);

      const arr = [
        "วันที่: " + date,
        "จำนวน: " + hours + " ชั่วโมง",
        "เริ่ม: " + startTime,
        "ถึง: " + endTime,
      ];

      arrRehearsals.push(arr.join("\n"));
    });

    return replyMessages(replyToken, [
      {
        type: "text",
        text: arrRehearsals.join("\n\n"),
      },
    ]);
  } else if (text.indexOf("จับคอร์ด") !== -1) {
    const name = text.replace(/^จับคอร์ด\s*/, "");
    if (!allGuitarChords.includes(name)) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "ไม่พบคอร์ด อย่ามั่วๆ",
        },
      ]);
    }

    // const url = "https://chordtabs.in.th/img/chord/gt/webp/" + name + ".webp";
    let nameUrl = name.replace("#", "x");
    const url =
      "https://www.folkpeople.com/gt_chord/chord-image/" +
      nameUrl +
      "-Chord.jpg?v=01";
    return replyMessages(replyToken, [
      {
        type: "image",
        originalContentUrl: url,
        previewImageUrl: url,
      },
    ]);
  } else if (text.indexOf("คอร์ด") !== -1) {
    const name = text.replace(/^คอร์ด\s*/, "");
    const music = getMusic(name);
    if (!music) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "ไม่พบคอร์ดเพลง ไปเพิ่มด้วยอย่าขี้เกียจ",
        },
      ]);
    }

    const arr = [
      "Chord: " + music[0],
      "Metronome: " + music[4],
      "Link: " + music[2],
    ];
    return replyMessages(replyToken, [
      {
        type: "text",
        text: arr.join("\n"),
      },
      {
        type: "image",
        originalContentUrl: music[3],
        previewImageUrl: music[3],
      },
    ]);
  }

  if (isGroup) {
    return;
  }

  return replyMessages(replyToken, "ไม่พบเมนูที่ต้องการ!");
}

function addComma(number, toFixed = 0) {
  number = Number(Math.round(Number(number) * 100) / 100);
  number = number.toFixed(toFixed).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return number;
}
