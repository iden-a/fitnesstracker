"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/users")
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})


router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/exercise", async function (req, res, next) {
  try {
    const exercise = await User.exercise(req.body)
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err)
  }
})

router.post("/nutrition", async function (req, res, next) {
  try {
    console.log("iden")
    const nutrition = await User.nutrition(req.body)
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.post("/sleep", async function (req, res, next) {
  try {
    const user = await User.sleep(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

module.exports = router