import { loadHeaderAndFooter } from "./template-loading/utils.js"
import SinglePost from "./page-content-loading/SinglePost.js"

loadHeaderAndFooter()

// This will be replaced with dynamic content
const postData = {
    img: "/img/placeholder.jpg",
    title: "Dave watched as the forest burned up on the hill.",
    id: "251",
    content: `Dave watched as the forest burned up on the hill,
            only a few miles from her house. The car had been
            hastily packed and Marta was inside trying to round
            up the last of the pets. Dave went through his
            mental list of the most important papers and documents
            that they couldn't leave behind. He scolded
            himself for not having prepared these better in
            advance and hoped that he had remembered everything
            that was needed. He continued to wait for Marta to
            appear with the pets, but she still was nowhere
            to be seen.`,
    authorCardLink: "/search?author=something",
    authorCardImg: "/img/placeholder.jpg",
    authorCardName: "User #16",
    views: "4152",
    likes: "1448",
    dislikes: "39"
}
const postLogic = new SinglePost(postData)
postLogic.renderMainContent()

// This will be replaced with dynamic content
const tags = [
    { tagName: "magical", tagLink: '/search?tag="magical"' },
    { tagName: "history", tagLink: '/search?tag="magical"' },
    { tagName: "french", tagLink: '/search?tag="magical"' }
]

postLogic.renderTags(tags)

// This will be replaced with dynamic content
const comments = [
    {
        authorUsername: "@jhonDoe",
        authorDisplayName: "A guy",
        commentContent: "This is some comment",
        commentLikes: 784
    },
    {
        authorUsername: "@theMumboJumbo",
        authorDisplayName: "Mumbo Jumbo",
        commentContent: "Peace, Love and Plants",
        commentLikes: 784
    }
]

postLogic.renderComments(comments)


// This will be replaced with dynamic content
const posts = [
    {
        imgSrc: "/img/placeholder.jpg",
        title: "This is a title",
        extract: "If only i knew how to read binary"
    },
    {
        imgSrc: "/img/placeholder.jpg",
        title: "This is a title",
        extract: "If only i knew how to read binary"
    },
    {
        imgSrc: "/img/placeholder.jpg",
        title: "This is a title",
        extract: "If only i knew how to read binary"
    },
    {
        imgSrc: "/img/placeholder.jpg",
        title: "This is a title",
        extract: "If only i knew how to read binary"
    }
]

postLogic.renderRelatedPosts(posts)