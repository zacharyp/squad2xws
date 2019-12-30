export interface XWSSquadron {
    faction:      string;
    pilots:       Pilot[];
    name?:        string;
    description?: string;
    obstacles?:   string[];
    points?:      number;
    vendor?:      Map<string, Vendor>;
}

export interface Pilot {
    id:       string;
    name:     string,
    ship?:     string;
    upgrades?: Upgrades;
    points?:   number;
}

export interface Upgrades {
    ept?:  string[];
    sensor?:  string[];
    cannon?: string[];
    turret?:   string[];
    torpedo?:   string[];
    missile?:   string[];
    crew?:   string[];
    astromech?:   string[];
    device?:   string[];
    illicit?:   string[];
    modification?:   string[];
    title?:   string[];
    gunner?:   string[];
    'force-power'?:   string[];
    configuration?:   string[];
    tech?:   string[];
    special?:   string[];
    'tactical-relay'?:   string[];
}

export interface Vendor {
    builder?:     string;
    builder_url?: string;
    url?:         string;
}
