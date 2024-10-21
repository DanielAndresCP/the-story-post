import { loadHeaderAndFooter, renderDynamicElementList } from "./template-loading/utils.js"
import PostCard from "./template-loading/PostCard.js"
import CommentCard from "./template-loading/Comment.js"

loadHeaderAndFooter()


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

renderDynamicElementList(
    {
        sourceData: posts,
        parentNode: document.querySelector('[data-dyn-id="post-grid"]'),
        DynElementClass: PostCard
    })


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


renderDynamicElementList(
    {
        sourceData: comments,
        parentNode: document.querySelector('[data-dyn-id="comment-list"]'),
        DynElementClass: CommentCard
    })