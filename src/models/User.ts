import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  age: Number,
  nationality: String,
  qualification: String,
  curr_institution: String,
  major: String,
  grad_year: Number,
  pref_country: String,
  pref_course: String,
  univ_interest: String,
  intake_season: String,
  applied: Boolean,
  needs_assistance: Boolean,
  waiver_interest: Boolean,
  channel: String,
  questions: String,
}, { collection: "UserData" });

const User = models.User || model("User", userSchema);
export default User;
