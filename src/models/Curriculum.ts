export interface Curriculum {
    Name: string;
    EC: number;
    Years: Year[];
}

export interface Year {
    Year: number;
    Courses: Course[];

    Height: string;
}

export interface Course {
    Name: string;
    CatalogNumber: string;
    EC: number;
    IsMandatory: boolean;
    Periods: number[];
    Trajectories: Trajectory[];

    Width: number;
    Position: number;
    Style: any;
}

export interface Trajectory {
    Code: string;
    Levels: Level[];

    Color: string | undefined;
}

export interface Level {
    Domain: ObjectiveDomain;
    DomainName: string;
    Level: ObjectiveLevel;
    LevelName: string;
}

export enum ObjectiveDomain {
    Cognitive,
    Affective,
    Psychomotor,
}

export enum ObjectiveLevel {
    NotSet,
    Remember, Understand, Apply, Analyze, Evaluate, Create,

    Receive, Respond, Value, Conceptualize, Internalize,

    Imitation, Manipulation, Precision, Articulation, Naturalization,
}
