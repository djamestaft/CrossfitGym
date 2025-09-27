import { type SchemaTypeDefinition } from 'sanity'

import { articleType } from './articleType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { coachBioType } from './coachBioType'
import { conditionHubType } from './conditionHubType'
import { faqType } from './faqType'
import { postType } from './postType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    testimonialType,
    articleType,
    conditionHubType,
    faqType,
    coachBioType,
  ],
}
