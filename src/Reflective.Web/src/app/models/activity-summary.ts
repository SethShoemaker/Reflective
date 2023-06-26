export interface ActivitySummaryItem {
    id: string;
    name: string;
    sessions: ActivitySummaryItemSession[];
    hasActiveSession: boolean;
    plans: ActivitySummaryItemPlan[];
}

export interface ActivitySummaryItemSession{
    id: string;
    startPercentage: number;
    startedOnPrevDay: boolean;
    endPercentage: number | null;
    endedOnNextDay: boolean;
}

export interface ActivitySummaryItemPlan{
    id: string;
    startPercentage: number;
    startsOnPrevDay: boolean;
    endPercentage: number;
    endsOnNextDay: boolean;
}