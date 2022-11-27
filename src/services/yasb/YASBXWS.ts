import { basicCardData, canonicalize } from './lib';
import { CardData, UpgradeById } from "../../models/YASBCardData";
import { Pilot, Vendor, XWSSquadron } from "../../models/XWSSquadron";
import { serializedToShips } from "./permalink"

const cardData: CardData = <CardData>basicCardData()

export async function serializedToXWS(faction: string, serialized: string, squadName: string, obstacles: string, originalPath: string): Promise<XWSSquadron> {

    const pilots: Pilot[] = serializedToShips(serialized)

    const vendor = <Vendor>{
        builder: 'squad2xws',
        builder_url: 'http://squad2xws.objectivecat.com/',
        link: "https://yasb.app/?" + originalPath
    }

    const vendorMap: Map<string, Vendor> = new Map()
    vendorMap.set("squad2xws", vendor)

    const xwsSquadron = <XWSSquadron>{
        faction: toXWSFaction(faction),
        pilots: pilots,
        description: undefined,
        obstacles: undefined,
        points: 0,
        vendor: vendorMap,
        version: '2.6.0'
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

