const mongoose = require("mongoose");

const BlacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token to be required to be added in blacklist"],
    },
  },
  {
    timestamps: true,
  },
);


const tokenBlacklistModel =  mongoose.model("blacklistTokens",BlacklistTokenSchema);

module.exports = tokenBlacklistModel;