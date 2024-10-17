import { TEMPLATE_PATHS } from "../constants.js";
import { getTemplate, turnTemplateIntoNode, getDynamicElement } from "./utils.js";

export default class PostCard {
    // Static attributes are shared between all class instances
    static htmlString

    dynContentIds = {
        link: "post-card-link",
        image: "post-card-image",
        title: "post-card-title",
        extract: "post-card-extract"
    }


    constructor({ link, imgSrc, title, extract }) {
        this.link = link
        this.imgSrc = imgSrc
        this.title = title
        this.extract = extract
    }


    /* I am not sure about how to make this content DRY */
    fillDynamicContent() {
        getDynamicElement(this.cardEl, this.dynContentIds.link).attributes.href.value = this.link
        getDynamicElement(this.cardEl, this.dynContentIds.image).attributes.src.value = this.imgSrc
        getDynamicElement(this.cardEl, this.dynContentIds.image).attributes.alt.value = `Image for post with title "${this.title}"`
        getDynamicElement(this.cardEl, this.dynContentIds.title).textContent = this.title
        getDynamicElement(this.cardEl, this.dynContentIds.extract).textContent = this.extract
    }


    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        // We fetch the template only if we haven't fetched the template before
        if (!PostCard.htmlString) {
            PostCard.htmlString = await getTemplate(TEMPLATE_PATHS.postCard)
        }
        
        this.cardEl = turnTemplateIntoNode(PostCard.htmlString)
        this.fillDynamicContent()
        parentNode.appendChild(this.cardEl)
    }
}