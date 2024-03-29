const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    required: true
  }
},
  {
    timestamps: true,
  });

StorySchema.pre("validate", function (next) {
  const post = this;

  if (post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }

  next();
});

module.exports = mongoose.model('story', StorySchema);