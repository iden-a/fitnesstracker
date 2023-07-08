"use strict"

const db = require("../database")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
// const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds

    const user = await User.fetchUserByEmail(email)
    const exercise = await User.allExercise(user.id)
    const {totalExercise, avgIntensity} = await User.exerciseStats(user.id)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        const userInfo =  User._createPublicUser(user)
        return {exercise, userInfo}
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, username, first_name, last_name, password} = creds

    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
      `INSERT INTO users (
          email, 
          username, 
          first_name, 
          last_name,
          password
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING   id,
                    email,
                    first_name , 
                    last_name 
                  `,
      [ normalizedEmail, username, first_name, last_name, hashedPassword]
    )

    const user = result.rows[0]

    return user
  }

  static async nutrition (creds) {
    const { user_id, name, category, quantity, calories, image_url} = creds

    const result = await db.query(
      `INSERT INTO nutrition (
          user_id,
          name, 
          category, 
          quantity, 
          calories,
          image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name,
                  category,
                  quantity,
                  calories,
                  image_url 
                  `,
      [user_id,name, category, quantity, calories, image_url]
    )

    const nutrition = result.rows[0]

    return nutrition
  }

  static async exercise (creds) {
    const { user_id, name, category, duration, intensity} = creds

    const result = await db.query(
      `INSERT INTO exercise (
          user_id,
          name, 
          category, 
          duration, 
          intensity
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING name,
                  category,
                  duration,
                  intensity,
                  created_at
                  `,
      [user_id, name, category, duration, intensity]
    )

    const exercise = result.rows[0]

    return exercise
  }

  static async sleep (creds) {
    const { user_id, start_time, end_time } = creds

    const result = await db.query(
      `INSERT INTO sleep (
          user_id,
         start_time,
         end_time
        )
        VALUES ($1, $2, $3 )
        RETURNING start_time,
                  end_time
                  `,
      [user_id, start_time, end_time]
    )

    const sleep = result.rows[0]

    return sleep
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name,
              last_name 

           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name,
              last_name,
                        
           FROM users
           WHERE id = $1`,
      [userId]
    )

    const user = result.rows[0]

    return user

  }
  
  static async allExercise (id) {
      const exercise = await db.query (
        `SELECT name,
        duration, 
        intensity, 
        created_at
           FROM exercise
           WHERE user_id = $1
           ORDER BY created_at DESC`,
           [id]
      );

      const allExercise = exercise.rows

      return allExercise 

    }

    static async exerciseStats (idInfo) {
     const {id} = idInfo;
    const totalExerciseMin = await db.query(
        `SELECT SUM(duration) AS total_exercise_minutes
         FROM exercise 
         WHERE user_id = $1 `,
           [id]
      );

      let totalExercise;
      if (totalExerciseMin.rows[0].total_exercise_minutes === null ) {
        totalExercise = 0;
      } else {
        totalExercise = totalExerciseMin.rows[0].total_exercise_minutes;
      } 

      const avgExerciseIntens = await db.query (
        `SELECT AVG(intensity) as avg_exercise_intensity
        FROM exercise
        WHERE user_id =$1`,
        [id]
        );

        let avgIntensity;
        if (avgExerciseIntens.rows[0].avg_exercise_intensity === null ) {
          avgIntensity = 0;
        } else {
          avgIntensity = avgExerciseIntens.rows[0].avg_exercise_intensity;
        } return {totalExercise:totalExercise, avgIntensity:avgIntensity};
      }
}

module.exports = User