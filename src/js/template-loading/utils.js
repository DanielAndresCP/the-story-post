import { TEMPLATE_PATHS } from "../constants.js"


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