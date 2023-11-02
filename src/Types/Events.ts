/**
 * Details of the custom event
 */
export interface EventDetail {
  detail: Record<string, unknown>;
}

/**
 * Preloading started
 */
export interface StartEventDetail {
  detail: {
    count: number;
  };
}

/**
 * Preloading progressed
 */
export interface ProgressEventDetail {
  detail: {
    loaded: number;
  };
}

/**
 * Preloading finished
 */
export interface FinishedEventDetail {
  detail: {
    count: number;
  };
}
