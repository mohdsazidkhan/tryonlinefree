const express = require("express");
const User = require("../models/users");
const Categories = require("../models/categories");
const Articles = require("../models/articles");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const cloudinary = require("../cloudinary");
const uploader = require("../multer");

router.post("/register", async (req, res) => {
  let { name, phone, email, password } = req.body;
  let userType = "user";
  if (password) {
    password = await bcrypt.hash(password, salt);
  }
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(400).json({
        success: false,
        error: {
          name: "Register",
          message: "Email already exists",
        },
      });
    } else {
    let user = new User({ name, phone, email, password, userType });
    user
      .save()
      .then((user) => {
        res.status(201).json({
          success: true,
          message: "User Created successfully!",
          data: user,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
          success: false,
        });
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // we made a function to verify our user login
  const response = await verifyUserLogin(email, password);
  if (response.status === true) {
    // storing our JWT web token as a cookie in our browser
    res.status(201).json({
      success: response.status,
      name: "Login",
      message: "User Login Successfully!",
      data: response.data,
    });
  } else {
    res.json(response);
  }
});

router.get("/user-detail/:userId", async function (req, res) {
  let user = await User.findById(req?.params?.userId).select("-password");
  if (user) {
    res.status(201).json({
      success: true,
      message: "User Detail Get successfully!",
      data: user,
    });
  }
});

router.post("/add-article", uploader.single("image"), async (req, res) => {
  if (req.body) {
    let {
      title,
      categoryId,
      categoryName,
      tags,
      content,
      userId,
      userName,
      userEmail,
    } = req.body;
    tags = tags.split(",");

    var slug = title;
    slug = slug.replace(/[^a-zA-Z0-9\s]/g, "");
    slug = slug.toLowerCase();
    slug = slug.replace(/\s/g, "-");
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    let image = upload.secure_url;
    let article = new Articles({
      image,
      title,
      slug,
      categoryId,
      categoryName,
      tags,
      content,
      userId,
      userName,
      userEmail,
    });
    article
      .save()
      .then((article) => {
        res.status(201).json({
          success: true,
          message: "Article Created successfully!",
          data: article,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
          success: false,
        });
      });
  }
});

router.post(
  "/updateArticle/:articleId",
  uploader.single("image"),
  async (req, res) => {
    //console.log(req.body, " req.body");
    if (req.body) {
      let {
        title,
        image,
        categoryId,
        categoryName,
        tags,
        content,
        userId,
        userName,
        userEmail,
      } = req.body;

      tags = tags.split(",");

      var slug = title;
      slug = slug.replace(/[^a-zA-Z0-9\s]/g, "");
      slug = slug.toLowerCase();
      slug = slug.replace(/\s/g, "-");

      if (req.file) {
        const upload = await cloudinary.v2.uploader.upload(req.file.path);
        image = upload.secure_url;
      }

      if (
        title ||
        categoryId ||
        categoryName ||
        tags ||
        content ||
        userId ||
        userName ||
        userEmail ||
        image ||
        slug
      ) {
        Articles.findByIdAndUpdate(req.params.articleId, {
          $set: {
            title,
            image,
            categoryId,
            categoryName,
            tags,
            content,
            userId,
            userName,
            userEmail,
            slug,
          },
        })
          .then((article) => {
            res.status(201).json({
              success: true,
              message: "Article Update successfully!",
              data: article,
            });
          })
          .catch((error) => {
            res.status(401).json({
              error,
            });
          });
      } else {
        res.status(401).json({
          success: false,
          message: "Article Not Updated",
          data: [],
        });
      }
    }
  }
);

router.get("/deleteArticle/:id", async (req, res) => {
  Articles.findByIdAndDelete({ _id: req.params.id }, function (err, article) {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        message: "Article Deleted successfully!",
        data: article,
      });
  });
});

