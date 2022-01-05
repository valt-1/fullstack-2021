const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined

  let favorite = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) favorite = blogs[i]
  }

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
