import { POST_DATA_BASE_URL } from "../constants";
import { getJSON, getRandomNumberInRange } from "../utils";

export default class PostData {
    constructor() { }

    async getPost(postId) {
        const endpoint = `${POST_DATA_BASE_URL}${postId}`
        const post = await getJSON(endpoint)
        return post
    }


    async getListOfPosts({ endpoint = POST_DATA_BASE_URL, sortBy, order, limit, skip, searchQuery }) {
        const searchParams = new URLSearchParams()

        if (searchQuery) {
            searchParams.append("q", searchQuery)
        }
        if (sortBy) {
            searchParams.append("sortBy", sortBy)
        }
        if (order) {
            searchParams.append("order", order)
        }
        if (limit) {
            searchParams.append("limit", limit)
        }
        if (skip) {
            searchParams.append("skip", skip)
        }

        const searchParamsString = searchParams.toString() ? `?${searchParams.toString()}` : ""

        const data = await getJSON(`${endpoint}${searchParamsString}`)

        return data
    }


    async getRandomPosts(maxAmount = 10) {
        const totalOfPosts = await this.getTotalOfPosts()

        const limit = maxAmount
        const skip = getRandomNumberInRange(0, Number(totalOfPosts) - Number(maxAmount))

        const posts = this.getListOfPosts({ limit, skip })

        return posts
    }


    async getPostByUser({ userId, amount, page }) {
        const endpoint = `${POST_DATA_BASE_URL}user/${userId}`

        const data = await this.getListOfPosts({ endpoint, limit: amount, skip: (amount * page) })

        return data
    }

    async searchPosts({ query, amount, page }) {
        const endpoint = `${POST_DATA_BASE_URL}search`

        const data = await this.getListOfPosts({
            endpoint,
            searchQuery: query,
            limit: amount,
            skip: amount && page ? (amount * page) : 0
        })

        return data
    }


    async getTotalOfPosts() {
        const data = await this.getListOfPosts({ limit: 1 })
        return data.total
    }
}