router.post("/updateProfile", uploader.single("image"), async (req, res) => {
  if (req.body) {
    let {
      userId,
      name,
      email,
      phone,
      image,
      github,
      linkedin,
      facebook,
      instagram,
      twitter,
    } = req.body;

    if (req.file) {
      const upload = await cloudinary.v2.uploader.upload(req.file.path);
      image = upload.secure_url;
    }

    if (
      image ||
      name ||
      email ||
      phone ||
      github ||
      linkedin ||
      facebook ||
      instagram ||
      twitter
    ) {
      User.findByIdAndUpdate(userId, {
        $set: {
          image: image,
          name: name,
          email: email,
          phone: phone,
          github: github ? github : "",
          linkedin: linkedin ? linkedin : "",
          facebook: facebook ? facebook : "",
          instagram: instagram ? instagram : "",
          twitter: twitter ? twitter : "",
        },
      })
        .then((user) => {
          res.status(201).json({
            success: true,
            message: "User Update successfully!",
            data: user,
          });
        })
        .catch((error) => {
          res.status(401).json({
            error,
          });
        });
    } else {
      res.status(401).json({
        success: false,
        message: "User Not Updated",
        data: [],
      });
    }
  }
});

router.get("/all-categories", function (req, res) {
  Categories.find({}, function (err, categories) {
    if (err) return done(err);

    if (categories) {
      res.status(201).json({
        success: true,
        message: "Categories Get successfully!",
        data: categories,
      });
    }
  }).sort({createdAt:-1});
});

router.get("/all-tags", function (req, res) {
  Articles.find({}, function (err, articles) {
    if (err) return res.send(err);
    if (articles) {
      res.status(201).json({
        success: true,
        message: "Tags Get successfully!",
        data: articles,
      });
    }
  }).projection({ tags: 1 });
});

router.get("/article/:id", function (req, res) {
  Articles.findById(req.params.id, function (err, article) {
    if (err)
      res.status(201).json({
        err,
      });
    if (article) {
      res.status(201).json({
        success: true,
        message: "Article Get successfully!",
        data: article,
      });
    }
  });
});

router.get("/category-articles/:id", function (req, res) {
  Articles.find({ categoryId: req.params.id }, function (err, articles) {
    if (err) return done(err);

    if (articles) {
      res.status(201).json({
        success: true,
        message: "Article Get successfully!",
        data: articles,
      });
    }
  });
}).sort({createdAt:-1});

router.get("/tag-articles/:tag", async function (req, res) {
  let articles = await Articles.find({});
  articles = articles?.filter(function (elm) {
    return elm?.tags?.indexOf(req?.params?.tag.toLowerCase()) >= 0;
  });
  //console.log(articles, " articles");
  if (articles) {
    res.status(201).json({
      success: true,
      message: "Article Get successfully!",
      data: articles,
    });
  }
});

router.get("/user-articles/:userId", async function (req, res) {
  let articles = await Articles.find({ userId: req?.params?.userId });
  if (articles) {
    res.status(201).json({
      success: true,
      message: "Article Get successfully!",
      data: articles,
    });
  }
}).sort({createdAt:-1});

router.get("/all-articles", function (req, res) {
  Articles.find({}, function (err, articles) {
    if (err) return res.send(err);
    if (articles) {
      res.status(201).json({
        success: true,
        message: "Articles Get successfully!",
        data: articles,
      });
    }
  }).sort({createdAt:-1});
});

router.get("/all-users", function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.send(err);
    if (users) {
      res.status(201).json({
        success: true,
        message: "Users Get successfully!",
        data: users,
      });
    }
  }).select("-password").sort({createdAt:-1});
});

const verifyUserLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return { status: "error", error: "user not found" };
    }
    if (await bcrypt.compare(password, user.password)) {
      // creating a JWT token
      token = jwt.sign(
        { id: user._id, username: user.email, type: "user" },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      return {
        status: true,
        token: token,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
          token: token,
        },
      };
    }
    return { status: "error", error: "invalid password" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

module.exports = router;
