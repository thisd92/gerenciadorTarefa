export interface Task{
    name: string,
    description: string,
    toDo?: boolean,
    isInProgress?: boolean,
    isFinished?: boolean,
    _id?: string,
    project?: string,
    createdBy?: string
}