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


function renderMap(data, parentElement) {
    const { latitude, longitude } = data.coords
    const map = `<iframe
    title="Mapa de Chillán"
    src="https://maps.google.com/maps?q=${latitude},${longitude}&output=embed"
    class="w-full min-h-72"></iframe>`
    parentElement.innerHTML = map
}


function showMap(parentElement) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e) => {
            renderMap(e, parentElement)
        }, () => {
            parentElement.textContent = "You didn't allow geolocation :("
        })
    } else {
        parentElement.textContent = "Your device doesn't have geolocation capabilities :("
    }
}


export function setupMap() {
    const mapContainer = getDynamicElement({ elemId: "map-container" })
    const mapButton = getDynamicElement({ elemId: "map-button" })
    mapButton.addEventListener("click", () => { showMap(mapContainer) })
}

export async function loadHeaderAndFooter() {
    const headerTemplate = await getTemplate(TEMPLATE_PATHS.header)
    const headerEl = turnTemplateIntoNode(headerTemplate)
    // This controls if the menu in mobile is open or closed
    // (only affects view on mobile)
    headerEl.querySelector("nav").addEventListener("click", (e) => {
        e.target.classList.toggle("closed")
    })

    const footerTemplate = await getTemplate(TEMPLATE_PATHS.footer)
    const footerEl = turnTemplateIntoNode(footerTemplate)
    // This adds the chilean flag easter egg when clicking copyright info
    footerEl.lastElementChild.addEventListener("click", vivaChile)

    const bodyElement = document.querySelector("body")
    bodyElement.prepend(headerEl)
    bodyElement.appendChild(footerEl)
}


export async function getTemplate(url) {
    const response = await fetch(url)
    const template = await response.text()
    return template
}


export async function getJSON(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}


export function turnPostAPIDataIntoPostCardData(srcData) {
    return {
        link: `/post?id=${srcData.id}`,
        imgSrc: "/img/placeholder.jpg",
        title: srcData.title,
        extract: `${srcData.body.slice(0, 45).trim()}...`
    }
}

export function turnAPIPostDataIntoSinglePostData(srcData) {
    const { title, id, body, userId, views, reactions, tags } = srcData
    return {
        img: "/img/placeholder.jpg",
        title,
        id,
        content: body,
        authorCardLink: `/search?user=${userId}`,
        authorCardImg: "/img/placeholder.jpg",
        authorCardName: `User #${userId}`,
        views,
        likes: reactions.likes,
        dislikes: reactions.dislikes,
        tags
    }
}

export function turnAPICommentDataIntoCommentData(srcData) {
    return {
        authorUsername: srcData.user.username,
        authorDisplayName: srcData.user.fullName,
        commentContent: srcData.body,
        commentLikes: srcData.likes
    }
}

export function generateTagPillData(tagSlug) {
    return { tagName: tagSlug, tagLink: `/search?tag=${tagSlug}` }
}

export function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getSearchParams() {
    return new URLSearchParams(window.location.href.split("?")[1])
}