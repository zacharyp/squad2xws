import { basicCardData, canonicalize } from './lib';
import { CardData } from "../../models/YASBCardData";
import { XWSSquadron } from "../../models/XWSSquadron";

const cardData: CardData = <CardData>basicCardData()

function upgradeMap(): Map<string, number> {
    const upgradeIdsByCanonicalName: Map<string, number> = new Map()
    cardData.upgradesById.forEach(u => {
        const name = u.canonical_name || u.name
        if (name) {
            const xws = canonicalize(name)
            upgradeIdsByCanonicalName.set(xws, u.id)
        }
    })
    return upgradeIdsByCanonicalName;
}

const upgradeIdsByXWS: Map<string, number> = upgradeMap()

export async function covert_xws(xwsString: string): Promise<string> {
    const xwsSquadron = <XWSSquadron>JSON.parse(xwsString)
 
    let serializedSquad = "v8ZsZ200Z" // serialization version 8, standard squad, 200 points

    const faction = fromXWSFaction(xwsSquadron.faction)
    const squadName = xwsSquadron.name || "Unnamed"

    xwsSquadron.pilots.forEach(pilot => {
        const pilotXWS = pilot.id
        let pilotFound = cardData.pilotsById.find(p => {
            return p.faction == faction && canonicalize(p.name) == pilotXWS
        })
        if (pilotFound != undefined) {
            serializedSquad += pilotFound.id + "X"
            if (pilot.upgrades != undefined) {
                Object.values(pilot.upgrades).forEach(upgradeArray => {
                    upgradeArray.forEach(u => {
                        let uFound = upgradeIdsByXWS.get(u)
                        if (uFound) {
                            serializedSquad += uFound + "W"
                        }
                    })
                })
            }
           serializedSquad += "XY"
        }      
    })

    let urlFaction = encodeURIComponent(faction)
    var result = "https://raithos.github.io/?"
    result += "f=" + urlFaction
    result += "&sn=" + encodeURIComponent(squadName)
    result += "&d=" + serializedSquad
    return result;

}

function fromXWSFaction(fac: string): string {

    switch (fac) {
        case 'rebelalliance': return 'Rebel Alliance'
        case 'rebels': return 'Rebel Alliance'
        case 'rebel': return 'Rebel Alliance'
        case 'galacticempire': return 'Galactic Empire'
        case 'imperial': return 'Galactic Empire'
        case 'scumandvillainy': return 'Scum and Villainy'
        case 'firstorder': return 'First Order'
        case 'resistance': return 'Resistance'
        case 'galacticrepublic': return 'Galactic Republic'
        case 'separatistalliance': return 'Separatist Alliance'
        default: return 'Rebel Alliance'
    }
}
