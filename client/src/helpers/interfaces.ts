import { Owner } from "./types"

const enum DomainClassifications {
    Electrical = "electrical",
    Mechanical = "mechanical",
    Software = "software"
}

export const enum EventStatus {
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
    created: string
    owners: Owner[]
}


export interface ParamPayload {
    payload: EventState
}

export interface EventStoreState {
    events: EventState[],
    loadingStatus: string,
    updated: boolean,
    updatedEvents: EventState[]
}

export interface ExtraInfo {
    description: string,
    owners: Owner[],
    id: number,
    show: any
}

export interface ChangeStatus  {
  uid: string,
  status: EventState["status"]
}

