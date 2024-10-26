import CommentCard from "../template-loading/Comment"
import PostCard from "../template-loading/PostCard"
import TagPill from "../template-loading/Tag"
import AuthorCard from "../template-loading/AuthorCard.js"
import { getDynamicElement, renderDynamicElementList, generateTagPillData } from "../utils.js"
import FavoriteActionBtn from "../template-loading/FavoriteActionBtn.js"


export default class SinglePost {
    dynContentIds = {
        img: "post-img",
        title: "post-title",
        id: "post-id-display",
        content: "post-content",
        authorCardContainer: "post-author-container",
        tagListContainer: "post-tag-list",
        views: "post-views",
        likes: "post-likes",
        dislikes: "post-dislikes",
        commentListContainer: "post-comment-list",
        relatedPostsContainer: "post-related-posts-grid",
        favoriteActions: "favorite-actions"
    }

    constructor({
        img,
        title,
        id,
        content,
        authorCardLink,
        authorCardImg,
        authorId,
        views,
        likes,
        dislikes,
        tags,
        favoriteManager
    }) {
        this.img = img
        this.title = title
        this.id = id
        this.content = content
        this.authorCardLink = authorCardLink
        this.authorCardImg = authorCardImg
        this.authorId = authorId
        this.views = Number(views)
        this.likes = Number(likes)
        this.dislikes = Number(dislikes)
        this.tags = tags
        // Te favorite manager comes from the main script level because if there's more than one favorite manager it explodes
        // Technically i could make it not have an internal state and use the localStorage as the single source of truth,
        // but i dont have time :(
        this.favoriteManager = favoriteManager
    }

    renderMainContent() {
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.src.value = this.img
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.alt.value = `Cover Image for "${this.title}" Post`
        getDynamicElement({ elemId: this.dynContentIds.title }).textContent = this.title
        getDynamicElement({ elemId: this.dynContentIds.id }).textContent = `(#${this.id})`
        getDynamicElement({ elemId: this.dynContentIds.content }).textContent = this.content

        const authorCardContainer = getDynamicElement({ elemId: this.dynContentIds.authorCardContainer })
        const authorCardLogic = new AuthorCard({ authorLink: this.authorCardLink, authorImgSrc: this.authorCardImg, authorName: `Author #${this.authorId}` })
        authorCardLogic.render(authorCardContainer)

        getDynamicElement({ elemId: this.dynContentIds.views }).textContent = this.views
        getDynamicElement({ elemId: this.dynContentIds.likes }).textContent = this.likes
        getDynamicElement({ elemId: this.dynContentIds.dislikes }).textContent = this.dislikes

        this.renderTags(this.tags.map(generateTagPillData))

        this.renderFavoriteActionsBtns()
    }

    renderFavoriteActionsBtns() {
        const post = {
            id: this.id,
            type: "post",
            favoriteManager: this.favoriteManager
        }

        const author = {
            id: this.authorId,
            type: "author",
            favoriteManager: this.favoriteManager
        }

        const tags = this.tags.map((x) => {
            return {
                id: x,
                type: "tag",
                favoriteManager: this.favoriteManager
            }
        })

        renderDynamicElementList({
            sourceData: [post, author, ...tags],
            parentNode: getDynamicElement({ elemId: this.dynContentIds.favoriteActions }),
            DynElementClass: FavoriteActionBtn
        })
    }

    renderTags(tags) {
        renderDynamicElementList({
            sourceData: tags,
            parentNode: getDynamicElement({ elemId: this.dynContentIds.tagListContainer }),
            DynElementClass: TagPill
        })
    }

    renderComments(comments) {
        const containerEl = getDynamicElement({ elemId: this.dynContentIds.commentListContainer })
        if (comments.length !== 0) {
            renderDynamicElementList({
                sourceData: comments,
                parentNode: containerEl,
                DynElementClass: CommentCard
            })
        } else {
            containerEl.textContent = "(No comments found)"
        }
    }


    renderRelatedPosts(relatedPosts) {
        renderDynamicElementList({
            sourceData: relatedPosts,
            parentNode: getDynamicElement({ elemId: this.dynContentIds.relatedPostsContainer }),
            DynElementClass: PostCard
        })
    }


}