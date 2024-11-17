import { FileConverter } from '@/components/file-converter';
import { FileIcon, DownloadIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Documentation Converter
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert documentation from any URL into a clean, AI-friendly text format.
            Perfect for training and reference materials.
          </p>
        </div>

        <div className="mx-auto max-w-xl bg-background rounded-xl shadow-lg border p-6">
          <FileConverter />
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <DownloadIcon className="w-4 h-4" />
            Downloads are automatically formatted for optimal AI processing
          </div>
        </div>
      </div>
    </main>
  );
}