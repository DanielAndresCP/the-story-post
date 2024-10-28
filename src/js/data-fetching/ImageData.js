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
        const maxLength = string.length

        // This gets the first and last quarter of the string, with a maximun lenght of 6 chars each
        const sectionLength = Math.floor(maxLength / 4) < 6 ? Math.floor(maxLength / 4) : 6
        const firstSectionUpperBound = sectionLength
        const secondSectionLowerBound = maxLength - firstSectionUpperBound

        const firstSection = this.processStringForSeed(string.slice(0, firstSectionUpperBound))
        const secondSection = this.processStringForSeed(string.slice(secondSectionLowerBound, maxLength))

        return `${firstSection}${secondSection}`
    }

    /**
     * 
     * @param {string} string 
     * @returns {string}
     */
    processStringForSeed(string) {
        return string.toLocaleLowerCase().trim().replaceAll(" ", "-")
    }
}