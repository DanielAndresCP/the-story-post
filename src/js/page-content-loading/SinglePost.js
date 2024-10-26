import CommentCard from "../template-loading/Comment"
import PostCard from "../template-loading/PostCard"
import TagPill from "../template-loading/Tag"
import AuthorCard from "../template-loading/AuthorCard.js"
import { getDynamicElement, renderDynamicElementList, generateTagPillData } from "../utils.js"


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
        relatedPostsContainer: "post-related-posts-grid"
    }

    constructor({
        img,
        title,
        id,
        content,
        authorCardLink,
        authorCardImg,
        authorCardName,
        views,
        likes,
        dislikes,
        tags
    }) {
        this.img = img
        this.title = title
        this.id = id
        this.content = content
        this.authorCardLink = authorCardLink
        this.authorCardImg = authorCardImg
        this.authorCardName = authorCardName
        this.views = Number(views)
        this.likes = Number(likes)
        this.dislikes = Number(dislikes)
        this.tags = tags
    }

    renderMainContent() {
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.src.value = this.img
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.alt.value = `Cover Image for "${this.title}" Post`
        getDynamicElement({ elemId: this.dynContentIds.title }).textContent = this.title
        getDynamicElement({ elemId: this.dynContentIds.id }).textContent = `(#${this.id})`
        getDynamicElement({ elemId: this.dynContentIds.content }).textContent = this.content

        const authorCardContainer = getDynamicElement({ elemId: this.dynContentIds.authorCardContainer })
        const authorCardLogic = new AuthorCard({ authorLink: this.authorCardLink, authorImgSrc: this.authorCardImg, authorName: this.authorCardName })
        authorCardLogic.render(authorCardContainer)

        getDynamicElement({ elemId: this.dynContentIds.views }).textContent = this.views
        getDynamicElement({ elemId: this.dynContentIds.likes }).textContent = this.likes
        getDynamicElement({ elemId: this.dynContentIds.dislikes }).textContent = this.dislikes

        this.renderTags(this.tags.map(generateTagPillData))
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