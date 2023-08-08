import { CardData, PilotById, Ship, UpgradeById } from "../../models/YASBCardData";
import { Pilot, Upgrades } from "../../models/XWSSquadron";

import { basicCardData, canonicalize } from './lib';

const cardData: CardData = <CardData>basicCardData()

export function serializedToShips(serialized: string): Pilot[] {
    const pilots: Pilot[] = [];
    const re = /^v(\d+)Z(.*)/
    const matches = re.exec(serialized);
    if (matches != null) {
        let splitValues: string[] = matches[2].split('Z')
        let serialized_ships: string = splitValues[2]

        const ship_splitter = 'Y';
        for (let serialized_ship of serialized_ships.split(ship_splitter)) {
            if (serialized_ship !== '') {
                let possiblePilot = fromSerializedShip(serialized_ship)
                if (possiblePilot != undefined) {
                    pilots.push(possiblePilot);
                }
            }
        }
    }

    return pilots;
}

function fromSerializedShip(serialized: string): Pilot | undefined {
    let unused_value, pilot_id, upgrade_ids;
    const upgrades = <Upgrades>{}

    const pilotObj = <Pilot>{
        id: '',
        ship: '',
        points: 0,
        upgrades: upgrades
    };

    const pilot_splitter = 'X';
    const upgrade_splitter = 'W';

    [pilot_id, upgrade_ids, unused_value] = serialized.split(pilot_splitter);

    // name_parse ?
    // let nameSplit = p.name.split("(")

    /*
    pilot_data.xws = if pilot_data.xws? then pilot_data.xws else (if pilot_data.xwsaddon? then (pilot_data.canonical_name + "-" + pilot_data.xwsaddon) else (pilot_data.canonical_name + (if name_parse[1]? then ("-" + pilot_data.ship.canonicalize()) else "")))
     */
    // not output in squad2xws

    try {
        let p = cardData.pilotsById[parseInt(pilot_id)]
        pilotObj.id = p.xws || canonicalize(p.name);

        let ship: Ship = cardData.ships[p.ship]
        pilotObj.ship = canonicalize(ship.name)
        pilotObj.points = p.points

        // only add upgrades to xws output if they are not "standard" upgrades
        if (!(p.upgrades != undefined && p.upgrades.length > 0)) {
            let uSplit = upgrade_ids.split(upgrade_splitter)

            for (let i = 0; i < uSplit.length; i++) {
                let upgrade_id = parseInt(uSplit[i]);
                if (upgrade_id >= 0) {
                    let upgradeById: UpgradeById = cardData.upgradesById[upgrade_id]

                    let uSlot: string = (upgradeById.slot == 'Force') ? 'force-power' : canonicalize(upgradeById.slot)

                    // original coffeescript
                    // upgrade_data.canonical_name = name_parse[0].canonicalize() unless upgrade_data.canonical_name?
                    // upgrade_data.xws = if upgrade_data.xws? then upgrade_data.xws else (if upgrade_data.xwsaddon? then (upgrade_data.canonical_name + "-" + upgrade_data.xwsaddon) else (upgrade_data.canonical_name + (if name_parse[1]? then ("-" + upgrade_data.slot.canonicalize()) else "")))

                    let upgradeNameSplit = upgradeById.name.split("(")
                    if (upgradeById.canonical_name == undefined) {
                        upgradeById.canonical_name = canonicalize(upgradeNameSplit[0])
                    }

                    let uXWS: string = ""
                    if (upgradeById.xws != undefined) {
                        uXWS = upgradeById.xws
                    } else if (upgradeById.xwsaddon != undefined) {
                        uXWS = upgradeById.canonical_name + "-" + upgradeById.xwsaddon
                    } else {
                        uXWS = upgradeById.canonical_name
                        if (upgradeNameSplit.length > 1) {
                            uXWS += "-" + canonicalize(upgradeById.slot)
                        }
                    }
                    // let uXWS: string = upgradeById.xws || upgradeById.canonical_name ||  canonicalize(upgradeById.name)

                    let currentUpgradeArray: string[] = upgrades[uSlot] || []
                    currentUpgradeArray.push(uXWS)

                    upgrades[uSlot] = currentUpgradeArray
                }
            }

        }
    } catch (error) {
        return undefined;
    }

    return pilotObj;
}
