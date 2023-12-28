const slugify = require('slugify');

function generateSlug(name) {
  // Use the slugify library to create a slug from the name
  const slug = slugify(name, {
    replacement: '',  
    lower: true        // convert to lowercase
  });

  return slug;
}

module.exports = generateSlug;
