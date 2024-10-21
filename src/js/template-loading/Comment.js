import { TEMPLATE_PATHS } from "../constants.js";
import { getTemplate, turnTemplateIntoNode, getDynamicElement } from "./utils.js";

export default class CommentCard {
    // Static attributes are shared between all class instances
    static htmlString

    dynContentIds = {
        authorUsername: "comment-author-username",
        authorDisplayName: "comment-author-display-name",
        commentContent: "comment-content",
        commentLikes: "comment-likes"
    }


    constructor({ authorUsername, authorDisplayName, commentContent, commentLikes }) {
        this.authorUsername = authorUsername
        this.authorDisplayName = authorDisplayName
        this.commentContent = commentContent
        this.commentLikes = Number(commentLikes)
    }


    fillDynamicContent() {
        getDynamicElement(this.commentEl, this.dynContentIds.authorUsername).textContent = this.authorUsername
        getDynamicElement(this.commentEl, this.dynContentIds.authorDisplayName).textContent = this.authorDisplayName
        getDynamicElement(this.commentEl, this.dynContentIds.commentContent).textContent = this.commentContent
        getDynamicElement(this.commentEl, this.dynContentIds.commentLikes).textContent = this.commentLikes
    }


    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        // We fetch the template only if we haven't fetched the template before
        if (!CommentCard.htmlString) {
            CommentCard.htmlString = await getTemplate(TEMPLATE_PATHS.comment)
        }

        this.commentEl = turnTemplateIntoNode(CommentCard.htmlString)
        this.fillDynamicContent()
        parentNode.appendChild(this.commentEl)
    }
}