import { basicCardData, canonicalize } from './lib';
import { CardData, UpgradeById } from "../../models/YASBCardData";
import { Pilot, Vendor, XWSSquadron } from "../../models/XWSSquadron";
import { serializedToShips } from "./permalink"

// function upgradeMap(): Map<string, number> {
//     const upgradeIdsByCanonicalName: Map<string, number> = new Map()
//     cardData.upgradesById.forEach(u => {
//         const name = u.canonical_name || u.name
//         if (name) {
//             const xws = canonicalize(name)
//             upgradeIdsByCanonicalName.set(xws, u.id)
//         }
//     })
//     return upgradeIdsByCanonicalName;
// }

const cardData: CardData = <CardData>basicCardData()

/*
    for ship in permalink.serializedToShips faction, serialized
        continue unless ship?.pilot?
        try
            shipdata = cards.ships[ship.pilot.ship]
        catch e
            console.error "Unknown ship: #{e}"
            continue

        try
            pilot =
                id: ship.pilot.xws ? ship.pilot.canonical_name ? ship.pilot.name.canonicalize()
                ship: shipdata.xws ? shipdata.canonical_name ? shipdata.name.canonicalize()
                points: ship.pilot.points ? 0
        catch e
            console.error "Cannot set pilot and ship: #{e}"
            continue

        upgrade_obj = {}

        for upgrade in ship.upgrades
            try
                slot = toXWSUpgrade[upgrade.slot] ? upgrade.slot.canonicalize()
            catch e
                console.error "Cannot add determine slot: #{e}"
                console.dir upgrade
                continue

            try
                (upgrade_obj[slot] ?= []).push(upgrade.xws ? upgrade.canonical_name ? upgrade.name.canonicalize())

                skill = ship.pilot.skill ? 0
                upgrade_points = getUpgradePoints(upgrade, shipdata, skill)
                if upgrade_points?
                    pilot.points = pilot.points + upgrade_points
            catch e
                console.error "Cannot add upgrade: #{e}"
                continue

        for modification in ship.modifications
            try
                (upgrade_obj[toXWSUpgrade['Modification']] ?= []).push(modification.xws ? modification.canonical_name ? modification.name.canonicalize())
            catch e
                console.error "Cannot add modification: #{e}"
                continue

        if ship.title?
            try
                (upgrade_obj.title ?= []).push(ship.title.xws ? ship.title.canonical_name ? ship.title.name.canonicalize())
            catch e
                console.error "Cannot add title: #{e}"
                continue

        if Object.keys(upgrade_obj).length > 0
            pilot.upgrades = upgrade_obj

        xws.pilots.push pilot

    for pilot in xws.pilots
        if pilot.points?
            xws.points = xws.points + pilot.points

*/
export async function serializedToXWS(faction: string, serialized: string, squadName: string, obstacles: string, originalPath: string): Promise<XWSSquadron> {

    const pilots: Pilot[] = serializedToShips(serialized)

    const vender = <Vendor>{
        builder: 'squad2xws',
        builder_url: 'http://squad2xws.herokuapp.com/',
        link: "https://raithos.github.io?" + originalPath
    }

    const xwsSquadron = <XWSSquadron>{
        faction: toXWSFaction(faction),
        pilots: pilots,
        description: undefined,
        obstacles: undefined,
        points: 0,
        vender: {
            "squad2xws": vender
        },
        version: '2.0.0'
    }

    if (squadName !== undefined && ['Unnamed Squadron', 'New Squadron'].indexOf(squadName) == -1) {
        xwsSquadron.name = squadName
    }

    if (obstacles !== undefined) {
        let obs = obstacles.split(',')
        if (obs.length == 3)
            xwsSquadron.obstacles = obs
    }

    for (let pilot of xwsSquadron.pilots)
        if (pilot.points != undefined)
            xwsSquadron.points = (xwsSquadron.points || 0) + pilot.points

    return xwsSquadron;
}

function toXWSFaction(fac: string): string {
    switch (fac) {
        case 'Rebel Alliance': return 'rebelalliance'
        case 'Galactic Empire': return 'galacticempire'
        case 'Scum and Villainy': return 'scumandvillainy'
        case 'First Order': return 'firstorder'
        case 'Resistance': return 'resistance'
        case 'Galactic Republic': return 'galacticrepublic'
        case 'Separatist Alliance': return 'separatistalliance'
        default: return 'rebelalliance'
    }
}
