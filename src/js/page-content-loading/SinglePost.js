import CommentCard from "../template-loading/Comment"
import PostCard from "../template-loading/PostCard"
import TagPill from "../template-loading/Tag"
import { getDynamicElement, renderDynamicElementList } from "../template-loading/utils"


export default class SinglePost {
    dynContentIds = {
        img: "post-img",
        title: "post-title",
        id: "post-id-display",
        content: "post-content",
        authorCardLink: "post-author-link",
        authorCardImg: "post-author-img",
        authorCardName: "post-author-name",
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
        dislikes
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
    }

    renderMainContent() {
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.src.value = this.img
        getDynamicElement({ elemId: this.dynContentIds.img }).attributes.alt.value = `Cover Image for "${this.title}" Post`
        getDynamicElement({ elemId: this.dynContentIds.title }).textContent = this.title
        getDynamicElement({ elemId: this.dynContentIds.id }).textContent = `(#${this.id})`
        getDynamicElement({ elemId: this.dynContentIds.content }).textContent = this.content
        getDynamicElement({ elemId: this.dynContentIds.authorCardLink }).attributes.href.value = this.authorCardLink
        getDynamicElement({ elemId: this.dynContentIds.authorCardImg }).attributes.src.value = this.authorCardImg
        getDynamicElement({ elemId: this.dynContentIds.authorCardImg }).attributes.alt.value = `Profile Picture of ${this.authorCardName}`
        getDynamicElement({ elemId: this.dynContentIds.authorCardName }).textContent = this.authorCardName
        getDynamicElement({ elemId: this.dynContentIds.views }).textContent = this.views
        getDynamicElement({ elemId: this.dynContentIds.likes }).textContent = this.likes
        getDynamicElement({ elemId: this.dynContentIds.dislikes }).textContent = this.dislikes
    }

    renderTags(tags) {
        renderDynamicElementList({
            sourceData: tags,
            parentNode: getDynamicElement({ elemId: this.dynContentIds.tagListContainer }),
            DynElementClass: TagPill
        })
    }

    renderComments(comments) {
        renderDynamicElementList({
            sourceData: comments,
            parentNode: getDynamicElement({ elemId: this.dynContentIds.commentListContainer }),
            DynElementClass: CommentCard
        })
    }


    renderRelatedPosts(relatedPosts) {
        renderDynamicElementList({
            sourceData: relatedPosts,
            parentNode: getDynamicElement({ elemId: this.dynContentIds.relatedPostsContainer }),
            DynElementClass: PostCard
        })
    }


}