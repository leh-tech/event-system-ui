function DomainClassifications() {
    this.Electrical = "electrical",
        this.Mechanical = "mechanical",
        this.Software = "software"
}

export const enum EventStatus {
    OnGoing = "ongoing",
    Completed = "completed",
    Canceled = "canceled"
}

export interface EventState {
    id: number
    uid: string,
    domain: DomainClassifications,
    subdomain: string,
    description: string,
    status: EventStatus,
    created: Date
    owners: Owner[]
}

export interface Owner {
    uid: string,
    name: string,
    role: string
}