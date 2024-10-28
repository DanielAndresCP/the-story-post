export default class ImageData {
    constructor() { }
    IMAGE_DATA_BASE_URL = "https://picsum.photos/"

    async getImageURL({ seed, width, height = width }) {
        const endpoint = `${this.IMAGE_DATA_BASE_URL}seed/${seed}/${width}/${height}`

        const response = await fetch(endpoint)
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        return objectUrl
    }

    /**
     * 
     * @param {string} string 
     * @returns {string}
     */
    getSeedFromString(string) {
        return string.slice(0, 8).toLocaleLowerCase().trim().replaceAll(" ", "-")
    }
}