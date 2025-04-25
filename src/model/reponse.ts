interface SNAPResponse {

}
interface SNAPResponse {
    text: string;
    medias: Media[];
}

interface Media {
    mediaType: "video" | string;
    resourceUrl: string;
    previewUrl: string;
}

interface SNAPResponseError {
    code: number | string
    message: string
}