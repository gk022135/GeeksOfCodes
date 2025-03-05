

function MakePost (){
    return (
        <div>
            
        </div>
    )
}

export default MakePost;

/**
 * what is logi behind the making the post 
 * requirement 
 * 1. user email ---> resolve by localstorage 
 * 2. post text data ----> resolve by input fields
 * 3. if any image ---> how can be resolve this
 *       1. upload image to cloudinary get image url
 *       2. then make object which contains text data and image url 
 *   but how can we get image url at the same time of making posts
 */

/**
 * making schema 
 *   1. schema one which contains all post with user id 
 *   2. in user schema add a userPosts array which contains post _id in this array of user only
 * 
 *   for like
 *  make a likeCount Array in posts which contains user id who has been like to the paritcular post
 *   similar for dislike
 *   
 * comment 
 * make array of object which contains
 *  const arrayOfcomment = {
 * _id : userid
 *   comment : postId
 *   commentBody : " comment text here"
 * }
 *  
 */