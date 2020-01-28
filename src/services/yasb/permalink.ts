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
};

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

    try {
        let p = cardData.pilotsById[parseInt(pilot_id)]
        pilotObj.id = p.xws || canonicalize(p.name);

        let ship: Ship = cardData.ships[p.ship]
        pilotObj.ship = canonicalize(ship.xws)
        pilotObj.points = p.points

        let uSplit = upgrade_ids.split(upgrade_splitter)

        for (let i = 0; i < uSplit.length; i++) {
            let upgrade_id = parseInt(uSplit[i]);
            if (upgrade_id >= 0) {
                let upgradeById: UpgradeById = cardData.upgradesById[upgrade_id]

                let uSlot: string = (upgradeById.slot == 'Force') ? 'force-power' : canonicalize(upgradeById.slot)
                let uXWS: string = upgradeById.xws || upgradeById.canonical_name ||  canonicalize(upgradeById.name)

                let currentUpgradeArray: string[] = upgrades[uSlot] || []
                currentUpgradeArray.push(uXWS)

                upgrades[uSlot] = currentUpgradeArray
                let upgradePoints = getUpgradePoints(upgradeById, ship, p.skill)
                pilotObj.points += upgradePoints
            }
        }

    } catch (error) {
        return undefined;
    }

    return pilotObj;
};


// hackily copied from xwing GenericAddon getPoints
function getUpgradePoints(upgrade: UpgradeById, ship: Ship, skill: number): number {
    if (upgrade.variableagility)
        return Math.max(0, (upgrade.pointsarray || [])[ship.agility])
    else if (upgrade.variablebase)
        if (!(ship.medium || ship.large))
            return Math.max(0, (upgrade.pointsarray || [])[0])
        else if (ship.medium)
            return Math.max(0, (upgrade.pointsarray || [])[1])
        else // large
            return Math.max(0, (upgrade.pointsarray || [])[2])
    else if (upgrade.variableinit)
        return Math.max(0, (upgrade.pointsarray || [])[skill])
    else
        return upgrade.points || 0
};
