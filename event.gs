function follow(event) {
  let userId = event.source.userId;
  let userProfiles = getUserProfiles(userId);
  let replyText =
    "สวัสดีคุณ " + userProfiles.displayName + " ให้น้องช่วยอะไรดีคะ";
  addMember(userProfiles);
  return replyMessages(event.replyToken, replyText);
}

function message(event) {
  const text = event.message.text;
  const userId = event.source.userId;
  return keywords(userId, text, event.replyToken);
}

function keywords(userId, text, replyToken = null) {
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
                label: "คอร์ด {{ชื่อเพลง}}",
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
          text: "ไม่พบคอร์ดเพลง",
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
  } else if (text.indexOf("คอร์ด") !== -1) {
    const name = text.replace(/^คอร์ด\s*/, "");
    const music = getMusic(name);
    if (!music) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "ไม่พบคอร์ดเพลง",
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

  return replyMessages(replyToken, "ไม่พบเมนูที่ต้องการ!");
}

function addComma(number, toFixed = 0) {
  number = Number(Math.round(Number(number) * 100) / 100);
  number = number.toFixed(toFixed).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return number;
}
