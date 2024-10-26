import { loadHeaderAndFooter, renderDynamicElementList } from "./utils";
import PostCard from "./template-loading/PostCard";
import AuthorCard from "./template-loading/AuthorCard"
import TagPill from "./template-loading/Tag";

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
        parentNode: document.querySelector('[data-dyn-id="favorite-posts-grid"]'),
        DynElementClass: PostCard
    })

const authors = [
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    },
    {
        authorLink: "/search?author=something",
        authorImgSrc: "/img/placeholder.jpg",
        authorName: "User #16",
    }
]

renderDynamicElementList(
    {
        sourceData: authors,
        parentNode: document.querySelector('[data-dyn-id="favorite-authors-grid"]'),
        DynElementClass: AuthorCard
    })


const tags = [
    { tagName: "magical", tagLink: '/search?tag="magical"' },
    { tagName: "history", tagLink: '/search?tag="magical"' },
    { tagName: "french", tagLink: '/search?tag="magical"' }
]

renderDynamicElementList(
    {
        sourceData: tags,
        parentNode: document.querySelector('[data-dyn-id="favorite-tags-list"]'),
        DynElementClass: TagPill
    })