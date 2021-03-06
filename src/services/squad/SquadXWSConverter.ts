import { Deck, FFGSquad } from "../../models/FFGSquad";
import { Pilot, Vendor, XWSSquadron } from "../../models/XWSSquadron";
import { stringify } from "querystring";
const ffgXWS = require("../../../xwing-data2/data/ffg-xws.json");

export function convertFFGSquad(squadId: string, squad: FFGSquad): XWSSquadron {
    const factionId = squad.faction.id

    const pilots = constructPilots(squad.deck)

    const vendor = <Vendor>{
        builder: 'squad2xws',
        builder_url: 'http://squad2xws.herokuapp.com/',
        url: `http://squad2xws.herokuapp.com/translate/${squadId}`
    }

    const vendorMap: Map<string, Vendor> = new Map()
    vendorMap.set("squad2xws", vendor)

    let pilotsPoints: number[] = pilots.map(p => (p.points || 0))
    let points: number = pilotsPoints.reduce((a, b) => a + b, 0);

    const xwsSquadron = <XWSSquadron>{
        faction: xwsFaction(factionId),
        pilots: pilots,
        name: squad.name,
        description: squad.description,
        obstacles: undefined,
        points: points,
        vendor: vendorMap
    }

    return xwsSquadron
}

export const ffgPilots = ffgXWS.pilots
export const ffgUpgrades = ffgXWS.upgrades
export const ffgShips = ffgXWS.ships

function constructPilots(decks: Deck[]): Pilot[] {
    const pilots: Pilot[] = []

    decks.forEach(deck => {
        const xwsId = ffgPilots[deck.pilot_card.id]
        if (xwsId !== undefined) {
            // let points: number = 0
            let points: number = deck.cost
            const shipXWSId = ffgShips[deck.pilot_card.ship_type]
            // points += Number(deck.pilot_card.cost)
            const upgrades: Map<string, string[]> = new Map()

            deck.slots.forEach(slot => {
                const upgradeXWS = ffgUpgrades[String(slot.id)]
                const upgradeType = xwsUpgrade(slot.upgrade_types[0])
                const currentSlotList = upgrades.get(upgradeType) || []
                currentSlotList.push(upgradeXWS)
                upgrades.set(upgradeType, currentSlotList)
                // console.log(slot.cost)
                // points += Number(slot.cost)
            })

            let upgradeObj: { [index:string] : string[] } = {};
            for (let [key, value] of upgrades) {
                upgradeObj[key] = value;
            }
            const pilot = <Pilot>{
                id: xwsId,
                ship: shipXWSId,
                upgrades: upgradeObj,
                points: points
            }
            pilots.push(pilot)
        }
    });


    return pilots
}


// https://squadbuilder.fantasyflightgames.com/api/app-metadata/
function xwsUpgrade(id: number): string {
    switch (id) {
        case 1: return "ept"
        case 2: return "sensor"
        case 3: return "cannon"
        case 4: return "turret"
        case 5: return "torpedo"
        case 6: return "missile"
        case 8: return "crew"
        case 10: return "astromech"
        case 12: return "device"
        case 13: return "illicit"
        case 14: return "modification"
        case 15: return "title"
        case 16: return "gunner"
        case 17: return "force-power"
        case 18: return "configuration"
        case 19: return "tech"
        case 1000: return "tactical-relay"
        default: return "special"
    }
}

function xwsFaction(id: number): string {
    return ffgXWS.factions[id]
}
