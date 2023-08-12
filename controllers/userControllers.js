const jwt = require("jsonwebtoken");

const User = require("../db/models/userModel");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
    return;
  }

  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.hashPassword(password);

  await newUser.save();

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) { 
        res.status(401).json({ message: 'There is no user with such email or password' });
        return
    };

    const compareResult = await user.comparePassword(password);
    if (!compareResult) {
        res.status(401).json({ message: 'There is no user with such email or password' });
        return;
    }

    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        user: {
            name:user.name,
            email: user.email
        },
        token
    });

}

module.exports = { signup, login};
