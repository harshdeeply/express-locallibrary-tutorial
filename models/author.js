const { DateTime } = require("luxon");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// Virtual for author's date of birth
AuthorSchema.virtual("birth_date").get(function () {
  if (!this.date_of_birth) {
    return "Date unavailable";
  } else return this.date_of_birth.getFullYear();
});

// Virtual for author's date of death
AuthorSchema.virtual("death_date").get(function () {
  if (!this.date_of_death) {
    return "Date unavailable";
  } else return this.date_of_death.getFullYear();
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  if (!this.date_of_death || !this.date_of_birth) {
    return "Date(s) unavailable";
  } else return this.date_of_birth.getFullYear() + " - " + this.date_of_death.getFullYear();
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

AuthorSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});
//Export model
module.exports = mongoose.model("Author", AuthorSchema);
