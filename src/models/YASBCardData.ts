
export interface Ship {
    name: string,
    xws: string,
    agility: number,
    medium?: boolean,
    large?: boolean
}

export interface Ships {
    [key:string]: Ship
}

export interface PilotById {
    name: string,
    id: number,
    faction: string,
    ship: string,
    skill: number,
    points: number,
    canonical_name?: string,
    xws?: string
}

export interface UpgradeById {
    name: string,
    canonical_name?: string,
    id: number,
    slot: string,
    xws?: string,
    faction: string,
    points: number,
    pointsarray?: number[],
    variableagility?: boolean,
    variablebase?: boolean,
    variableinit?: boolean
}

export interface CardData {
    ships: Ships,
    pilotsById: Array<PilotById>
    upgradesById: Array<UpgradeById>
}
