
const enum DomainClassifications {
    Electrical = "electrical",
    Mechanical = "mechanical",
    Software = "software"
}

const enum EventStatus {
    OnGoing = "OnGoing",
    Completed = "completed",
    Canceled = "canceled"
}

export interface EventState {
    id: number,
    uid: string,
    domain: DomainClassifications,
    subdomain: string,
    description: string,
    status: EventStatus,
    created: Date
    owners: [Owner]
}

export interface Owner {
    uid: string,
    name: string,
    role: string
}

export interface ParamPayload {
    payload: EventState
}

export interface EventStoreState {
    events: EventState[],
    loadingStatus: string
}

export interface DeleteEvent {
    uid: String
}