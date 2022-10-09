const _ = require('underscore');
// import { LoremIpsum } from 'lorem-ipsum';
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

// const random = (min, max) => {
//     if (max == null) {
//         max = min;
//         min = 0;
//     }
//     return min + Math.floor(Math.random() * (max - min + 1));
// }

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
    console.log("GetEvents called")
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
        timestamp.setSeconds(timestamp.getSeconds() + _.random(1, 200));

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

    console.log(events);

    return events;
}

exports.getEvents = getEventData();


// export const eventData = [
//     {
//         "id": 1,
//         "uid": "046b1099-f291-4b2e-8ef7-292e720f70eb",
//         "domain": "electrical",
//         "subdomain": "Damaged Wire",
//         "description": "massa donec dapibus duis at velit eu est congue elementum",
//         "status": true,
//         "created": "1636232168000",
//         "owners": [

//         ]
//     },
//     {
//         "id": 2,
//         "uid": "5c79fb98-e4dd-46d5-a12d-f10dc6499559",
//         "domain": "last.fm",
//         "subdomain": "evolve leading-edge action-items",
//         "description": "sit amet lobortis sapien sapien non mi integer ac",
//         "status": false,
//         "created": "1658301262000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 3,
//         "uid": "1a4a0735-dcba-4cf4-b8c2-d6722a444824",
//         "domain": "ucsd.edu",
//         "subdomain": "deliver value-added convergence",
//         "description": "dui vel sem sed sagittis nam congue risus",
//         "status": false,
//         "created": "1640872429000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 4,
//         "uid": "a842a3e9-4532-44f6-a090-71ed161b147e",
//         "domain": "fda.gov",
//         "subdomain": "strategize visionary solutions",
//         "description": "quam suspendisse potenti nullam porttitor lacus",
//         "status": true,
//         "created": "1640584539000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 5,
//         "uid": "66675e8e-8273-4c06-ab9b-6b6d5ea9ad12",
//         "domain": "marketwatch.com",
//         "subdomain": "brand enterprise synergies",
//         "description": "rhoncus dui vel sem sed",
//         "status": true,
//         "created": "1657090368000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 6,
//         "uid": "827e5dec-1dfd-4335-b36c-05db64ed33ab",
//         "domain": "alexa.com",
//         "subdomain": "recontextualize interactive niches",
//         "description": "luctus et ultrices posuere cubilia curae mauris viverra",
//         "status": false,
//         "created": "1641213476000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 7,
//         "uid": "35e22292-2a6f-4836-b078-96b4f128460f",
//         "domain": "blog.com",
//         "subdomain": "optimize magnetic interfaces",
//         "description": "cras in purus eu magna vulputate",
//         "status": false,
//         "created": "1638629377000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 8,
//         "uid": "521e90d3-bf02-4794-9480-59fc528587d6",
//         "domain": "uiuc.edu",
//         "subdomain": "leverage wireless applications",
//         "description": "vivamus vestibulum sagittis sapien cum sociis natoque penatibus",
//         "status": true,
//         "created": "1640635397000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 9,
//         "uid": "aecc40fd-44e0-4dc1-871f-c7f0c4178af5",
//         "domain": "g.co",
//         "subdomain": "seize out-of-the-box infomediaries",
//         "description": "urna ut tellus nulla ut erat id mauris vulputate elementum",
//         "status": false,
//         "created": "1660726220000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 10,
//         "uid": "64c51ebf-628f-4544-b27f-bbf75bcb76a2",
//         "domain": "seattletimes.com",
//         "subdomain": "engage next-generation experiences",
//         "description": "ornare consequat lectus in est risus auctor sed tristique in",
//         "status": true,
//         "created": "1651202451000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 11,
//         "uid": "279d9114-dd1c-4c01-b75f-2be6329c0df7",
//         "domain": "privacy.gov.au",
//         "subdomain": "expedite rich e-commerce",
//         "description": "eget congue eget semper rutrum nulla nunc purus phasellus",
//         "status": false,
//         "created": "1635312887000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 12,
//         "uid": "54fdab74-1983-49fb-be39-a2e71acb4f7c",
//         "domain": "ifeng.com",
//         "subdomain": "target ubiquitous experiences",
//         "description": "molestie nibh in lectus pellentesque at",
//         "status": false,
//         "created": "1663110624000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 13,
//         "uid": "b964e1a8-725e-48e5-a0f0-b55206f17f97",
//         "domain": "google.de",
//         "subdomain": "synergize front-end platforms",
//         "description": "lectus aliquam sit amet",
//         "status": true,
//         "created": "1662103304000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 14,
//         "uid": "5414c02e-5914-4f39-919e-b9912b40bbfe",
//         "domain": "illinois.edu",
//         "subdomain": "seize front-end systems",
//         "description": "vestibulum velit id pretium iaculis diam erat fermentum",
//         "status": true,
//         "created": "1643003916000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 15,
//         "uid": "2f3ac481-7e53-4db4-942a-567b78c1bb71",
//         "domain": "themeforest.net",
//         "subdomain": "recontextualize cutting-edge networks",
//         "description": "et magnis dis parturient",
//         "status": true,
//         "created": "1639023173000",
//         "owners": [
//             supervisorOwners([Carla, Taj]),
//             engineerOwners([Josh, Kelly])
//         ]
//     },
//     {
//         "id": 16,
//         "uid": "7d1890c4-1042-4942-a460-9cdcb3c0c786",
//         "domain": "latimes.com",
//         "subdomain": "optimize front-end metrics",
//         "description": "pede ac diam cras pellentesque volutpat dui maecenas",
//         "status": true,
//         "created": "1661912245000",
//         "owners": [

//         ]
//     },
//     {
//         "id": 17,
//         "uid": "28f4a9a7-074e-4be3-81d8-3398617a4002",
//         "domain": "free.fr",
//         "subdomain": "streamline 24/365 e-services",
//         "description": "ante ipsum primis in faucibus orci",
//         "status": true,
//         "created": "1641962853000",
//         "owners": [

//         ]
//     },
//     {
//         "id": 18,
//         "uid": "e7105513-1208-4fae-830f-53b5aa30f92c",
//         "domain": "webmd.com",
//         "subdomain": "enhance revolutionary paradigms",
//         "description": "risus dapibus augue vel",
//         "status": true,
//         "created": "1636446699000",
//         "owners": [

//         ]
//     },
//     {
//         "id": 19,
//         "uid": "6c3f1e8d-e8bd-4a11-a8b7-0027d4708dd4",
//         "domain": "so-net.ne.jp",
//         "subdomain": "scale end-to-end e-services",
//         "description": "magna at nunc commodo placerat praesent blandit nam nulla integer",
//         "status": false,
//         "created": "1645527012000",
//         "owners": [

//         ]
//     },
//     {
//         "id": 20,
//         "uid": "ad1ad8a5-7f36-46f1-9f86-ddb9dfce6485",
//         "domain": "i2i.jp",
//         "subdomain": "aggregate one-to-one solutions",
//         "description": "mi in porttitor pede justo",
//         "status": true,
//         "created": "1660835449000",
//         "owners": [

//         ]
//     }
// ]