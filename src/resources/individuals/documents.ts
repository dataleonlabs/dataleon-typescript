// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';

export class Documents extends APIResource {}

export interface DocumentResponse {
  /**
   * List of documents associated with the response.
   */
  documents?: Array<DocumentResponse.Document>;

  /**
   * Total number of documents available in the response.
   */
  total_document?: number;
}

export namespace DocumentResponse {
  /**
   * Represents a document stored and processed by the system, such as an identity
   * card or a PDF contract.
   */
  export interface Document {
    /**
     * Unique identifier of the document.
     */
    id?: string;

    /**
     * Functional type of the document (e.g., identity document, invoice).
     */
    document_type?: string;

    /**
     * Original filename of the uploaded document.
     */
    filename?: string;

    /**
     * Human-readable name of the document.
     */
    name?: string;

    /**
     * Secure URL to access the document.
     */
    signed_url?: string;

    /**
     * Processing state of the document (e.g., WAITING, STARTED, RUNNING, PROCESSED).
     */
    state?: string;

    /**
     * Validation status of the document (e.g., need_review, approved, rejected).
     */
    status?: string;

    /**
     * Identifier of the workspace to which the document belongs.
     */
    workspace_id?: string;
  }
}

/**
 * Represents a general document with metadata, verification checks, and extracted
 * data.
 */
export interface GenericDocument {
  /**
   * Unique identifier of the document.
   */
  id?: string;

  /**
   * List of verification checks performed on the document.
   */
  checks?: Array<Shared.Check>;

  /**
   * Timestamp when the document was created or uploaded.
   */
  created_at?: string;

  /**
   * Type/category of the document.
   */
  document_type?: string;

  /**
   * Name or label for the document.
   */
  name?: string;

  /**
   * Signed URL for accessing the document file.
   */
  signed_url?: string;

  /**
   * Current processing state of the document (e.g., WAITING, PROCESSED).
   */
  state?: string;

  /**
   * Status of the document reception or approval.
   */
  status?: string;

  /**
   * List of tables extracted from the document, each containing operations.
   */
  tables?: Array<GenericDocument.Table>;

  /**
   * Extracted key-value pairs from the document, including confidence scores.
   */
  values?: Array<GenericDocument.Value>;
}

export namespace GenericDocument {
  export interface Table {
    /**
     * List of operations or actions associated with the table.
     */
    operation?: Array<unknown>;
  }

  export interface Value {
    /**
     * Confidence score (between 0 and 1) for the extracted value.
     */
    confidence?: number;

    /**
     * Name or label of the extracted field.
     */
    name?: string;

    /**
     * List of integer values related to the field (e.g., bounding box coordinates).
     */
    value?: Array<number>;
  }
}

export declare namespace Documents {
  export { type DocumentResponse as DocumentResponse, type GenericDocument as GenericDocument };
}
