export type PostType = {
    id: string
    createdAt: string
    updatedAt: string
    Mitarbeiter: string
    beschreibung: string
    Bild: {
        id: string
        createdAt: string
        updatedAt: string
        alt: string
        filename: string
        mimeType: string
        filesize: number
        width: number
        height: number
        focalX: number
        focalY: number
        sizes: {
            thumbnail: {
                width: number
                height: number
                mimeType: string
                filesize: number
                filename: string
                url: string
            }
            card: {
                width: number
                height: number
                mimeType: string
                filesize: number
                filename: string
                url: string
            }
            tablet: {
                width: number
                height: number
                mimeType: string
                filesize: number
                filename: string
                url: string
            }
        }
        url: string
        thumbnailURL: string
    }
}