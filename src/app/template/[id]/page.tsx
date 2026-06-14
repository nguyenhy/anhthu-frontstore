import { fetchTemplateDetail } from '@/lib/template-detail/mockTemplateDetail';
import TemplateDetailTsx from '@/components/template-detail/TemplateDetail';
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from 'next/navigation';
import { HttpError } from '@/lib/error';
import { StrapiTemplateDetail } from '@/lib/template-detail/types';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const { title: parentTitle, description: parentDescription, } = parentMetadata

  const params = await props.params
  let data: StrapiTemplateDetail | null = null
  try {
    data = await fetchTemplateDetail(params.id)
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    return {}
  }

  return {
    title: data.name ? `${data.name} | Simpla` : parentTitle,
    description: data.tagline || parentDescription,
  };
}

export default async function Template(props: Props) {
  const params = await props.params
  let data: StrapiTemplateDetail | null = null
  try {
    data = await fetchTemplateDetail(params.id)
  } catch (error) {
    console.error(error);
    throw new HttpError('500')
  }

  if (!data) {
    notFound()
  }

  return (
    <>
      <TemplateDetailTsx data={data} />
    </>
  );
}
