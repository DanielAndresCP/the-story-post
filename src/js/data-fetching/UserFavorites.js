import { getLocalStorage, setLocalStorage } from "../utils";


export default class UserFavorites {
    postKey = "story-post-favorite-posts"
    userKey = "story-post-favorite-users"
    tagKey = "story-post-favorite-tags"
    posts = []
    users = []
    tags = []


    constructor() {
        this.getUserFavorites()
    }

    getUserFavorites() {
        this.posts = getLocalStorage(this.postKey) ? getLocalStorage(this.postKey) : []
        setLocalStorage(this.postKey, this.posts)

        this.users = getLocalStorage(this.userKey) ? getLocalStorage(this.userKey) : []
        setLocalStorage(this.userKey, this.users)

        this.tags = getLocalStorage(this.tagKey) ? getLocalStorage(this.tagKey) : []
        setLocalStorage(this.tagKey, this.tags)


        return { posts: this.posts, users: this.users, tags: this.tags }
    }

    // Posts
    addFavoritePost(postId) {
        // If the post is already in favorites, we dont add it
        if (this.posts.includes(postId)) return

        setLocalStorage(this.postKey, [...this.posts, postId])
    }

    removeFavoritePost(postId) {
        setLocalStorage(this.postKey, this.posts.filter((x) => x !== postId))
    }

    checkPostInFavorites(postId) {
        return this.posts.some((x) => x === postId)
    }

    // Users
    addFavoriteUser(userId) {
        // If the post is already in favorites, we dont add it
        if (this.users.includes(userId)) return

        setLocalStorage(this.userKey, [...this.users, userId])
    }

    removeFavoriteUser(userId) {
        setLocalStorage(this.userKey, this.users.filter((x) => x !== userId))
    }

    checkUserInFavorites(userId) {
        return this.users.some((x) => x === userId)
    }

    // Tags
    addFavoriteTag(tagId) {
        // If the post is already in favorites, we dont add it
        if (this.tags.includes(tagId)) return

        setLocalStorage(this.tags, [...this.tags, tagId])
    }

    removeFavoriteTag(tagId) {
        setLocalStorage(this.tagKey, this.tagsusers.filter((x) => x !== tagId))
    }

    checkTagInFavorites(tagId) {
        return this.tags.some((x) => x === tagId)
    }
}