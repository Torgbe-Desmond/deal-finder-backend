import TubeNinjaSelectors from "./tubeNinjaSelectors.js";

export const tubeNinjaSelectors =  new TubeNinjaSelectors({
    inputField: ".form-control", // Input field for video URL
    submitButton: ".btn-success", // Submit/download button
    titleSection: ".notopmargin", // Video title section
    downloadLinksSection: ".list-group a", // Download links (each anchor tag)
    listGroupContainer: ".list-group", // The container holding all download links
    ageLimitButton: ".agelimit .age-prompt .btn-success", // Age confirmation button for adult sites
})