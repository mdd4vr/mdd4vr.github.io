import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link as LinkIcon, RefreshCw, FileCode, CheckCircle, Info } from 'lucide-react';

interface ExplainingPlaceholderProps {
  customImageSrc: string | null;
  onImageChange: (newSrc: string | null) => void;
}

export const ExplainingPlaceholder: React.FC<ExplainingPlaceholderProps> = ({
  customImageSrc,
  onImageChange,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (e.g. Explaining.png, JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-xl text-slate-800">
      {/* Container header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-slate-900 text-lg flex items-center gap-2">
              Explaining.png Image Placeholder
              {customImageSrc && (
                <span className="text-xs font-normal px-2 py-0.5 bg-cyan-100 text-cyan-800 rounded-full flex items-center gap-1 font-mono">
                  <CheckCircle className="w-3 h-3" /> Image Active
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500">
              Replace this slot with your custom diagram image or use the default placeholder below.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-cyan-600" />
            <span>How to add Explaining.png</span>
          </button>

          {customImageSrc && (
            <button
              onClick={() => onImageChange(null)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Developer Help Callout */}
      {showHelp && (
        <div className="mb-6 p-4 bg-slate-50 border border-cyan-200 rounded-xl text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
            <FileCode className="w-4 h-4 text-cyan-600" />
            <span>Permanent File Setup Instructions:</span>
          </div>
          <p>
            To automatically serve your image directly without re-uploading:
          </p>
          <ol className="list-decimal list-inside space-y-1 font-mono text-slate-800 pl-2 bg-white p-3 rounded border border-slate-200">
            <li>Save your image file as <span className="font-bold text-cyan-700">Explaining.png</span></li>
            <li>Place it inside the <span className="font-bold text-cyan-700">/public/</span> directory in your project root</li>
            <li>It will automatically display at <span className="underline">/Explaining.png</span>!</li>
          </ol>
        </div>
      )}

      {/* Image Display or Upload Dropzone */}
      {customImageSrc ? (
        <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center p-2 min-h-[300px]">
          <img
            src={customImageSrc}
            alt="Explaining.png Pipeline Diagram"
            className="max-h-[500px] w-auto object-contain rounded-lg shadow-sm"
            onError={() => {
              alert("Failed to load image. Resetting to default placeholder.");
              onImageChange(null);
            }}
          />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow hover:bg-slate-100 cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Change Image
            </button>
            <button
              onClick={() => onImageChange(null)}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-rose-700 cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Remove Custom Image
            </button>
          </div>
        </div>
      ) : (
        /* Empty Placeholder Dropzone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center min-h-[320px] ${
            isDragging
              ? 'border-cyan-500 bg-cyan-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mb-4 shadow-xs">
            <Upload className="w-8 h-8" />
          </div>

          <h4 className="font-outfit font-bold text-slate-900 text-base sm:text-lg mb-1">
            Upload Explaining.png Image Here
          </h4>
          <p className="text-xs text-slate-500 max-w-md mb-6">
            Drag and drop your <span className="font-semibold text-slate-700">Explaining.png</span> file, or choose an image file from your computer.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 rounded-xl bg-[#38c3db] hover:bg-[#32b2c8] text-[#181b1e] text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Browse Image File</span>
            </button>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleUrlSubmit} className="mt-6 w-full max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="Or paste image URL (e.g. https://.../Explaining.png)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={!urlInput.trim()}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-medium cursor-pointer"
            >
              Load
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
