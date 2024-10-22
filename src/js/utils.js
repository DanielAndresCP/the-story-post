import { TEMPLATE_PATHS, TEMPLATE_DYN_DATA_ATTR_ID, CHILEAN_FLAG_IMG_SRC } from "./constants.js"

function vivaChile() {
    const container = document.createElement("div")
    container.classList.add("chilean-flag-animated")

    const pEl = document.createElement("p")
    pEl.textContent = "Viva Chile"

    const flagImg = document.createElement("img")
    flagImg.src = CHILEAN_FLAG_IMG_SRC
    flagImg.alt = "Chilean Flag"

    container.appendChild(pEl)
    container.appendChild(flagImg)

    document.body.appendChild(container)

    setTimeout(() => {
        container.remove()
    }, 4000)
}


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
/**
 * 
 * @param {string} templateString 
 * @returns {HTMLElement}
 */
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
    const footerTemplate = await getTemplate(TEMPLATE_PATHS.footer)

    const footerEl = turnTemplateIntoNode(footerTemplate)
    footerEl.lastElementChild.addEventListener("click", vivaChile)

    const bodyElement = document.querySelector("body")
    bodyElement.insertAdjacentHTML("afterbegin", header)
    bodyElement.appendChild(footerEl)
}


export async function getTemplate(url) {
    const response = await fetch(url)
    const template = await response.text()
    return template
}