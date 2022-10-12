const _ = require('underscore');
const { LoremIpsum } = require('lorem-ipsum');

function uuid() {
    var chars = '0123456789abcdef'.split('');

    var uuid = [], rnd = Math.random, r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // version 4

    for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | rnd() * 16;

            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
    }

    return uuid.join('');
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const pickOne = (items) => items[Math.floor(Math.random() * items.length)];

const createOwner = (uid, name, role) => ({ uid, name, role });
const Kelly = createOwner(uuid(), "Kelly Smith", "engineer");
const Josh = createOwner(uuid(), "Josh Massai", "engineer");
const Carla = createOwner(uuid(), "Carla Poole", "supervisor");
const Taj = createOwner(uuid(), " Taj Rimeriaz", "supervisor");

const engineerOwners = (engineers) => {
    // pick random engineer from array
    return pickOne(engineers);
}

const supervisorOwners = (supervisors) => {
    // pick random supervisor from array
    return pickOne(supervisors);
}

const domains = ['Electrical', 'Mechanical', 'Software'];

const eventStatus = ['OnGoing', 'Completed', 'Canceled'];

const subdomains = (domain) => {
    if (domain === 'Electrical') {
        const electicalSubdomains = [
            "Electrical might have Blown Breaker",
            "Damaged Wire",
            "Electrical Shock",
            "Electrical Fire"
        ];

        return pickOne(electicalSubdomains);
    }

    if (domain === 'Mechanical') {
        const mechanicalSubdomains = [
            "Electromagnetic Interference",
            "Arm Malfunction",
            "Bolt Loose",
            "Loose Wiring",
            "Power Supply"
        ];

        return pickOne(mechanicalSubdomains);
    }

    if (domain === 'Software') {
        const softwareSubdomains = [
            "Inaccurate Programming",
            "Poor Maintenance",
            "Improper Setup"
        ];

        return pickOne(softwareSubdomains);
    }
}



const getEventData = () => {
    let i = 0;
    let events = [];
    let timestamp = new Date();

    // generate event data
    for (i; i < 16; i++) {
        // pick one domain from domain array
        let domain = pickOne(domains);
        // pick one domain from event status array
        let status = pickOne(eventStatus);
        // add random seconds to timestamp
        timestamp.setMinutes(timestamp.getMinutes() + _.random(1, 50));

        let newEvent = {
            id: i,
            uid: uuid(),
            domain,
            subdomain: subdomains(domain),
            description: lorem.generateParagraphs(1),
            created: timestamp,
            status,
            owners: [supervisorOwners([Carla, Taj]),
            engineerOwners([Josh, Kelly])]
        }
        events.push(newEvent);
    }

    return events;
}

exports.getEvents = getEventData();