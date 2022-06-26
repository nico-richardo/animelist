import { gql } from "@apollo/client";

export const GET_LIST = gql`
    query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
            }
            media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                countryOfOrigin
                episodes
                startDate {
                    year
                    month
                    day
                }
                status
                type
                genres
                coverImage {
                    large
                }
                bannerImage
            }
        }
    }`;
