/** Routes for authentication. */

const express = require("express")
const User = require("../models/users")
const {generateToken} = require("../utils/tokens")

const security = require("../middleware/security")
const router = express.Router()

router.post("/me", async function (req, res, next) {
  console.log('in /me ')
  try {
    const { email } = req.body;
    const user = await User.fetchUserByEmail(email)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    const token = generateToken(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    const token = generateToken(user)
    return res.status(200).json({ user, token })
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
    const nutrition = await User.nutrition(req.body)
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.post("/sleep", async function (req, res, next) {
  try {
    const sleep = await User.sleep(req.body)
    return res.status(201).json({ sleep })
  } catch (err) {
    next(err)
  }
})

module.exports = router