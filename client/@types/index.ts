export type best_seller = {
    image: string;
    title: string;
    description: string;
    rank: number;
    price: string;
    category: string;
    href_link: string;
    last_updated: string;
}

export type priceHistory = {
    price: string;
}


export type trackProducts = {
    id: string;
    url: number;
    currency: string;
    title: string;
    current_price: number;
    price_history: priceHistory[];
    original_price: number;
    lowest_price: number;
    highest_price: number;
    average_price: number;
    last_updated: Date;
    is_out_of_stock: boolean;
}

// export type Track = {
//     id: number;
//     url: string;
//     currency: string;
//     image: string;
//     title: string;
//     current_price: number;
//     original_price: number;
//     lowest_price: number;
//     highest_price: number;
//     average_price: number;
//     discount_rate: number;
//     description: string;
//     category: string;
//     reviews_count: string;
//     stars: number;
//     is_out_of_stock: string;
//     users: string[];
//     price_history: { price: number }[];
//     created_at: string;
//     updated_at: string;
// }

export type UserData = {
    username: string;
    email: string;
    points: number;
    tracks: trackProducts[];
}
