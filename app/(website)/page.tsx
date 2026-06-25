// /Users/cecilia/personal-website/app/(website)/page.tsx

import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import {studioUrl} from '@/sanity/lib/api'
import {getDynamicFetchOptions, sanityFetch, type DynamicFetchOptions} from '@/sanity/lib/live'
import {defineQuery} from 'next-sanity'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {Suspense} from 'react'

export default async function IndexPage() {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    return <CachedHome perspective="published" stega={false} />
  }
  return (
    <Suspense>
      <DynamicHome />
    </Suspense>
  )
}

async function DynamicHome() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedHome perspective={perspective} stega={stega} />
}

async function CachedHome({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const homePageQuery = defineQuery(`
    *[_type == "home"][0]{
      _id,
      _type,
      overview,
      body,
      title,
    }
  `)
  const {data} = await sanityFetch({query: homePageQuery, perspective, stega})

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  // Explicit type assertion to extract valid parameters from Sanity response
  const {_id, _type, overview = [], body = [], title = ''} = data as any

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && (
        <Header
          id={_id || null}
          type={_type || null}
          path={['overview']}
          centered
          title={title}
          description={overview}
        />
      )}

      {/* Body Content */}
      {Array.isArray(body) && body.length > 0 && (
        <div className="mx-auto max-w-3xl">
          <CustomPortableText
            id={_id || null}
            type={_type || null}
            path={['body']}
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body}
          />
        </div>
      )}
    </div>
  )
}