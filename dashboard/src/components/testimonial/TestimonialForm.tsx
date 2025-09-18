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

const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(5, "Message is required"),
  rating: z.number().min(1, "Please select rating").max(5),
  image: z.any().optional(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

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
  const [preview, setPreview] = useState<string | null>(
    testimonial?.image || null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial?.name || "",
      email: testimonial?.email || "",
      message: testimonial?.message || "",
      rating: testimonial?.rating || 0,
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      const payload: Omit<Testimonial, "_id"> = {
        name: data.name,
        email: data.email,
        message: data.message,
        rating: data.rating,
        image: data.image ? data.image[0] : undefined, // or upload separately
      };

      if (testimonial?._id) {
        await dispatch(
          updateTestimonial({ id: testimonial._id, data: payload })
        );
      } else {
        await dispatch(createTestimonial(payload));
      }

      onSuccess();
    } catch (err) {
      console.error("❌ Error saving testimonial:", err);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Write your feedback..."
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Image (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setValue("image", e.target.files as any); // ensure RHF knows about it
                }
              }}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            ) : testimonial?.image ? (
              <img
                src={testimonial.image}
                alt="Existing"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {testimonial ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
