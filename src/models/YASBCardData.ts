
export interface Ship {
    name: string,
    xws: string
}

export interface Ships {
    [key:string]: Ship
}

export interface PilotById {
    name: string,
    id: number,
    faction: string,
    ship: string,
    points: number
}

export interface UpgradeById {
    name: string,
    canonical_name?: string,
    id: number,
    slot: string,
    faction: string,
    points: number
}

export interface CardData {
    ships: Ships,
    pilotsById: Array<PilotById>
    upgradesById: Array<UpgradeById>
}
