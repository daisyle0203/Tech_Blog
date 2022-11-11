const router = require("express").Router()
const { Post, User, Comment } = require("../../models")
const withAuth = require("../../utils/auth")

// GET /api/post, get all the posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      //'created_at from Post timestamps: true (default)
      attributes: ["id", "title", "post_text", "created_at"],
      order: [["created_at", "DESC"]], // show latest post first
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: { model: User, attributes: ["username"] },
        },
      ],
    })
    res.status(200).json(postData)
  } catch (error) {
    res.status(400).json(error)
  }
})

// GET /api/post/id,, get a single post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "post_text", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: { model: User, attributes: ["username"] },
        },
      ],
    })
    if (!postData) {
      res.status(404).json({ message: `No posts with id ${req.params.id}` })
      return
    }
    res.status(200).json(postData)
  } catch (error) {
    res.status(400).json(error)
  }
})

// POST /api/post, create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    })

    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json(error)
  }
})

// PUT api/post/id, update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id" })
      return
    }

    res.json(updatedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE api/post/id , delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })

    if (!postData) {
      res
        .status(404)
        .json({
          message: `No post owned by user_id = ${req.session.user_id} found with id = ${req.params.id}`,
        })
      return
    }

    res.status(200).json(postData)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
