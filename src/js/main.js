import { getDynamicElement, loadHeaderAndFooter, renderDynamicElementList, setupMap, turnPostListIntoPostCardDataList } from "./utils.js"
import PostCard from "./template-loading/PostCard.js"
import PostData from "./data-fetching/PostData.js"

loadHeaderAndFooter()

setupMap()


const postDataSrc = new PostData()

const data = await postDataSrc.getRandomPosts(8)

const posts = turnPostListIntoPostCardDataList(data.posts)

renderDynamicElementList({
    sourceData: posts,
    parentNode: getDynamicElement({ elemId: "post-grid" }),
    DynElementClass: PostCard
})