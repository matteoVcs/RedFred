"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "/assets/images/image.png",
  "/assets/images/image2.png",
  "/assets/images/image3.png",
  "/assets/images/image4.png",
];

export function ImageCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Aperçu mobile</h2>
      <Carousel
        className="w-full max-w-sm mx-auto"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="w-full h-full">
                  <CardContent className="flex w-full h-full aspect-[9/16] items-center justify-center p-2">
                    <img
                      src={src}
                      alt={`Aperçu ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
