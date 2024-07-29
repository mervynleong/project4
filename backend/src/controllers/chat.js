const { pgquery } = require("../database/db");

const createChatPGBuyer = async (req, res) => {
  try {
    const { text_content } = req.body;
    const from_who = req.decoded.username;
    const item_uuid = req.params.item_uuid;

    const selectSellerQuery =
      "SELECT seller_username FROM item WHERE item_uuid= $1";
    const data = await pgquery.query(selectSellerQuery, [item_uuid]);
    // to access the sellerusername: data.rows[0].seller_username
    // Insert new chat
    const insertQuery =
      "INSERT INTO personnel_chat (text_content, from_who, to_who, item_uuid) VALUES ($1, $2, $3, $4)";
    await pgquery.query(insertQuery, [
      text_content,
      from_who,
      data.rows[0].seller_username,
      item_uuid,
    ]);
    res.json({ status: "ok", msg: "chat content created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid chat input" });
  }
};

const deleteChatPG = async (req, res) => {
  try {
    const chat_table_id = req.params.chat_table_id;
    // Check if item exists
    const checkQuery = "SELECT * FROM personnel_chat WHERE chat_table_id = $1";
    const { rows } = await pgquery.query(checkQuery, [chat_table_id]);
    console.log(rows);
    if (rows[0].chat_table_id === chat_table_id) {
      const deleteQuery = "DELETE FROM personnel_chat WHERE chat_table_id = $1";
      await pgquery.query(deleteQuery, [chat_table_id]);
    }
    res.json({ status: "ok", msg: "chat deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid deletion" });
  }
};

const replyChatPG = async (req, res) => {
  try {
    const { text_content } = req.body;
    const from_who = req.decoded.username;
    const item_uuid = req.params.item_uuid;

    const selectFromQuery =
      "SELECT from_who FROM personnel_chat WHERE item_uuid=$1";

    const selectToQuery =
      "SELECT to_who FROM personnel_chat WHERE item_uuid =$1";
    // checking if there is an input in the rows first
    const checkQuery = "SELECT * FROM personnel_chat WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);
    if (rows.length <= 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "no chat initiated by buyer yet" });
    }
    if (req.decoded.type === "SELLER") {
      const data = await pgquery.query(selectFromQuery, [item_uuid]);
      const to_who = data.rows[0].from_who;
      if (from_who !== to_who) {
        console.log(data.rows);
        // this is kvp of {from_who: }
        console.log(to_who);
        // this the first kvp of {from_who: }

        // Insert new chat
        const insertQuery =
          "INSERT INTO personnel_chat (text_content, from_who, to_who, item_uuid) VALUES ($1, $2, $3, $4)";
        await pgquery.query(insertQuery, [
          text_content,
          from_who,
          to_who,
          item_uuid,
        ]);
      }
    } else if (req.decoded.type === "BUYER") {
      const data2 = await pgquery.query(selectToQuery, [item_uuid]);
      const to_who2 = data2.rows[0].to_who;
      console.log(to_who2);
      if (from_who !== to_who2) {
        const insertQuery2 =
          "INSERT INTO personnel_chat (text_content, from_who, to_who, item_uuid) VALUES ($1, $2, $3, $4)";
        await pgquery.query(insertQuery2, [
          text_content,
          from_who,
          to_who2,
          item_uuid,
        ]);
      }
    }
    res.json({ status: "ok", msg: "chat content created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid chat input" });
  }
};

const getChatwithItemId = async (req, res) => {
  try {
    const item_uuid = req.params.item_uuid;
    const getAllQuery =
      "SELECT pc.text_content, pc.from_who, pc.to_who, pc.timestamp AS timestamp FROM personnel_chat pc INNER JOIN item i ON pc.item_uuid = i.item_uuid INNER JOIN statuses s ON i.status = s.status INNER JOIN personnel p_seller ON i.seller_username = p_seller.username LEFT JOIN personnel p_buyer ON i.buyer_username = p_buyer.username WHERE i.item_uuid = $1 ORDER BY pc.timestamp ASC;";
    const result = await pgquery.query(getAllQuery, [item_uuid]);
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid request" });
  }
};

const getAllChatToUser = async (req, res) => {
  try {
    const related = req.decoded.username;
    const getAllQuery =
      "SELECT DISTINCT ON (item_uuid) pc.chat_table_id, pc.item_uuid, i.status, i.item_name, i.description, i.sell_price, i.buy_price FROM personnel_chat pc JOIN item i ON pc.item_uuid = i.item_uuid WHERE (pc.from_who = $1 OR pc.to_who= $1) ORDER BY pc.item_uuid, pc.chat_table_id ASC";
    const result = await pgquery.query(getAllQuery, [related]);
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid request" });
  }
};

const updateChatwithChatId = async (req, res) => {
  try {
    const { text_content } = req.body;
    const chat_table_id = req.params.chat_table_id;
    // Check if chat exists
    const checkQuery = "SELECT * FROM personnel_chat WHERE chat_table_id = $1";
    const { rows } = await pgquery.query(checkQuery, [chat_table_id]);
    console.log(rows);
    if (rows[0].chat_table_id === chat_table_id) {
      // Check if requested user is the exact user
      const checkUserQuery =
        "SELECT from_who FROM personnel_chat WHERE chat_table_id = $1";
      const result = await pgquery.query(checkUserQuery, [chat_table_id]);
      console.log(result.rows[0].from_who);
      if (req.decoded.username === result.rows[0].from_who) {
        const updateQuery =
          "UPDATE personnel_chat SET text_content = $1 WHERE chat_table_id = $2";
        await pgquery.query(updateQuery, [text_content, chat_table_id]);
      } else {
        res.json({ status: "error", msg: "You are not the original sender" });
      }
    }
    res.json({ status: "ok", msg: "chat updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid update" });
  }
};

module.exports = {
  createChatPGBuyer,
  replyChatPG,
  deleteChatPG,
  getChatwithItemId,
  updateChatwithChatId,
  getAllChatToUser,
};
