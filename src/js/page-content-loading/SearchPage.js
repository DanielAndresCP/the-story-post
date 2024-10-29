import { getDynamicElement, getSearchParams, renderDynamicElementList, turnPostAPIDataIntoPostCardData } from "../utils"
import PostData from "../data-fetching/PostData"
import PostCard from "../template-loading/PostCard"

// TODO ADD ALL OF THIS TO THE SKILL ASSESMENT
export default class SearchPage {
    dynContentIds = {
        searchResults: "search-results-post-grid",
        searchQueryDisplay: "search-result-query"
    }
    apiData = new PostData()
    /**@type {[]} */
    searchResults

    constructor() {
        /**
        * @type {HTMLFormElement}
        */
        this.searchForm = document.forms.search

        const searchParams = getSearchParams()
        this.query = searchParams.get("search-query")
        // If the default option was selected, its because nothing was searched
        this.searchedTag = searchParams.get("tag") !== "default" ? searchParams.get("tag") : undefined
        this.searchedUser = searchParams.get("user")
    }

    async render() {
        // TODO ADD THIS TO SKILL ASSESMENT
        // If we aren't searching anything we return
        if (!this.query && (!this.searchedTag) && !this.searchedUser) {
            this.loadTagsinSelect()
            return
        }

        this.showSearchResults()

        this.loadTagsinSelect()
    }

    loadFiltersValues() {
        this.searchForm["search-query"].value = this.query
        this.searchForm.tag.value = this.searchedTag
        this.searchForm.user.value = this.searchedUser
    }

    async showSearchResults() {
        await this.searchPosts()
        this.renderSearchResults()
    }


    renderSearchResults() {
        // We display the values we searched for in case the user forgets
        // I do this instead of refilling the values in the form
        // because when you want to search again, you might forget to clear an input
        const queryDisplayStrings = [
            this.query ? `query: ${this.query}` : "",
            this.searchedTag ? `tag: ${this.searchedTag}` : "",
            this.searchedUser ? `author: ${this.searchedUser}` : ""
        ]
        const searchQueryDisplayText = `(searched for: ${queryDisplayStrings.filter((x) => x !== "").join(", ")})`
        getDynamicElement({ elemId: this.dynContentIds.searchQueryDisplay }).textContent = searchQueryDisplayText


        // We render the search results
        const containerEl = getDynamicElement({ elemId: this.dynContentIds.searchResults })
        containerEl.innerHTML = ""
        
        if (this.searchResults === null) {
            containerEl.textContent = "An error occured and no posts were obtained. This commonly happens when you search for an author that does not exit"
            return
        }

        if (this.searchResults.length === 0) {
            containerEl.textContent = "No results for this search"
            return
        }
        
        renderDynamicElementList({
            sourceData: this.searchResults.map(turnPostAPIDataIntoPostCardData),
            parentNode: containerEl,
            DynElementClass: PostCard
        })
    }

    async searchPosts() {
        const filtersWithContent = [
            {
                name: "query",
                value: this.query
            },
            {
                name: "searchedTag",
                value: this.searchedTag
            },
            {
                name: "searchedUser",
                value: this.searchedUser
            }
        ].filter((x) => x.value)

        // If we searched with just 1 filter, we can
        // use an endpoint, otherwise we must apply
        // custom logic
        const hasJustOneFilter = filtersWithContent.length === 1


        if (hasJustOneFilter) {
            // If it is just one filter, we query the corresponding
            // endpoint
            await this.searchByFilter(filtersWithContent[0])
        } else {
            // If it is more that 1 filter, we query the endpoint
            // of the first filter, and then filter the results of it
            let firstFilter = true
            for (const filter of filtersWithContent) {
                if (firstFilter) {
                    await this.searchByFilter(filter)
                }
                this.filterSearchResults(filter)

                firstFilter = false
            }

        }
    }

    async searchByFilter(filter) {
        try {
            switch (filter.name) {
                case "query":
                    this.searchResults = (await this.apiData.searchPosts({ query: filter.value, amount: 0 })).posts
                    break;
                case "searchedTag":
                    this.searchResults = (await this.apiData.getPostsByTag({ tagId: filter.value, amount: 0 })).posts
                    break;
                case "searchedUser":
                    this.searchResults = (await this.apiData.getPostsByUser({ userId: filter.value, amount: 0 })).posts
                    break;
            }
        } catch (e) {
            this.searchResults = null
        }
    }

    async filterSearchResults(filter) {
        switch (filter.name) {
            // We never filter by query
            // case "query":
            //     break;
            case "searchedTag":
                this.searchResults = this.searchResults.filter((x) => x.tags.includes(filter.value))
                break;
            case "searchedUser":
                this.searchResults = this.searchResults.filter((x) => x.userId === Number(filter.value))
                break;
        }
    }

    async loadTagsinSelect() {
        // We load the available tags into the select element
        const tags = await this.apiData.getAllTags()
        const tagSelect = this.searchForm.tag
        for (const tag of tags) {
            tagSelect.appendChild(new Option(tag.name, tag.slug))
        }
    }
}