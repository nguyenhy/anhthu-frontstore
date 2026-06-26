import { fetchTemplateDetail } from '@/lib/template-detail/fetchTemplateData';
import TemplateDetailTsx from '@/components/template-detail/TemplateDetail';
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from 'next/navigation';
import { HttpError } from '@/lib/error';
import { StrapiTemplateDetail } from '@/lib/template-detail/types';
import { isVisualEditor } from '@/lib/cms/visual-editor';
import VisualEditor from '@/components/cms/VisualEditor';


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

  const query = await props.searchParams
  const params = await props.params
  let data: StrapiTemplateDetail | null = null
  try {
    data = await fetchTemplateDetail(params.id, typeof query.version === 'string' ? query.version : undefined)
  } catch (error) {
    console.error(new Date().toISOString(), 'Template.Meta', String(error));
  }

  if (!data) {
    return {}
  }

  return {
    title: data.name ? `${data.name} | SimplaKit` : parentTitle,
    description: data.tagline || parentDescription,
  };
}

export default async function Template(props: Props) {
  const query = await props.searchParams
  const params = await props.params

  let data: StrapiTemplateDetail | null = null
  try {
    data = await fetchTemplateDetail(params.id, typeof query.version === 'string' ? query.version : undefined)
  } catch (error) {
    console.error(new Date().toISOString(), 'Template', String(error));
    throw new HttpError('500')
  }

  if (!data) {
    notFound()
  }

  const editor = isVisualEditor(query.edit)
  const cmsUrl = process.env.VISUAL_EDITING_CSP__FRAME_SRC

  return (
    <>
      {
        /**
         * Inject CSP meta tag directly into HTML head dynamically at runtime. 
         * This avoids next.config.js build-time baking constraints completely.
         */
        !!cmsUrl && !!editor &&
        <meta
          httpEquiv="Content-Security-Policy"
          content={`frame-ancestors 'self' ${cmsUrl}`}
        />
      }
      <TemplateDetailTsx data={data} />
      {
        !!editor && <VisualEditor />
      }
    </>
  );
}
