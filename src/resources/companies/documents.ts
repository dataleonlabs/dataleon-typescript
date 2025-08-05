// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IndividualsDocumentsAPI from '../individuals/documents';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Get documents to an company
   *
   * @example
   * ```ts
   * const documentResponse =
   *   await client.companies.documents.list('company_id');
   * ```
   */
  list(companyID: string, options?: RequestOptions): APIPromise<IndividualsDocumentsAPI.DocumentResponse> {
    return this._client.get(path`/companies/${companyID}/documents`, options);
  }

  /**
   * Upload documents to an company
   *
   * @example
   * ```ts
   * const genericDocument =
   *   await client.companies.documents.upload('company_id', {
   *     document_type: 'bank_statements',
   *   });
   * ```
   */
  upload(
    companyID: string,
    body: DocumentUploadParams,
    options?: RequestOptions,
  ): APIPromise<IndividualsDocumentsAPI.GenericDocument> {
    return this._client.post(
      path`/companies/${companyID}/documents`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
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
    | 'kbis'
    | 'rib'
    | 'carte_grise'
    | 'proof_address'
    | 'identity_document';

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
  export { type DocumentUploadParams as DocumentUploadParams };
}
