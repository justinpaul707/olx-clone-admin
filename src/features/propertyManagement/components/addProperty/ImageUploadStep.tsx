import React, { useState } from 'react';
import { Button } from '@app/components/ui/button';
import { Label } from '@app/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadStepProps {
  images: File[];
  onImagesChange: (files: File[]) => void;
}

export const ImageUploadStep: React.FC<ImageUploadStepProps> = ({ images, onImagesChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      onImagesChange([...images, ...newFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      onImagesChange([...images, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <Label className="text-base font-semibold">Property Images</Label>
        <p className="text-sm text-gray-500 mb-4">
          Upload high-quality images to showcase the property. The first image will be the main cover.
        </p>
        
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-300 hover:border-brand-primary'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          
          <div className="flex flex-col items-center justify-center gap-3">
             <div className="bg-gray-100 p-3 rounded-full">
               <Upload className="h-6 w-6 text-gray-600" />
             </div>
             <div>
               <p className="font-medium text-gray-900">
                 Click to upload or drag and drop
               </p>
               <p className="text-xs text-gray-500 mt-1">
                 SVG, PNG, JPG or GIF (max. 10MB)
               </p>
             </div>
             <Button
               variant="outline"
               size="sm"
               onClick={() => document.getElementById('image-upload')?.click()}
             >
               Select Files
             </Button>
          </div>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {images.map((file, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-brand-primary/80 text-white text-xs py-1 text-center font-medium">
                  Cover Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
          <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
          <p className="text-sm">No images selected yet</p>
        </div>
      )}
    </div>
  );
};
