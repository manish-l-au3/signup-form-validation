const router = require("express").Router();
const bodyParser = require("../middlewares/bodyParser");
const httpErrors = require("../util/httpErrors");
const utilsValid = require("../utils/validator");

router.post("/signup", bodyParser, (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const isOk = validateBody(keys, values);
  if (isOk) res.status(httpErrors.BAD_REQUEST.statusCode).send(isOk);

  // if (len !== 15) res.send("some keys are missing");
  // for (let i in keys) {
  //   if (values[i] == 0) {
  //     console.log(values[i], " is null");
  //     // res.send(keys[i] + " is missing");
  //     return `${keys[i]} is missing`;
  //   } else {
  //     // console.log("key have some value");
  //   }
  // }

  utilsValid.signup(req.body).then(
    result => {
      console.log(result);
      res.status(httpErrors.OK.statusCode).send(result);
    },
    error => {
      console.log(error);
      res
        .status(httpErrors.BAD_REQUEST.statusCode)
        .send(httpErrors.BAD_REQUEST);
    }
  );
});

const validateBody = (keys, values) => {
  if (keys.length !== 15) return "some keys are missing";
  // should use "for of"
  // should use "for in" only when you need index
  for (let i in keys) {
    if (values[i] == 0) {
      console.log(values[i], " is null");
      return `${keys[i]} is missing`;
    }
  }
  return false;
};

module.exports = router;
