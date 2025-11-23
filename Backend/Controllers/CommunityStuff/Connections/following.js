const User = require("../../../Models/UserSchema"); // your user model

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user._id;       // user who is sending request
    const targetUserId = req.params.id;    // user to follow

    if (followerId.toString() === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    // Fetch both users
    const follower = await User.findById(followerId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following or request pending
    const alreadyFollowing = follower.followings.some(
      f => f.followedByYou.toString() === targetUserId
    );

    if (alreadyFollowing) {
      return res.status(400).json({ message: "You already sent a follow request or already follow this user" });
    }

    // Determine acceptance based on privacy settings
    const isAccepted = targetUser.isPrivate ? false : true;

    // Add to your followings
    follower.followings.push({
      followedByYou: targetUserId,
      dateOfFollowing: new Date().toISOString(),
      isAccepted
    });

    // Add to target user followers
    targetUser.followers.push({
      followedBy: followerId,
      dateOfFollow: new Date().toISOString(),
      followInvitationStatus: isAccepted
    });

    await follower.save();
    await targetUser.save();

    if (isAccepted) {
      return res.status(200).json({ message: "You now follow this user automatically (public account)" });
    } else {
      return res.status(200).json({ message: "Follow request sent (private account)" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

















