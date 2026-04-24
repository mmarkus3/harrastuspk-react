import { saveRecord } from '@/app/lib/firebase/firestore';
import { Template } from '@/app/models/template';

export async function handleTemplateSave(template: Template) {
  if (!template.author || !template.name || template.types.length === 0) {
    return;
  }
  await saveRecord('templates', {
    name: template.name,
    author: template.author,
    types: template.types,
  });
}