import { generateTagPillData, getDynamicElement, loadHeaderAndFooter, renderDynamicElementList, turnPostAPIDataIntoPostCardData } from "./utils";
import PostCard from "./template-loading/PostCard";
import AuthorCard from "./template-loading/AuthorCard"
import TagPill from "./template-loading/Tag";
import UserFavorites from "./data-fetching/UserFavorites";
import PostData from "./data-fetching/PostData";
import { PLACEHOLDER_IMG_PATH } from "./constants";

loadHeaderAndFooter();


(async () => {
    const apiData = new PostData()

    const favorites = new UserFavorites()
    const { posts: favPosts, users: favAuthors, tags: favTags } = favorites.getUserFavorites()

    const posts = []
    const authors = []
    const tags = []



    const favPostsContainer = getDynamicElement({ elemId: "favorite-posts-grid" })
    if (favPosts.length > 0) {
        for (const postId of favPosts) {
            const postData = await apiData.getPost(postId)
            posts.push(postData)
        }

        renderDynamicElementList(
            {
                sourceData: posts.map(turnPostAPIDataIntoPostCardData),
                parentNode: favPostsContainer,
                DynElementClass: PostCard
            })
    } else {
        favPostsContainer.textContent = "No favorite posts"
    }



    const favAuthorsContainer = getDynamicElement({ elemId: "favorite-authors-grid" })
    if (favAuthors.length > 0) {
        for (const authorId of favAuthors) {
            const postsByAuthor = await apiData.getPostsByUser({ userId: authorId })

            const { userId } = postsByAuthor.posts[0]

            const authorData = { authorLink: `/search?user=${userId}`, authorImgSrc: PLACEHOLDER_IMG_PATH, authorName: `User #${userId}` }
            authors.push(authorData)
        }

        renderDynamicElementList(
            {
                sourceData: authors,
                parentNode: favAuthorsContainer,
                DynElementClass: AuthorCard
            })
    } else {
        favAuthorsContainer.textContent = "No favorite authors"
    }


    const favTagsContainer = getDynamicElement({ elemId: "favorite-tags-list" })
    if (favTags.length > 0) {
        for (const tag of favTags) {
            tags.push(generateTagPillData(tag))
        }

        renderDynamicElementList(
            {
                sourceData: tags,
                parentNode: favTagsContainer,
                DynElementClass: TagPill
            })
    } else {
        favTagsContainer.textContent = "No favorite tags"
    }

})()
