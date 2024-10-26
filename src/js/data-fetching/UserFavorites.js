import { getLocalStorage, setLocalStorage } from "../utils";


export default class UserFavorites {
    postKey = "story-post-favorite-posts"
    authorKey = "story-post-favorite-users"
    tagKey = "story-post-favorite-tags"
    posts = []
    authors = []
    tags = []


    constructor() {
        this.getUserFavorites()
    }

    getUserFavorites() {
        this.posts = getLocalStorage(this.postKey) ? getLocalStorage(this.postKey) : []
        this.authors = getLocalStorage(this.authorKey) ? getLocalStorage(this.authorKey) : []
        this.tags = getLocalStorage(this.tagKey) ? getLocalStorage(this.tagKey) : []
        this.updateUserFavorites()

        return { posts: this.posts, users: this.authors, tags: this.tags }
    }

    updateUserFavorites() {
        setLocalStorage(this.postKey, this.posts)
        setLocalStorage(this.authorKey, this.authors)
        setLocalStorage(this.tagKey, this.tags)
    }

    // Posts
    addFavoritePost(postId) {
        // If the post is already in favorites, we dont add it
        if (this.posts.includes(postId)) return

        this.posts = [...this.posts, postId]
        this.updateUserFavorites()
    }

    removeFavoritePost(postId) {
        this.posts = this.posts.filter((x) => x !== postId)
        this.updateUserFavorites()
    }

    checkPostInFavorites(postId) {
        return this.posts.some((x) => x === postId)
    }

    // Users
    addFavoriteAuthor(authorId) {
        // If the author is already in favorites, we dont add it
        if (this.authors.includes(authorId)) { return }

        this.authors = [...this.authors, authorId]
        this.updateUserFavorites()
    }

    removeFavoriteAuthor(authorId) {
        this.authors = this.authors.filter((x) => x !== authorId)
        this.updateUserFavorites()
    }

    checkAuthorInFavorites(authorId) {
        return this.authors.some((x) => x === authorId)
    }

    // Tags
    addFavoriteTag(tagId) {
        // If the tag is already in favorites, we dont add it
        if (this.tags.includes(tagId)) return

        this.tags = [...this.tags, tagId]
        this.updateUserFavorites()
    }

    removeFavoriteTag(tagId) {
        this.tags = this.tags.filter((x) => x !== tagId)
        this.updateUserFavorites()
    }

    checkTagInFavorites(tagId) {
        return this.tags.some((x) => x === tagId)
    }
}