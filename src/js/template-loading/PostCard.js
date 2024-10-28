import { PLACEHOLDER_IMG_PATH, TEMPLATE_PATHS } from "../constants.js";
import ImageData from "../data-fetching/ImageData.js";
import { getTemplate, turnTemplateIntoNode, getDynamicElement } from "../utils.js";

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
        this.imgSrc = imgSrc !== PLACEHOLDER_IMG_PATH ? imgSrc : undefined
        this.title = title
        this.extract = extract
    }


    /* I am not sure about how to make this content DRY */
    fillDynamicContent() {
        getDynamicElement({ node: this.cardEl, elemId: this.dynContentIds.link }).attributes.href.value = this.link

        const imageEl = getDynamicElement({ node: this.cardEl, elemId: this.dynContentIds.image })
        if (this.imgSrc) {
            imageEl.attributes.src.value = this.imgSrc
        } else {
            const imageLogic = new ImageData()
            const seed = imageLogic.getSeedFromString(this.title)
            imageLogic.getImageURL({ seed, width: 260 }).then((x) => { imageEl.attributes.src.value = x })
        }

        getDynamicElement({ node: this.cardEl, elemId: this.dynContentIds.image }).attributes.alt.value = `Image for post with title "${this.title}"`
        getDynamicElement({ node: this.cardEl, elemId: this.dynContentIds.title }).textContent = this.title
        getDynamicElement({ node: this.cardEl, elemId: this.dynContentIds.extract }).textContent = this.extract
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