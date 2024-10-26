import { TEMPLATE_PATHS } from "../constants.js";
import UserFavorites from "../data-fetching/UserFavorites.js";
import { getTemplate, turnTemplateIntoNode } from "../utils.js";


export default class FavoriteActionBtn {
    // Static attributes are shared between all class instances
    static htmlString
    
    dynContentIds = {
        button: "favorite-action-button"
    }


    constructor({ id, type, favoriteManager }) {
        this.favoriteManager = favoriteManager
        this.id = id
        this.type = type
        this.onClickFunc = this.buttonAction.bind(this)
        this.updateIsFavorite()
    }

    updateIsFavorite() {
        switch (this.type) {
            case "post":
                this.isFavorite = this.favoriteManager.checkPostInFavorites(this.id)
                break;

            case "author":
                this.isFavorite = this.favoriteManager.checkAuthorInFavorites(this.id)
                break;

            case "tag":
                this.isFavorite = this.favoriteManager.checkTagInFavorites(this.id)
                break;
        }
    }


    fillDynamicContent() {
        this.updateIsFavorite()
        this.btnEl.textContent = `${this.isFavorite ? "Remove" : "Add"} ${this.type} "${this.id}" ${this.isFavorite ? "from" : "to"} favorites`

        // Because we refill the content, we must clear the past event listener,
        // and we use that onClickFunc because we must bind this to this class instance
        // not the element of the event
        this.btnEl.removeEventListener("click", this.onClickFunc)
        this.btnEl.addEventListener("click", this.onClickFunc)
    }

    buttonAction() {
        switch (this.type) {
            case "post":
                this.isFavorite ? this.favoriteManager.removeFavoritePost(this.id) : this.favoriteManager.addFavoritePost(this.id)
                break;

            case "author":
                this.isFavorite ? this.favoriteManager.removeFavoriteAuthor(this.id) : this.favoriteManager.addFavoriteAuthor(this.id)
                break;

            case "tag":
                this.isFavorite ? this.favoriteManager.removeFavoriteTag(this.id) : this.favoriteManager.addFavoriteTag(this.id)
                break;

        }
        this.fillDynamicContent()
    }

    /**
     * 
     * @param {HTMLElement} parentNode 
     */
    async render(parentNode) {
        // We fetch the template only if we haven't fetched the template before
        if (!FavoriteActionBtn.htmlString) {
            FavoriteActionBtn.htmlString = await getTemplate(TEMPLATE_PATHS.favoriteActionBtn)
        }

        this.btnEl = turnTemplateIntoNode(FavoriteActionBtn.htmlString)
        this.fillDynamicContent()
        parentNode.appendChild(this.btnEl)
    }
}