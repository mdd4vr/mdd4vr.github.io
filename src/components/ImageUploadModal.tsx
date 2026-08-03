import React from 'react';
import { ExplainingPlaceholder } from './ExplainingPlaceholder';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImageSrc: string | null;
  onImageChange: (newSrc: string | null) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  customImageSrc,
  onImageChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-outfit font-bold text-slate-900">
              Explaining.png Image Placeholder Settings
            </h3>
            <p className="text-xs text-slate-500">
              Upload or update the diagram image used in the pipeline section.
            </p>
          </div>
        </div>

        <ExplainingPlaceholder
          customImageSrc={customImageSrc}
          onImageChange={(src) => {
            onImageChange(src);
            if (src) {
              onClose();
            }
          }}
        />


      </div>
    </div>
  );
};
