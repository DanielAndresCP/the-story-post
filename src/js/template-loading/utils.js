import { TEMPLATE_PATHS } from "../constants.js"
import { TEMPLATE_DYN_DATA_ATTR_ID } from "../constants.js"


// This function renders a list of templates, generally used for post cards and comments
// Because fetching the template must fully complete for it to be cached, we must await a single
// render in order for the rest of renders to use the cache
export async function renderDynamicElementList({ sourceData, parentNode, DynElementClass }) {
    for (const item of sourceData) {
        await new DynElementClass(item).render(parentNode)
    }
}


// This turns the HTML string into a node,
// so we can manipulate it more easily
export function turnTemplateIntoNode(templateString) {
    const parser = new DOMParser()
    const tempDoc = parser.parseFromString(templateString, "text/html")
    return tempDoc.body.childNodes[0]
}


/**
 * 
 * @param {{node:HTMLElement,dataAttrValue:string}}}} param0 
 * @returns {HTMLElement}
 */
export function getDynamicElement({ node = document.body, elemId }) {
    const cssQuery = `[${TEMPLATE_DYN_DATA_ATTR_ID}=${elemId}]`

    // If the element itself is the one we want to match
    // query selector doesn't work, we use matches
    // to check if the element matches the css query
    if (node.matches(cssQuery)) return node

    return node.querySelector(cssQuery)
}


export async function loadHeaderAndFooter() {
    const header = await getTemplate(TEMPLATE_PATHS.header)
    const footer = await getTemplate(TEMPLATE_PATHS.footer)
    const bodyElement = document.querySelector("body")
    bodyElement.insertAdjacentHTML("afterbegin", header)
    bodyElement.insertAdjacentHTML("beforeend", footer)
}


export async function getTemplate(url) {
    const response = await fetch(url)
    const template = await response.text()
    return template
}