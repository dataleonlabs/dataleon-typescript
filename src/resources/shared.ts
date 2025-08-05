// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Represents a verification check result.
 */
export interface Check {
  /**
   * Indicates whether the result or data is masked/hidden.
   */
  masked?: boolean;

  /**
   * Additional message or explanation about the check result.
   */
  message?: string;

  /**
   * Name or type of the check performed.
   */
  name?: string;

  /**
   * Result of the check, true if passed.
   */
  validate?: boolean;

  /**
   * Importance or weight of the check, often used in scoring.
   */
  weight?: number;
}
