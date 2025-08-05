// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Get documents to an individuals
   *
   * @example
   * ```ts
   * const documentResponse =
   *   await client.individuals.documents.list('individual_id');
   * ```
   */
  list(individualID: string, options?: RequestOptions): APIPromise<DocumentResponse> {
    return this._client.get(path`/individuals/${individualID}/documents`, options);
  }

  /**
   * Upload documents to an individual
   *
   * @example
   * ```ts
   * const genericDocument =
   *   await client.individuals.documents.upload(
   *     'individual_id',
   *     { document_type: 'bank_statements' },
   *   );
   * ```
   */
  upload(
    individualID: string,
    body: DocumentUploadParams,
    options?: RequestOptions,
  ): APIPromise<GenericDocument> {
    return this._client.post(
      path`/individuals/${individualID}/documents`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

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

export interface DocumentUploadParams {
  /**
   * Filter by document type for upload (must be one of the allowed values)
   */
  document_type:
    | 'bank_statements'
    | 'liasse_fiscale'
    | 'amortised_loan_schedule'
    | 'accounting'
    | 'invoice'
    | 'receipt'
    | 'company_statuts'
    | 'rib'
    | 'livret_famille'
    | 'payslip'
    | 'carte_grise'
    | 'proof_address'
    | 'identity_document'
    | 'tax';

  /**
   * File to upload (required)
   */
  file?: Uploadable;

  /**
   * URL of the file to upload (either `file` or `url` is required)
   */
  url?: string;
}

export declare namespace Documents {
  export {
    type DocumentResponse as DocumentResponse,
    type GenericDocument as GenericDocument,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
