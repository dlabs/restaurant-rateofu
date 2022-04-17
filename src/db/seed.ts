import MenuItem, { IMenuItem } from '../models/menu-item';

/**
 * Called after connecting to the database, checks if
 * the Menu Items collection already has contents.
 *
 * It populates the menu with a predefined set of foods
 * and beverages otherwise.
 */
export async function ensureMenuExists(): Promise<void> {
    const menuItems = await MenuItem.find({});
    if (menuItems.length === 0) {
        menu.forEach(async (item: IMenuItem) => {
            await MenuItem.create(item);
        });
    }
}

const menu: IMenuItem[] = [
    {
        itemTitle: 'Grilled space-whale steak with algae puree',
        itemPrice: 66.5,
        itemDescription:
            'Space is the new Mediterranean and with this dish, we will prove it to you!',
        itemType: 'food',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Tea substitute',
        itemPrice: 1.5,
        itemDescription:
            'With Earth recently destroyed, we needed to find a way to emulate the aromatic leaf.',
        itemType: 'drink',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Hagro biscuit',
        itemPrice: 32,
        itemDescription:
            'Tickles the palate and cleanses the stomach - a favorite among senior customers!',
        itemType: 'food',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Ameglian Major Cow casserole',
        itemPrice: 55.75,
        itemDescription: 'We ran out of Colonel Cow, unfortunately.',
        itemType: 'food',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Pan Galactic Gargle Blaster',
        itemPrice: 5.5,
        itemDescription:
            'An eccentric human tried selling us "Listerine", but this works better - and is tastier.',
        itemType: 'drink',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Janx Spirit',
        itemPrice: 7,
        itemDescription:
            'Even the President of the Galaxy cannot hold a lot of these!',
        itemType: 'drink',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
    {
        itemTitle: 'Tzjin-anthony-ks',
        itemPrice: 11.5,
        itemDescription: 'The Gagrakackan version of the gin and tonic.',
        itemType: 'drink',
        itemImage:
            'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg',
    },
];
