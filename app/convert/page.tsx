"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("");
  const [compress, setCompress] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState([50]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setConverted(false);
      setConvertedImage(null);
    }
  };

  const compressImage = useCallback(
    (image: HTMLImageElement, quality: number): Promise<Blob> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0);
        canvas.toBlob((blob) => resolve(blob!), "image/jpeg", quality / 100);
      });
    },
    []
  );

  const convertImage = useCallback(async () => {
    if (!file || !format) return;

    setConverting(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        let resultBlob: Blob;

        if (compress) {
          resultBlob = await compressImage(img, compressionLevel[0]);
        } else {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          resultBlob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((blob) => resolve(blob!), `image/${format}`)
          );
        }

        const convertedURL = URL.createObjectURL(resultBlob);
        setConvertedImage(convertedURL);
        setConverted(true);
        setConverting(false);
        setProgress(100);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prevProgress + 10;
      });
    }, 100);
  }, [file, format, compress, compressionLevel, compressImage]);

  const handleConvert = () => {
    if (file && format) {
      convertImage();
    } else {
      alert("Please select a file and a format");
    }
  };

  const handleConvertAgain = () => {
    setConverted(false);
    setConvertedImage(null);
    setProgress(0);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Convert Your Image</h1>
      <div className="space-y-4">
        <Input type="file" onChange={handleFileChange} accept="image/*" />
        <Select onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
            <SelectItem value="gif">GIF</SelectItem>
            <SelectItem value="bmp">BMP</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="compress"
            checked={compress}
            onCheckedChange={setCompress}
          />
          <Label htmlFor="compress">Compress image</Label>
        </div>
        {compress && (
          <div className="space-y-2">
            <Label htmlFor="compression-level">
              Compression level: {compressionLevel}%
            </Label>
            <Slider
              id="compression-level"
              min={1}
              max={100}
              step={1}
              value={compressionLevel}
              onValueChange={setCompressionLevel}
            />
          </div>
        )}
        {converting && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Converting... {progress}%
            </p>
          </div>
        )}
        {converted ? (
          <div className="space-y-2">
            <p className="text-sm text-green-500 flex items-center">
              <Check className="mr-2" /> Conversion complete!
            </p>
            <div className="flex space-x-2">
              <Button asChild>
                <a
                  href={convertedImage!}
                  download={
                    file ? file.name.replace(/\.[^/.]+$/, `.${format}`) : ""
                  }
                >
                  Download Converted Image
                </a>
              </Button>
              <Button onClick={handleConvertAgain} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Convert Again
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={handleConvert}
            disabled={!file || !format || converting}
          >
            {converting ? "Converting..." : "Convert"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
