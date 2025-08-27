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
   *     { document_type: 'liasse_fiscale' },
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

/**
 * A document representing official registration data from the KBIS (France).
 */
export interface Kbis {
  /**
   * Declared business activities.
   */
  activities?: string;

  /**
   * Official address of the company.
   */
  address?: string;

  /**
   * Registered social capital of the company.
   */
  capital_social?: string;

  /**
   * Date of closure, if applicable.
   */
  closure_date?: string;

  /**
   * Official name of the company.
   */
  company_name?: string;

  /**
   * Date when the document was issued.
   */
  document_date?: string;

  /**
   * Fixed identifier for the document type.
   */
  document_type?: string;

  /**
   * Date of the first fiscal closure.
   */
  first_closure_date?: string;

  /**
   * Registry office that issued the document.
   */
  from_greffe?: string;

  /**
   * Legal form of the company (e.g., SAS, SARL).
   */
  legal_form?: string;

  /**
   * List of people or entities associated with the company.
   */
  members?: Array<Kbis.Member>;

  /**
   * Business registry number or NGestion.
   */
  ngestion?: string;

  /**
   * RCS (Company Registration Number).
   */
  rcs_number?: string;

  /**
   * Date of registration with the registry.
   */
  registration_date?: string;

  /**
   * SIREN number of the company.
   */
  siren_info?: string;
}

export namespace Kbis {
  /**
   * A member (person or entity) associated with the company from a KBIS document.
   */
  export interface Member {
    /**
     * Unique identifier for the member.
     */
    id?: string;

    /**
     * Address of the member.
     */
    address?: string;

    /**
     * Birth date of the person (only if type = person).
     */
    birthday?: string;

    /**
     * Place of birth (only if type = person).
     */
    birthplace?: string;

    /**
     * Country of residence or registration.
     */
    country?: string;

    /**
     * Email address of the member.
     */
    email?: string;

    /**
     * First name of the person (only if type = person).
     */
    first_name?: string;

    /**
     * Indicates if this member is a beneficial owner.
     */
    is_beneficial_owner?: boolean;

    /**
     * Indicates if this member is a delegator.
     */
    is_delegator?: boolean;

    /**
     * Last name of the person (only if type = person).
     */
    last_name?: string;

    /**
     * Indicates if the member passed liveness verification.
     */
    liveness_verification?: boolean;

    /**
     * Name of the company (only if type = company).
     */
    name?: string;

    /**
     * Ownership percentage held by the member.
     */
    ownership_percentage?: number;

    /**
     * Phone number of the member.
     */
    phone_number?: string;

    /**
     * Postal code of the member's address.
     */
    postal_code?: string;

    /**
     * Company registration number (if type = company).
     */
    registration_id?: string;

    /**
     * Type of relation (e.g., shareholder, director).
     */
    relation?: string;

    /**
     * Roles held by the member (e.g., legal_representative or shareholder).
     */
    roles?: string;

    /**
     * Source of the data (e.g., gouv, user, company).
     */
    source?: string;

    /**
     * Current status of the member.
     */
    status?: string;

    /**
     * Type of entity (company or person).
     */
    type?: 'company' | 'person';

    /**
     * Workspace identifier for internal tracking.
     */
    workspace_id?: string;
  }
}

export interface DocumentUploadParams {
  /**
   * Filter by document type for upload (must be one of the allowed values)
   */
  document_type:
    | 'liasse_fiscale'
    | 'amortised_loan_schedule'
    | 'invoice'
    | 'receipt'
    | 'company_statuts'
    | 'registration_company_certificate'
    | 'kbis'
    | 'rib'
    | 'livret_famille'
    | 'birth_certificate'
    | 'payslip'
    | 'social_security_card'
    | 'vehicle_registration_certificate'
    | 'carte_grise'
    | 'criminal_record_extract'
    | 'proof_of_address'
    | 'identity_card_front'
    | 'identity_card_back'
    | 'driver_license_front'
    | 'driver_license_back'
    | 'identity_document'
    | 'driver_license'
    | 'passport'
    | 'tax'
    | 'certificate_of_incorporation'
    | 'certificate_of_good_standing'
    | 'lcb_ft_lab_aml_policies'
    | 'niu_entreprise'
    | 'financial_statements'
    | 'rccm'
    | 'proof_of_source_funds'
    | 'organizational_chart'
    | 'risk_policies';

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
    type Kbis as Kbis,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
