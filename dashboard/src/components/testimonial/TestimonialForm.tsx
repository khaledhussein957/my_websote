"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "@/lib/hooks";
import {
  addTestimonial as createTestimonial,
  updateTestimonial,
} from "../../lib/slices/testimonialSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

import { Testimonial } from "../../lib/slices/testimonialSlice";

type TestimonialFormData = {
  name: string;
  email: string;
  message: string;
  rating: number;
};

export default function TestimonialForm({
  testimonial,
  onClose,
  onSuccess,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: testimonial?.name || "",
    email: testimonial?.email || "",
    message: testimonial?.message || "",
    rating: testimonial?.rating || 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    testimonial?.image || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (star: number) => {
    setFormData((prev) => ({ ...prev, rating: star }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        rating: formData.rating,
      };
      let sendData: any = payload;
      if (selectedImage) {
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("message", formData.message);
        fd.append("rating", String(formData.rating));
        fd.append("image", selectedImage);
        sendData = fd;
      }
      if (testimonial?._id) {
        await dispatch(
          updateTestimonial({ id: testimonial._id, data: sendData })
        );
      } else {
        await dispatch(createTestimonial(sendData));
      }
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving testimonial:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10  flex items-center justify-center p-4 z-50">
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {testimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your feedback..."
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Rating */}
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        formData.rating >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Image (optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-full"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message ||
                  formData.rating < 1
                }
              >
                {isSubmitting
                  ? testimonial
                    ? "Updating..."
                    : "Creating..."
                  : testimonial
                  ? "Update"
                  : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
