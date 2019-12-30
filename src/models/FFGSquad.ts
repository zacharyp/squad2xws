
export interface FFGSquad {
    id:          string;
    name:        string;
    description: string;
    deck:        Deck[];
    game_format: GameFormat;
    faction:     Faction;
    game_mode:   GameMode;
    cost:        number;
}

export interface Deck {
    pilot_card: PilotCard;
    slots:      Slot[];
    cost:       number;
}

export interface PilotCard {
    id:                 number;
    faction_id:         number;
    card_set_ids:       number[];
    card_type_id:       number;
    available_upgrades: number[];
    image:              string;
    card_image:         string;
    name:               string;
    subtitle:           string;
    ability_text:       string;
    cost:               string;
    ship_ability_text?: string;
    ship_size:          number;
    force_side:         null;
    initiative:         number;
    ffg_id:             string;
    ship_type:          number;
    maneuvers_image:    string;
}

export interface Slot {
    id:                number;
    card_set_ids:      number[];
    card_type_id:      number;
    weapon_no_bonus:   boolean;
    weapon_range?:     number;
    upgrade_types:     number[];
    image:             string;
    name:              string;
    ability_text:      string;
    cost:              string;
    restrictions_raw:  string;
    card_image:        string;
}

export interface Faction {
    id:              number;
    name:            string;
    description:     string;
    icon?:            string;
    banner_mobile?:   string;
    banner?:          string;
    ship_art?:        string;
    ship_art_mobile?: string;
}

export interface GameFormat {
    id:                 string;
    name:               string;
    description?:        string;
    game_mode:          number;
    maximum_squad_cost: number;
    created_by?:         null;
    created_at?:         Date;
    factions:           number[];
}

export interface GameMode {
    id:          number;
    name:        string;
    description?: string;
    art?:         string;
}
