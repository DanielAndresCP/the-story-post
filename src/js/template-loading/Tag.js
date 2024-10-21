import { TEMPLATE_PATHS } from "../constants.js";
import { getTemplate, turnTemplateIntoNode, getDynamicElement } from "./utils.js";

export default class TagPill {
    // Static attributes are shared between all class instances
    static htmlString

    dynContentIds = {
        tag: "tag"
    }


    constructor({ tagName, tagLink }) {
        this.tagName = tagName
        this.tagLink = tagLink
    }


    fillDynamicContent() {
        getDynamicElement({ node: this.tagEl, elemId: this.dynContentIds.tag }).textContent = this.tagName
        getDynamicElement({ node: this.tagEl, elemId: this.dynContentIds.tag }).attributes.href.value = this.tagLink
    }


    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        // We fetch the template only if we haven't fetched the template before
        if (!TagPill.htmlString) {
            TagPill.htmlString = await getTemplate(TEMPLATE_PATHS.tag)
        }

        this.tagEl = turnTemplateIntoNode(TagPill.htmlString)
        this.fillDynamicContent()
        parentNode.appendChild(this.tagEl)
    }
}