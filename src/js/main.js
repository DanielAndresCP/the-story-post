import { loadHeaderAndFooter, renderDynamicElementList, setupMap } from "./utils.js"
import PostCard from "./template-loading/PostCard.js"

loadHeaderAndFooter()

setupMap()

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