function follow(event) {
  let userId = event.source.userId;
  let userProfiles = getUserProfiles(userId);
  let replyText = "สวัสดีคุณ " + userProfiles.displayName + " รับอะไรดีคะ";
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
    return replyMessages(replyToken, "userId ของคุณคือ " + userId);
  } else if (text === "เมนู") {
    // แสดงเมนูให้เลือก
    return replyMessages(replyToken, [
      {
        type: "text",
        text: "กรุณาเลือกเมนูที่ต้องการ",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "คอร์ด {ชื่อเพลง}",
                text: "คอร์ด {ชื่อเพลง}",
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
    
    return replyMessages(replyToken, [
      {
        type: "text",
        text: "กรุณานำ QR code นี้แสกนที่เครื่อง",
      },
      {
        type: "image",
        originalContentUrl: QR_URL + userId,
        previewImageUrl: QR_URL + userId,
      },
    ]);
    //   } else if (text == "เช็คคะแนน") {
    //     const totalPoint = getTotalPoint(userId);
    //     return replyMessages(replyToken, "คะแนนของคุณคือ " + addComma(totalPoint));
    //   } else if (text == "เช็คประวัติ") {
    //     const limit = 3;
    //     const memberHistorys = getMemberHistorys(userId, limit);
    //     let messages = [
    //       {
    //         type: "text",
    //         text: "ประวัติการทำรายการ\n" + limit + " รายการล่าสุด",
    //       },
    //     ];
    //     memberHistorys.some((memberHistory, index) => {
    //       messages.push({
    //         type: "text",
    //         text:
    //           memberHistory[0] +
    //           "\n" +
    //           memberHistory[1] +
    //           "\n" +
    //           memberHistory[2] +
    //           " " +
    //           memberHistory[3] +
    //           "P",
    //       });
    //     });
    //     return replyMessages(replyToken, messages);
    //   } else if (text == "เช็คการแลกคะแนน") {
    //     const limit = 3;
    //     const exchangeRequests = getExchangeRequests(userId, limit);
    //     let messages = [
    //       {
    //         type: "text",
    //         text: "การแลกคะแนนของคุณ\n" + limit + " รายการล่าสุด",
    //       },
    //     ];
    //     exchangeRequests.some((exchangeRequest, index) => {
    //       messages.push({
    //         type: "text",
    //         text:
    //           exchangeRequest[0] +
    //           "\nขอแลกคะแนน " +
    //           exchangeRequest[2] +
    //           "P เป็นเงิน " +
    //           exchangeRequest[3] +
    //           " บาท" +
    //           "\nพร้อมเพย์: " +
    //           exchangeRequest[4] +
    //           "\nสถานะ: " +
    //           exchangeRequest[5],
    //       });
    //     });
    //     return replyMessages(replyToken, messages);
    //   } else if (text == "แลกคะแนน") {
    //     // เช็คพร้อมเพย์
    //     const promptPay = getPromptPay(userId);
    //     if (!promptPay) {
    //       return replyMessages(replyToken, [
    //         {
    //           type: "text",
    //           text: "กรุณากรอกหมายเลขพร้อมเพย์",
    //         },
    //         {
    //           type: "text",
    //           text: "พิมพ์ PP-หมายเลขพร้อมเพย์\nตัวอย่าง PP-123456789",
    //         },
    //       ]);
    //     }
    //     // เช็คการตั้งค่าแต้ม
    //     const exchangeRate = getExchangeRate();
    //     if (!exchangeRate || exchangeRate <= 0) {
    //       return replyMessages(replyToken, "กรุณาทำรายการอีกครั้งภายหลัง");
    //     }
    //     // แสดงเมนูให้เลือก
    //     return replyMessages(replyToken, [
    //       {
    //         type: "text",
    //         text: "กรุณาเลือกจำนวนที่ต้องการ",
    //         quickReply: {
    //           items: [
    //             {
    //               type: "action",
    //               action: {
    //                 type: "message",
    //                 label: "20 บาท -" + addComma(20 * exchangeRate) + "P",
    //                 text: "แลกคะแนน-20",
    //               },
    //             },
    //             {
    //               type: "action",
    //               action: {
    //                 type: "message",
    //                 label: "50 บาท -" + addComma(50 * exchangeRate) + "P",
    //                 text: "แลกคะแนน-50",
    //               },
    //             },
    //             {
    //               type: "action",
    //               action: {
    //                 type: "message",
    //                 label: "100 บาท -" + addComma(100 * exchangeRate) + "P",
    //                 text: "แลกคะแนน-100",
    //               },
    //             },
    //             {
    //               type: "action",
    //               action: {
    //                 type: "message",
    //                 label: "200 บาท -" + addComma(200 * exchangeRate) + "P",
    //                 text: "แลกคะแนน-200",
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     ]);
  } else if (text.indexOf("คอร์ด") !== -1) {
    // เช็คพร้อมเพย์
    const promptPay = getPromptPay(userId);
    if (!promptPay) {
      return replyMessages(replyToken, [
        {
          type: "text",
          text: "กรุณากรอกหมายเลขพร้อมเพย์",
        },
        {
          type: "text",
          text: "พิมพ์ PP-หมายเลขพร้อมเพย์\nตัวอย่าง PP-123456789",
        },
      ]);
    }
    // เช็คการตั้งค่าแต้ม
    const exchangeRate = getExchangeRate();
    if (!exchangeRate || exchangeRate <= 0) {
      return replyMessages(replyToken, "กรุณาทำรายการอีกครั้งภายหลัง");
    }
    // ตัดข้อความ
    const textSplit = text.split("-");
    if (!textSplit[1]) {
      return replyMessages(replyToken, "ไม่พบจำนวนเงินที่ต้องการ");
    }
    // จำนวนเงิน
    const amount = Number(textSplit[1]);
    const totalPoint = getTotalPoint(userId);
    const exchangePoint = amount * exchangeRate;
    // เช็คคะแนนคงเหลือ
    if (exchangePoint > totalPoint) {
      return replyMessages(
        replyToken,
        "คะแนนไม่เพียงพอ\nคะแนนของคุณคือ " + addComma(totalPoint) + "P",
      );
    }
    // เพิ่มการแลกคะแนน
    addExchange(userId, exchangePoint, amount);
    return replyMessages(
      replyToken,
      "แลกคะแนนสำเร็จ\nกรุณารอการโอนเงินจากแอดมิน",
    );
  }
  return replyMessages(replyToken, "ไม่พบเมนูที่ต้องการ!");
}

function addComma(number, toFixed = 0) {
  number = Number(Math.round(Number(number) * 100) / 100);
  number = number.toFixed(toFixed).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return number;
}
