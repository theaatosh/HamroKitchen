const user = require("../models/index");
const { runPythonFunction } = require("../algorithm/test");

const foodRec = async (req, res) => {
  const { userId } = req.user;
  // console.log("hi")
  try {
    // console.log(userId);
    const rec = await user.findById(userId, { _id: 0, recData: 1 });
    const recData = Object.values(rec.recData);
    const data = await runPythonFunction(recData);
    // const finalData = data
    // .replace(/[\[\]']/g, '')
    // .split(',')
    // .map(id => id.trim());
    // console.log("this:"+finalData);

    // console.log(typeof(finalData))
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { foodRec };
