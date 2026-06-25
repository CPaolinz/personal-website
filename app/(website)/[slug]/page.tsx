// /Users/cecilia/personal-website/app/(website)/[slug]/page.tsx

import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import ImageBox from '@/components/ImageBox'
import {OptimisticSortOrder} from '@/components/OptimisticSortOrder'
import {studioUrl} from '@/sanity/lib/api'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {slugsByTypeQuery, type SlugsByTypeQueryParams} from '@/sanity/lib/queries'
import {resolveHref} from '@/sanity/lib/utils'
import type {Metadata, ResolvingMetadata} from 'next'
import {createDataAttribute, defineQuery} from 'next-sanity'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

type PageProps<T extends string> = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({
    query: slugsByTypeQuery,
    params: {type: 'page'} satisfies SlugsByTypeQueryParams,
  })
  
  // FIX: If Sanity has no pages yet, return a fallback parameter to prevent EmptyGenerateStaticParamsError
  if (!data || data.length === 0) {
    return [{slug: 'fallback-placeholder'}]
  }

  return data
}

export async function generateMetadata(
  {params}: PageProps<'/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [{slug}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const slugPageMetadataQuery = defineQuery(`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      "overview": pt::text(overview),
    }
  `)
  const {data} = await sanityFetchMetadata({
    query: slugPageMetadataQuery,
    params: {slug},
    perspective,
  })

  return {
    title: data?.title,
    description: data?.overview || (await parent).description,
  }
}

export default async function SlugPage({params}: PageProps<'/[slug]'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {slug} = await params
    return <CachedSlugPage slug={slug} perspective="published" stega={false} />
  }
  return (
    <Suspense>
      <DynamicSlugPage params={params} />
    </Suspense>
  )
}

async function DynamicSlugPage({params}: Pick<PageProps<'/[slug]'>, 'params'>) {
  const [{slug}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedSlugPage slug={slug} perspective={perspective} stega={stega} />
}

async function CachedSlugPage({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<'/[slug]'>['params']> & DynamicFetchOptions) {
  'use cache'
  const slugPageQuery = defineQuery(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      overview,
      title,
      "slug": slug.current,
      showcaseProjects[]{
        _key,
        ...@->{
          _id,
          _type,
          coverImage,
          overview,
          "slug": slug.current,
          tags,
          title,
        }
      },
    }
  `)
  const {data} = await sanityFetch({query: slugPageQuery, params: {slug}, perspective, stega})

  // Cast here immediately to avoid Property '_id' does not exist on type '{}'
  const pageData = data as any

  if (!pageData?._id) notFound()

  const {_id, _type, overview, title, showcaseProjects = []} = pageData

  const dataAttribute =
    _id && _type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: _id,
          type: _type,
        })
      : null

  return (
    <div className="space-y-20">
      {/* Header */}
      <Header
        id={_id || null}
        type={_type || null}
        path={['overview']}
        title={title || 'Untitled'}
        description={overview}
      />

      {/* Showcase projects */}
      <div className="mx-auto max-w-[100rem] rounded-md border">
        <OptimisticSortOrder id={_id} path={'showcaseProjects'}>
          {showcaseProjects &&
            showcaseProjects.length > 0 &&
            showcaseProjects.map((project: any) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) return null
              
              return (
                <Link
                  className="flex flex-col gap-x-5 p-2 transition odd:border-b odd:border-t hover:bg-gray-50/50 xl:flex-row odd:xl:flex-row-reverse"
                  key={project._key}
                  href={href}
                  data-sanity={dataAttribute?.(['showcaseProjects', {_key: project._key}])}
                >
                  <div className="w-full xl:w-9/12">
                    <ImageBox
                      image={project.coverImage}
                      alt={`Cover image from ${project.title}`}
                      classesWrapper="relative aspect-[16/9]"
                    />
                  </div>
                  <div className="flex xl:w-1/4">
                    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
                      <div>
                        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
                          {project.title}
                        </div>
                        {Array.isArray(project.overview) && (
                          <div className="font-serif text-gray-500">
                            <CustomPortableText
                              id={project._id}
                              type={project._type}
                              path={['overview']}
                              value={project.overview}
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex flex-row gap-x-2">
                        {project.tags?.map((tag: string, key: number) => (
                          <div className="text-sm font-medium lowercase md:text-lg" key={key}>
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </OptimisticSortOrder>
      </div>
    </div>
  )
}