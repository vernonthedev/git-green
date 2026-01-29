"use client";

import React from "react";
import { useState } from "react";
import { GitForm } from "../components/git-form";
import { PreviewSection } from "../components/preview-section";
import { StatusMessage } from "../components/status-message";
import { FormData, CommitMode } from "../lib/types/index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    year: (new Date().getFullYear() - 1).toString(),
    commitMode: "random",
    commitCount: "100",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewData, setPreviewData] = useState<{
    [key: string]: number;
  } | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handlePreview = async () => {
    setIsPreviewLoading(true);
    setPreviewData(null);

    try {
      const response = await fetch("/api/preview-commits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setPreviewData(result.dateCounts);
        setMessage("");
      } else {
        setMessage(`Preview Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Failed to generate preview");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate-commits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Commits generated successfully!");
        setPreviewData(null);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Failed to generate commits");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen terminal-bg text-green-400 font-mono">
      <header className="border-b-2 border-green-400 bg-black/90 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-center mb-4">
              <pre style={{ fontFamily: '"JetBrains Mono", "Courier New", monospace', fontSize: 'clamp(10px, 2.5vw, 18px)', lineHeight: '1', whiteSpace: 'pre', color: '#22c55e', userSelect: 'none' }}>
{`███████╗ ██╗████████╗    ██████╗ ██████╗ ███████╗███████╗███╗   ██╗
██╔════╝ ██║╚══██╔══╝    ██╔════╝ ██╔══██╗██╔════╝██╔════╝████╗  ██║
██║  ███╗██║   ██║       ██║  ███╗██████╔╝█████╗  █████╗  ██╔██╗ ██║
██║   ██║██║   ██║       ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║
╚██████╔╝██║   ██║       ╚██████╔╝██║  ██║███████╗███████╗██║ ╚████║
 ╚═════╝ ╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝`}
              </pre>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-green-400 mb-2 glitch uppercase tracking-widest">
              ~/git-green$
            </h1>
            <p className="text-sm text-green-300">
              &gt; Contribution pattern generator initialized...
            </p>
            <p className="text-xs text-green-500 mt-2">
              [STATUS] Connected to GitHub API protocols...
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-12">
          <div className="bg-black/80 border-2 border-green-400 p-6 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <h2 className="text-xl font-bold text-green-400 mb-4">
              &gt; cat README.md
            </h2>
            <div className="text-green-300 text-sm leading-relaxed space-y-2">
              <p>
                &gt; Git Green: A low-level utility for contribution graph
                manipulation.
              </p>
              <p>
                &gt; Craft your coding story with custom commit distributions.
              </p>
              <p>
                &gt; [WARNING] Use responsibly. Legitimacy of commit history is
                paramount.
              </p>
            </div>
          </div>
        </section>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="bg-black/80 border-2 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <CardHeader className="border-b border-green-900/50">
                <CardTitle className="text-green-400 text-lg">
                  &gt; ./configure.sh
                </CardTitle>
                <CardDescription className="text-green-600 text-xs">
                  Set parameters for generation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <GitForm
                  formData={formData}
                  onFormChange={setFormData}
                  onPreview={handlePreview}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  isPreviewLoading={isPreviewLoading}
                />
              </CardContent>
            </Card>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Preview Section */}
            <Card className="bg-black/80 border-2 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] min-h-[300px]">
              <CardHeader className="border-b border-green-900/50">
                <CardTitle className="text-green-400 text-lg">
                  &gt; ./preview_output.bin
                </CardTitle>
                <CardDescription className="text-green-600 text-xs">
                  Visualization of the generated pattern
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {previewData ? (
                  <PreviewSection
                    previewData={previewData}
                    year={formData.year}
                  />
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-green-900/30 text-green-900">
                    <p className="text-sm font-bold uppercase tracking-widest">
                      [ Waiting for input ]
                    </p>
                    <p className="text-[10px] mt-2 italic text-green-900/50">
                      Execute preview to see visualization
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status & Help */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/80 border border-green-600/50 p-4">
                <h3 className="text-xs font-bold text-green-600 uppercase mb-2">
                  System Status
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-sm font-bold">
                    READY
                  </span>
                </div>
              </div>
              <div className="bg-black/80 border border-green-600/50 p-4">
                <h3 className="text-xs font-bold text-green-600 uppercase mb-2">
                  Current Context
                </h3>
                <p className="text-green-400 text-sm font-bold">
                  YEAR: {formData.year} | COMMITS: {formData.commitCount}
                </p>
              </div>
            </div>

            {message && (
              <div className="pixelated-border bg-black p-4 border-2 border-green-400 animate-in fade-in slide-in-from-top-4 duration-300">
                <StatusMessage message={message} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-green-400 bg-black/90 mt-20 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-green-500 text-xs">
            &gt; Git Green v1.0.0 | System Architecture: terminal-ui-v1
          </p>
          <p className="text-green-900 text-[10px] mt-2">
            All rights reserved to the code archaeologists.
          </p>
        </div>
      </footer>
    </div>
  );
}
