const express = require("express");

const router = express.Router();

router.post("/calculate", async (req, res) => {
  if (Number(req.body.num1) < 0 || Number(req.body.num2) < 0) {
    return res.status(500).send("Please enter positive digits");
  }
  try {
    let x = req.body.num1;
    let y = req.body.num2;
    let obj = {};
    let count = 1;
    x = x.toString();
    y = y.toString();
    let n = [];
    let m = [];
    if (x.length > y.length) {
      for (let i = 0; i < x.length; i++) {
        n.push(x[i]);
        m.push(y[i]);
      }
    } else {
      for (let i = 0; i < y.length; i++) {
        n.push(x[i]);
        m.push(y[i]);
      }
    }

    let v = n.length - 1;
    while (n[v] == undefined) {
      n.pop();
      v = n.length - 1;
    }
    let b = m.length - 1;
    while (m[b] == undefined) {
      m.pop();
      b = m.length - 1;
    }
    if (x.length > y.length) {
      let z = x.length - y.length;
      for (let i = 0; i < z; i++) {
        m.unshift(0);
      }
    } else {
      let z = y.length - x.length;
      for (let i = 0; i < z; i++) {
        n.unshift(0);
      }
    }

    console.log(n, m);
    // for(let i = 0;i<x.)
    let summ = [];
    let carry = [];
    for (let i = n.length - 1; i >= 0; i--) {
      let sum = Number(n[i]) + Number(m[i]);
      // console.log(Number(n[i]),Number(m[i]),m[i],i,m)
      // console.log(sum,i)
      if (carry.length != 0) {
        sum += Number(carry[0]);
      }
      if (sum >= 10) {
        // console.log(sum%10)
        if (i == 0) {
          summ.unshift(sum % 10);
          summ.unshift(1);
        } else {
          carry.unshift(1);

          summ.unshift(sum % 10);
        }
      } else {
        if (i == 0) {
          summ.unshift(sum);
        } else {
          carry.unshift(0);
          summ.unshift(sum);
        }
      }

      console.log(carry, summ, i);
      let k = carry.join("");
      let l = summ.join("");

      obj[`step${count}`] = {
        carryString: `${k}_`,
        sumString: `${l}`,
      };
      count++;
    }
    console.log(obj);
    return res.status(200).send(obj);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
