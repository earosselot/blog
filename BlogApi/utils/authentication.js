function isAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Not autorized to view the resourse' });
  }
}

function isAdmin(req, res, next) {
  if (req.isAutenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ message: 'Not autorized to view the resourse' });
  }
}

function isAdminOrOwner(reqUser, postUser) {
  const isOwner = postUser._id.toString() === reqUser._id.toString();
  const isAdmin = reqUser.admin;

  if (!isAdmin && !isOwner) {
    const error = new Error('Not authorized');
    error.status = 401;
    throw error;
  }
}

export { isAuth, isAdmin, isAdminOrOwner };
