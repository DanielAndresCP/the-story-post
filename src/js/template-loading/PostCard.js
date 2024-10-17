import { TEMPLATE_PATHS } from "../constants.js";
import { turnTemplateIntoNode, getTemplate, getDynamicElement } from "./utils.js";

export default class PostCard {
    dynContent = {
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


    async createCardNode() {
        const templateString = await getTemplate(TEMPLATE_PATHS.postCard)
        /**
         * @type {HTMLElement}
         */
        this.cardEl = turnTemplateIntoNode(templateString)
    }


    /* I am not sure about how to make this content DRY */
    fillDynamicContent() {
        getDynamicElement(this.cardEl, this.dynContent.link).attributes.href.value = this.link
        getDynamicElement(this.cardEl, this.dynContent.image).attributes.src.value = this.imgSrc
        getDynamicElement(this.cardEl, this.dynContent.image).attributes.alt.value = `Image for post with title "${this.title}"`
        getDynamicElement(this.cardEl, this.dynContent.title).textContent = this.title
        getDynamicElement(this.cardEl, this.dynContent.extract).textContent = this.extract
    }


    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        await this.createCardNode()
        this.fillDynamicContent()
        parentNode.appendChild(this.cardEl)
    }
}