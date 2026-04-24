'use client';
import { ChangeEvent, useState } from 'react';
import Button from '../button/button';
import { Modal } from '../modal/modal';
import { Template } from '@/app/models/template';
import { AddTemplate } from './addTemplate';
import { RecordType } from '@/app/models/recordType';

interface ChangeTemplateProps {
  template?: Template;
  templates: Template[];
  trainingTypes: RecordType[];
  onChange: (data: Template) => void
}

export function ChangeTemplate({ template, templates, trainingTypes, onChange }: ChangeTemplateProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | undefined>(template);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleTemplateSelection = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const template = templates.find((it) => it.id === e.target.value)!;
    setSelectedTemplate(template);
  }

  const handleSave = () => {
    if (selectedTemplate) {
      onChange(selectedTemplate);
      handleClose();
    }
  }

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        Vaihda
      </Button>
      <Modal isOpen={isOpen}>
        <h3 className="text-2xl font-bold text-gray-900">Mallipohja</h3>
        <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</div>
        <div className="mb-4 mt-4">
          <select id="template" name="template"
            onChange={handleTemplateSelection}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="">Valitse pohja</option>
            {templates.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <AddTemplate key={new Date().getTime()} trainingTypes={trainingTypes} />
            <Button disabled={selectedTemplate == null} type="button" onClick={handleSave}>
              Valitse
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}