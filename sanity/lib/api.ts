/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-27'

function assertValue<T>(v: T | undefined | string, errorMessage: string): T {
  // Checks if the value is missing, null, undefined, or an empty string
  if (!v) {
    throw new Error(errorMessage)
  }

  return v as T
}

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = '/studio'