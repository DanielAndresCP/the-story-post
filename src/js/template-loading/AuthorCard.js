import { PLACEHOLDER_IMG_PATH, TEMPLATE_PATHS } from "../constants.js";
import ImageData from "../data-fetching/ImageData.js";
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
        this.authorImgSrc = authorImgSrc !== PLACEHOLDER_IMG_PATH ? authorImgSrc : undefined
        this.authorName = authorName
    }


    fillDynamicContent() {
        getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.link }).attributes.href.value = this.authorLink

        const imgEl = getDynamicElement({ node: this.authorCardEl, elemId: this.dynContentIds.imgSrc })

        if (this.authorImgSrc) {
            imgEl.attributes.src.value = this.authorImgSrc
        } else {
            const imageLogic = new ImageData()
            const seed = imageLogic.getSeedFromString(this.authorName)
            imageLogic.getImageURL({ seed, width: 56 }).then((x) => { imgEl.attributes.src.value = x })
        }


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