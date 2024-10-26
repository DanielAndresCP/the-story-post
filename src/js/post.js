import { getSearchParams, loadHeaderAndFooter, turnAPIPostDataIntoSinglePostData, turnAPICommentDataIntoCommentData, turnPostAPIDataIntoPostCardData } from "./utils.js"
import SinglePost from "./page-content-loading/SinglePost.js"
import PostData from "./data-fetching/PostData.js"

loadHeaderAndFooter()

const urlParams = getSearchParams()
const random = urlParams.get("random")
const postId = urlParams.get("id")

// If there is no post to get, we redirect to the homepage
if (!random && !postId) {
    window.location.pathname = ""
}

const postAPIDataLogic = new PostData()

// We set post data, depending if a random or specific post was requested
let postData = null
if (random) {
    const apiData = await postAPIDataLogic.getRandomPosts(1)

    postData = turnAPIPostDataIntoSinglePostData(apiData.posts[0])
} else {
    const apiData = await postAPIDataLogic.getPost(postId)

    postData = turnAPIPostDataIntoSinglePostData(apiData)
}


const postLogic = new SinglePost(postData)
postLogic.renderMainContent()


const commentData = await postAPIDataLogic.getPostComments({ postId: postData.id })
const comments = commentData.comments.map(turnAPICommentDataIntoCommentData)
postLogic.renderComments(comments)


// We get and filter the related posts
const rawRelatedPosts = []
for (const tag of postData.tags) {
    const tagPosts = await postAPIDataLogic.getPostsByTag({ tagId: tag, amount: 3 })
    rawRelatedPosts.push(...tagPosts.posts)
}

// TODO ADD THIS TO THE SKILL ASSESMENT
const uniqueRelatedPosts = rawRelatedPosts.filter((x, i, srcArray) => {
    // We find the index of the first element with this id, and if it is the
    // the same as the id of the object we are checking, it means that it is the first
    // appearence, and therefore unique. If it appears again it will not be unique
    const isFirst = srcArray.findIndex((temp) => temp.id === x.id) === i

    // If it is the same post we are reading, we don't show it
    const isTheSamePost = postData.id === x.id
    return isFirst && !isTheSamePost
})

postLogic.renderRelatedPosts(uniqueRelatedPosts.map(turnPostAPIDataIntoPostCardData))