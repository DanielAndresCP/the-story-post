import { TEMPLATE_PATHS } from "../constants.js";
import { getTemplate, turnTemplateIntoNode, getDynamicElement } from "../utils.js";

export default class AuthorCard {
    // Static attributes are shared between all class instances
    static htmlString

    dynContentIds = {
        link: "post-author-link",
        imgSrc: "post-author-img",
        name: "post-author-name"
    }


    constructor({ authorLink, authorImgSrc, authorName }) {
        this.authorLink = authorLink
        this.authorImgSrc = authorImgSrc
        this.authorName = authorName
    }


    fillDynamicContent() {
        getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.link }).attributes.href.value = this.authorLink
        getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.imgSrc }).attributes.src.value = this.authorImgSrc
        getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.imgSrc }).attributes.alt.value = `Profile Photo for ${this.authorName}`
        getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.name }).textContent = this.authorName
    }


    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        // We fetch the template only if we haven't fetched the template before
        if (!AuthorCard.htmlString) {
            AuthorCard.htmlString = await getTemplate(TEMPLATE_PATHS.authorCard)
        }

        this.authorCardEl = turnTemplateIntoNode(AuthorCard.htmlString)
        this.fillDynamicContent()
        parentNode.appendChild(this.authorCardEl)
    }
}