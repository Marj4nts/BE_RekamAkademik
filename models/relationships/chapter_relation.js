const tbl = require("../../models");

const chapter_relation = [
    {
      model: tbl.chapter_headers,
      as: "chapter_header",
      attributes: ["id","chapter_id", "name"],
      include: [
        {
          model: tbl.chapter_rows,
          as: "chapter_rows",
          attributes: ["id","chapter_header_id", "desc", "input_type"],
        },
      ],
    },
  ];
  

module.exports = chapter_relation;